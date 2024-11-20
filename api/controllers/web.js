// Importamos el modelo webModel desde el archivo models
const {webModel} = require('../models');
const { matchedData } = require('express-validator');
const {deleteImages}= require('../utils/handleStorage')
const {uploadToPinata}= require('../utils/handleUploadIPFS')

// Devolvemos todas las webs
const getWebs = async (req, res) => {
    const { upwards } = req.query; // Obtenemos la query de la URL

    // Validamos que el parámetro 'upwards' sea 'true', 'false' o no esté presente
    if (upwards !== undefined && upwards !== "true" && upwards !== "false") {
        return res.status(400).send({message: "Inserte una query correcta (upwards=true o upwards=false)"});
    }

    // Definimos sortOrder en función de cómo se quieran pasar los datos
    let sortOrder= upwards === "true" ? 1
                    :upwards === "false" ? -1 
                    :null;
                    
    try {
        // Buscar las webs, si sortOrder está definido, se ordenan, de lo contrario no se aplica orden
        const webs = await webModel.find({}).sort(sortOrder ? { name: sortOrder } : {});

        // Determinar el mensaje según el valor de 'upwards'
        const message = sortOrder === 1 ? "Webs ordenadas ascendentemente (por nombre)" 
                        : sortOrder === -1 ? "Webs ordenadas descendentemente (por nombre)" 
                        : "Todas las webs actualmente activas";

        res.status(200).send({ message, webs });
    } 
    catch (err) {
        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al obtener las webs", error: err.message });
    }
};


// Obtener una web por id
const getWeb = async (req, res) => {
    const {cif} = matchedData(req); // Obtener el id del parámetro de la URL
    
    try {
        
        // Buscar web por id
        const data = await webModel.findOne({ businessCIF: cif })

        // Si no existe 
        if (!data) {
            return res.status(404).send({ message: `Web con businessCIF: ${cif} no encontrada` });
        }
        
        // Enviar la web elegida
        res.status(200).send({ message: "Web solicitada", data: data }); 

    } catch (err) {

        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al obtener la web", error: err.message });
    }
};

// Función principal de obtener webs
const searchWebs = async (req, res) => {
    const { sortByScoring, upwards } = req.query; // Obtenemos las querys de la URL
    const { city, activity } = req.params; // Obtenemos los parámetros de la URL

    // Creamos la query con los posibles parámetros de búsqueda
    const query= {}
    if (city && city != "empty") query.city = city;
    if (activity && activity != "empty") query.activity = activity;

    // Validamos el parámetro 'upwards' y lo convierte en orden numérico
    const sortOrder= upwards === "false" ? -1 :1;
    
    // Definimos el ordenamiento en función de scoring
    const sortCriteria = sortByScoring ? { "reviews.scoring": sortOrder } : {};

    try {
        // Realizamos la búsqueda con los filtros y el ordenamiento definidos
        const webs = await webModel.find(query).sort(sortCriteria);
        const orderDirection = sortOrder === 1 ? "de mayor a menor" : "de menor a mayor";
        let message= ""

        if (city && activity) {
            message= `Webs filtradas por ciudad (${city}) y actividad (${activity}) ordenadas ${orderDirection} por scoring`;
        } 
        else if (city) {
            message= `Webs filtradas por ciudad (${city}) ordenadas ${orderDirection} por scoring`;
        } 
        else {
            message= `Todas las webs ordenadas ${orderDirection} por scoring`;
        }

        res.status(200).send({ message, webs });
    } catch (err) {
        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al obtener las webs", error: err.message });
    }
};


// Crear una nueva web
const createWeb = async (req, res) => {
    const { ...body } = matchedData(req); // Obtener los datos del cuerpo de la solicitud

    try {

        // Comprobamos que no exista una web asociado al mismo CIF
        const existingWeb = await webModel.findOne({ businessCIF: body.businessCIF });

        // Si ya existe una web
        if (existingWeb) {
            return res.status(400).send({ message: "El comercio ya tiene una página web" });
        }

        // Crear nueva web con los datos
        const data= await webModel.create(body);

        // Enviar la lista de webs con la nueva emprsesa incluida
        res.status(200).send({ message: "Nueva web creada", data: data });

    } catch (err) {

        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al crear una web", error: err.message });
    }
};

