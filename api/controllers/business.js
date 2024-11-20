// Importamos el modelo businessModel desde el archivo models
const { matchedData } = require('express-validator');
const {businessModel, usersModel, webModel} = require('../models')
const { bizTokenSign } = require("../utils/handleJwt")
const {sendEmail} = require('../utils/handleMails')

// Devolvemos todas empresas
const getBizs = async (req, res) => {
    const { upwards }  = req.query; // Obtenemos la query de la URL

    // Validamos que el parámetro 'upwards' sea 'true', 'false' o no esté presente
    if (upwards !== undefined && upwards !== "true" && upwards !== "false") {
        return res.status(400).send({message: "Inserte una query correcta (upwards=true o upwards=false)"});
    }

    // Definimos sortOrder en función de cómo se quieran pasar los datos
    let sortOrder= upwards === "true" ? 1
                    :upwards === "false" ? -1 
                    :null;

    try {
        // Buscar las empresas, si sortOrder está definido, se ordenan, de lo contrario no se aplica orden
        const bizs = await businessModel.find({}).sort(sortOrder ? { CIF: sortOrder } : {});

        // Determinar el mensaje según el valor de 'upwards'
        const message = sortOrder === 1 ? "Empresas ordenadas ascendentemente (por CIF)" 
                        : sortOrder === -1 ? "Empresas ordenadas descendentemente (por CIF)" 
                        : "Todas las empresas actualmente activas";

        res.status(200).send({ message, bizs });
    } 
    catch (err) {
        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al obtener las empresas", error: err.message });
    }
};


// Obtener una empresa por CIF
const getBiz = async (req, res) => {
    const {cif} = matchedData(req); // Obtener el CIF del parámetro de la URL
    
    try {
        
        // Buscar empresa por CIF
        const biz = await businessModel.findOne({CIF: cif})

        // Si no existe 
        if (!biz) {
            return res.status(404).send({ message: "Empresa no encontrada" });
        }
        
        // Enviar la empresa elegida
        res.status(200).send({ message: "Empresa solicitada", data: biz }); 

    } catch (err) {

        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al obtener la empresa", error: err.message });
    }
};

const getUsers = async (req, res) => {
    const {biz} = req
    try {
        // Buscamos el tipo de actividad en la web de la empresa y su ciudad
        const webData = await webModel.findOne({businessCIF: biz.CIF})

        if (!webData) {
            return res.status(404).send({ message: "Web de la empresa no encontrada" });
        }
        const activity = webData.activity
        const city = webData.city

        // Buscar todos usuarios que esten abiertos a ofertas
        const emails = await usersModel.find({ openToOffers: true, city: city, hobbies: activity  }, "email");

        res.status(200).send({ message: "Todos los emails de los usuarios", data: emails });
    } 
    catch (err) {
        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al obtener las empresas", error: err.message });
    }
};


// Crear una nueva empresa
const createBiz = async (req, res) => {
    const { ...body } = matchedData(req); // Obtener los datos del cuerpo de la solicitud

    try {

        // Buscar empresa por CIF
        const existingBiz = await businessModel.findOne({CIF: body.CIF})

        // Si no existe 
        if (existingBiz) {
            return res.status(404).send({ message: `Empresa con CIF ${body.CIF} ya existente` });
        }

        // Crear nueva empresa con los datos
        const biz= await businessModel.create(body);


        const data = {
            token: await bizTokenSign(biz),
            biz: biz
        }

        // Enviar la lista de empresas con la nueva emprsesa incluida
        res.status(200).send({ message: "Nueva empresa creada", data: data });

    } catch (err) {

        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al crear una empresa", error: err.message });
    }
};

const sendMail = async (req, res) => {
    try {
        const info = matchedData(req)
        const data = await sendEmail(info)
        res.status(200).send({ message: "email enviado correctamente", data: data });

    } catch (err) {

        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al enviar un email", error: err.message });
    }
}


// Actualizar una empresa por CIF
const updateBiz = async (req, res) => {
    const { cif, ...body } = matchedData(req); // Obtener los datos del cuerpo de la solicitud y el cif de la URL
    
    try {

        // Actualizar empresa por CIF
        const updatedBiz = await businessModel.findOneAndUpdate({ CIF: cif }, body, { new: true });
        
        // Si no existe
        if (!updatedBiz) {
            return res.status(404).send({ message: `Empresa con CIF: ${cif} no encontrada` });
        }
        
        // Enviar la empresa actualizada 
        res.status(200).send({ message: "Empresa actualizada", data: updatedBiz });

    } catch (err) {

        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al actualizar la empresa", error: err.message });
    }
};

// Restaurar una empresa que ha sido eliminada lógicamente
const restoreBiz = async (req, res) => {
    const { cif } = matchedData(req); // Obtener el CIF de la URL


    try {
        // Primero verificamos si la empresa existe en la base de datos, incluyendo documentos borrados lógicamente
        const existingBiz = await businessModel.findOneWithDeleted({ CIF: cif });

        // Si no existe en la base de datos, significa que fue eliminada físicamente
        if (!existingBiz) {
            return res.status(404).send({ message: `Empresa con CIF: ${cif} no encontrada o eliminada físicamente, no se puede restaurar` });
        }

        // Si el documento existe pero no está eliminado lógicamente
        if (!existingBiz.deleted) {
            return res.status(404).send({ message: "Empresa existente, no necesita ser restaurada" });
        }

        // Restaurar el documento que ha sido eliminado lógicamente
        const restoredBiz = await businessModel.restore({ CIF: cif }); 

        // Enviar empresa restaurada
        res.status(200).send({ message: "Empresa restaurada", data: restoredBiz });

    } catch (err) {

        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al restaurar la empresa", error: err.message });
    }
};

// Borrar una empresa (lógica o físicamente)
const deleteBiz = async (req, res) => {
    const {cif} = matchedData(req); // Obtener el CIF de la URL y el parámetro sobre el borrado
    const {logic}= req.query

    if (logic == 'true') {
        try {
            // Realizar borrado lógico (usando mongoose-delete)
            const deletedBiz = await businessModel.delete({ CIF: cif });

            // Si no existe
            if (!deletedBiz) {
                return res.status(404).send({ message: `Empresa con CIF: ${cif} no encontrada`  });
            }

            // Enviar mensaje de que se ha borrado correctamente la empresa
            res.status(200).send({ message: "Empresa eliminada lógicamente" });

        } catch (err) {

            /// Control de errores, en caso de fallo en el código
            res.status(500).send({ message: "Error al ejecutar el borrado lógico", error: err.message });
        }
    } 
    else{
        try {

            // Eliminar la web asociada solo si existe
            await webModel.findOneAndDelete({ businessCIF: cif });

            // Borrado físico de la base de datos
            const deletedBiz = await businessModel.findOneAndDelete({ CIF: cif });
            
            // Si no existe
            if (!deletedBiz) {
                return res.status(404).send({ message: `Empresa con CIF: ${cif} no encontrada`  });
            }

            // Enviar mensaje de que se ha borrado correctamente la empresa
            res.status(200).send({ message: "Empresa eliminada físicamente" });

        } catch (err) {

            // Control de errores, en caso de fallo en el código
            res.status(500).send({ message: "Error al ejecutar el borrado físico", error: err.message });
        }
    }
};


// Exportar las funciones para que se puedan utilizar en otros archivos
module.exports = { 
    getBizs, getBiz, getUsers,
    createBiz, sendMail,
    updateBiz, restoreBiz, 
    deleteBiz 
};