// Actualizar una web por id
const updateWeb = async (req, res) => {
    const { cif, ...body } = matchedData(req); // Obtener los datos del cuerpo de la solicitud y el CIF de la URL
    
    try {

        // Actualizar web por id
        const updatedData = await webModel.findOneAndUpdate({businessCIF: cif}, body, { new: true });
        
        // Si no existe
        if (!updatedData) {
            return res.status(404).send({ message: `Web con businessCIF: ${cif} no encontrada`});
        }
        
        // Enviar la web actualizada 
        res.status(200).send({ message: "Web actualizada", data: updatedData });

    } catch (err) {

        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al actualizar la web", error: err.message });
    }
};

const addImage = async (req, res) => {
    const {cif} = matchedData(req) // Obtenemos los datos del archivo de la solicitud y el cif de la URL
    const {file} = req

    try {

        // Creamos la estructura de como vamos a guardar los datos
        const imageUrl=  process.env.PUBLIC_URL+ "/storage/image-"+ file.originalname
        const actualData= await webModel.findOne({ businessCIF: cif })

        if (actualData.imageArray.includes(imageUrl)) {
            return res.status(400).send({ message: "Imagen ya existe en la base de datos" });
        } 
        
        // Actualizamos los datos de imageArray con $push para añadirlos a la lista ya existente
        const updatedData = await webModel.findOneAndUpdate({businessCIF: cif}, { $push:{ imageArray: imageUrl }}, { new:true })
    
        // Si no existe
        if (!updatedData) {
            return res.status(404).send({ message: `Web con businessCIF: ${cif} no encontrada`});
        }

        // Responder con la página actualizada
        res.status(200).send({ message: "Imagen agregada correctamente", data: updatedData });

    } catch (err) {
        // Control de errores, en caso de que el código falle
        res.status(500).send({ message: "Error al agregar la imagen", error: err.message });
    }
}

const addImageMemory = async (req, res) => {
    try {
        const {cif} = matchedData(req)
        const fileBuffer = req.file.buffer
        const fileName = req.file.originalname
        const pinataResponse = await uploadToPinata(fileBuffer, fileName, cif)
        const ipfsFile = pinataResponse.IpfsHash
        const ipfs = `https://${process.env.PINATA_GATEWAY_URL}/ipfs/${ipfsFile}`
        const data = await webModel.findOneAndUpdate({businessCIF: cif}, { $push:{ imageArray: ipfs }}, { new:true })

        res.status(200).send({ message: "Imagen agregada correctamente", data: data });
    }catch(err) {
        console.log(err)
        res.status(500).send({ message: "Error al agregar la imagen en la nube", error: err.message });
    }
 }
 

const addText = async (req, res) => {
    const {cif, ...body} = matchedData(req) // Obtenemos los datos del archivo de la solicitud y el cif de la URL

    try {

        // Comprobamos que no exita ya el texto
        const actualData= await webModel.findOne({ businessCIF: cif })

        if (actualData.textArray.includes(body.textArray)) {
            return res.status(400).send({ message: "Texto ya existe en la base de datos" });
        } 

        // Actualizamos los datos de textArray con $push para añadirlos a la lista ya existente
        const updatedData = await webModel.findOneAndUpdate({businessCIF: cif}, { $push:{ textArray: body.textArray }}, { new:true })
    
        // Si no existe
        if (!updatedData) {
            return res.status(404).send({ message: `Web con businessCIF: ${cif} no encontrada`});
        }

        // Responder con la página actualizada
        res.status(200).send({ message: "Texto agregada correctamente", data: updatedData });

    } catch (err) {
        // Control de errores, en caso de que el código falle
        res.status(500).send({ message: "Error al agregar la texto", error: err.message });
    }
}

const addReview = async (req, res) => {
    const { cif, scoring, reviewText } = matchedData(req); // Obtenemos los datos
    const userId = req.user._id; // Cogemos el id del user del token

    try {
        // Buscar la web usando el businessCIF
        const actualData = await webModel.findOne({ businessCIF: cif });

        // Si no existe la web, responder con un error
        if (!actualData) {
            return res.status(404).send({ message: `Web con businessCIF: ${cif} no encontrada` });
        }

        // Verificar si el usuario ya ha hecho una review
        const existingReviewIndex = actualData.reviews.reviewTexts.findIndex(
            (review) => review.userId.toString() === userId.toString()
        );

        let updatedData;
        if (existingReviewIndex !== -1) {

            // Si el usuario ya ha hecho una review, actualizar la review existente
            actualData.reviews.reviewTexts[existingReviewIndex].scoring = scoring;
            actualData.reviews.reviewTexts[existingReviewIndex].reviewText = reviewText;

            // Recalcular el promedio de scoring
            const totalRatings = actualData.reviews.reviewTexts.length;
            const newScoring = (
                actualData.reviews.reviewTexts.reduce((sum, review) => sum + review.scoring, 0) / totalRatings
            ).toFixed(2);

            actualData.reviews.scoring = newScoring;
            updatedData = await actualData.save();
        } else {
            
            // Si no ha hecho una review, agregar una nueva
            const totalRatings = actualData.reviews.totalRatings + 1;
            const newScoring = (((actualData.reviews.scoring * actualData.reviews.totalRatings) + scoring) / totalRatings).toFixed(2);

            updatedData = await webModel.findOneAndUpdate(
                { businessCIF: cif },
                {
                    $set: {
                        'reviews.scoring': newScoring,
                        'reviews.totalRatings': totalRatings
                    },
                    $push: {
                        'reviews.reviewTexts': { userId, scoring, reviewText }
                    }
                },
                { new: true }
            );
        }

        // Responder con la página actualizada
        res.status(200).send({ message: "Review agregada o actualizada correctamente", data: updatedData });

    } catch (err) {
        // Control de errores, en caso de que el código falle
        res.status(500).send({ message: "Error al agregar la review", error: err.message });
    }
};


// Restaurar una web que ha sido eliminada lógicamente
const restoreWeb = async (req, res) => {
    const {cif} = matchedData(req); // Obtener el CIF de la URL

    try {
        // Primero verificamos si la web existe en la base de datos, incluyendo documentos borrados lógicamente
        const existingWeb = await webModel.findOneWithDeleted({ businessCIF: cif });

        // Si no existe en la base de datos, significa que fue eliminada físicamente
        if (!existingWeb) {
            return res.status(404).send({ message: "Web no encontrada o eliminada físicamente, no se puede restaurar" });
        }

        // Si el documento existe pero no está eliminado lógicamente
        if (!existingWeb.deleted) {
            return res.status(404).send({ message: "Web existente, no necesita ser restaurada" });
        }

        // Restaurar el documento que ha sido eliminado lógicamente
        const restoredWeb = await webModel.restore({ businessCIF: cif }); 

        // Enviar web restaurada
        res.status(200).send({ message: "Web restaurada", data: restoredWeb });

    } catch (err) {

        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al restaurar la web", error: err.message });
    }
};


// Borrar una web (lógica o físicamente)
const deleteWeb = async (req, res) => {
    const {cif} = matchedData(req); // Obtener el cif de la URL y el parámetro del borrado
    const {logic} = req.query

    if (logic == 'true') {
        try {
            // Realizar borrado lógico (usando mongoose-delete)
            const deletedWeb = await webModel.delete({businessCIF: cif });

            // Si no existe
            if (!deletedWeb) {
                return res.status(404).send({ message: "Web no encontrada para eliminar" });
            }

            // Enviar mensaje de que se ha borrado correctamente la web
            res.status(200).send({ message: "Web eliminada lógicamente" });

        } catch (err) {

            /// Control de errores, en caso de fallo en el código
            res.status(500).send({ message: "Error al ejecutar el borrado lógico", error: err.message });
        }
    } 
    else {
        try {
            // Capturamos la web a eliminar
            const webToDelete = await webModel.findOne({businessCIF: cif})

            if (!webToDelete){
                return res.status(404).send({ message: "Web no encontrada para eliminar" });
            }
            //Borramos las imágenes del almacenamiento interno
            deleteImages(webToDelete.imageArray)

            // Borrado físico de la base de datos
            const deletedWeb = await webModel.findOneAndDelete({ businessCIF: cif });

            // Si no existe
            if (!deletedWeb) {
                return res.status(404).send({ message: "Web no encontrada para eliminar" });
            }
                
            // Enviar mensaje de que se ha borrado correctamente la web
            res.status(200).send({ message: "Web eliminada físicamente" });

        } catch (err) {

            // Control de errores, en caso de fallo en el código
            res.status(500).send({ message: "Error al ejecutar el borrado físico", error: err.message });
        }
    }

};

module.exports = { 
    getWebs, getWeb, searchWebs,
    createWeb, 
    updateWeb, restoreWeb, 
    addImage, addImageMemory,addText, addReview,
    deleteWeb 
};
