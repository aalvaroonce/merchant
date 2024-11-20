const { matchedData } = require("express-validator")
const { userTokenSign } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")
const { usersModel } = require("../models")

const getUsers = async (req, res) => {
    const { upwards } = req.query; // Obtenemos la query de la URL
    const {user}= req

    // Validamos que el parámetro 'upwards' sea 'true', 'false' o no esté presente
    if (upwards !== undefined && upwards !== "true" && upwards !== "false") {
        return res.status(400).send({message: "Inserte una query correcta (upwards=true o upwards=false)"});
    }

    // Definimos sortOrder en función de cómo se quieran pasar los datos
    let sortOrder= upwards === "true" ? 1
                    :upwards === "false" ? -1 
                    :null;

    try {
        // Buscar los usuarios, si sortOrder está definido, se ordenan, de lo contrario no se aplica orden
        const users = await usersModel.find({}).sort(sortOrder ? { name: sortOrder } : {});

        // Determinar el mensaje según el valor de 'upwards'
        const message = sortOrder === 1 ? "Usuarios ordenadas ascendentemente (por nombre)" 
                        : sortOrder === -1 ? "Usuarios ordenadas descendentemente (por nombre)" 
                        : "Todas las usuarios actualmente activas";

        res.status(200).send({ message: message, users: users, token: user });
    } 
    catch (err) {
        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al obtener los usuarios", error: err.message });
    }
}

const getUser= async (req, res) => {

    const {id} = matchedData(req); // Obtener el id del parámetro de la URL
    
    try {
        
        // Buscar user por id
        const user = await usersModel.findById(id)

        // Si no existe 
        if (!user) {
            return res.status(404).send({ message: "User no encontrado" });
        }
        
        // Enviar el user elegida
        res.status(200).send({ message: "User solicitado", data: user }); 

    } catch (err) {

        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al obtener el user", error: err.message });
    }
}

const registerCtrl = async (req, res) =>{
    try{
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req, password} // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
        const dataUser = await usersModel.create(body)

        dataUser.set('password', undefined, { strict: false })
        
        const data = {
            token: await userTokenSign(dataUser),
            user: dataUser
        }

        // Enviar el user elegida
        res.status(200).send({ message: "Registrado correctamente", data: data }); 
    }
    catch(err){
        res.status(500).send( { message: "Error al registrar el usuario", error: err.message })
    }
}

const loginCtrl = async (req, res) => {

    try {
        
        req = matchedData(req)
        const user = await usersModel.findOne({ email: req.email }).select()
        
        if(!user){
            res.status(404).send({ message: "Usuario no existente" })
            return
        }
    
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)
        
        if(!check){
            res.status(401).send({ message: "Contraseña incorrecta" })
            return
        }
        
        user.set("password", undefined, {strict:false}) //Si no queremos que se muestre el hash en la respuesta
    
        const data = {
            token: await userTokenSign (user),
            user: user
        }
        res.status(200).send({ message: "Logeado correctamente", data: data })
    }
    catch(err){ 
        res.status(500).send({ message: "Error al registrar el usuario", error: err.message })
    }
}

const updateUser = async (req, res) => {
    const { id, ...body } = matchedData(req); // Obtener los datos del cuerpo de la solicitud y el id de la URL
    
    try {

        // Actualizar user por id
        const updatedUser = await usersModel.findByIdAndUpdate( id , body, { new: true });
        
        // Si no existe
        if (!updatedUser) {
            return res.status(404).send({ message: `User con id: ${id} no encontrado` });
        }
        
        // Enviar el user actualizada 
        res.status(200).send({ message: "User actualizado", data: updatedUser });

    } catch (err) {

        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al actualizar la user", error: err.message });
    }
}

// Restaurar un user que ha sido eliminado lógicamente
const restoreUser = async (req, res) => {
    const {id} = matchedData(req); // Obtener el id de la URL

    try {
        // Primero verificamos si el user existe en la base de datos, incluyendo documentos borrados lógicamente
        const existingUser = await usersModel.findOneWithDeleted({ _id: id });

        // Si no existe en la base de datos, significa que fue eliminado físicamente
        if (!existingUser) {
            return res.status(404).send({ message: `User con id: ${id} no encontrado o eliminado físicamente, no se puede restaurar` });
        }

        // Si el documento existe pero no está eliminado lógicamente
        if (!existingUser.deleted) {
            return res.status(404).send({ message: "User existente, no necesita ser restaurado" });
        }

        // Restaurar el documento que ha sido eliminado lógicamente
        const restoredUser = await usersModel.restore({ _id: id }); 

        // Enviar user restaurado
        res.status(200).send({ message: "Usuario restaurado", data: restoredUser });

    } catch (err) {

        // Control de errores, en caso de fallo en el código
        res.status(500).send({ message: "Error al restaurar el usuario", error: err.message });
    }
};

const deleteUser = async (req, res) => {
    const {id} = matchedData(req); // Obtener el id de la URL y el parámetro sobre el borrado
    const {logic} = req.query

    if (logic == 'true') {
        try {
            // Realizar borrado lógico (usando mongoose-delete)
            const deletedUser = await usersModel.delete({ _id: id });

            // Si no existe
            if (!deletedUser) {
                return res.status(404).send({ message: `User con id: ${id} no encontrado`  });
            }

            // Enviar mensaje de que se ha borrado correctamente la user
            res.status(200).send({ message: "User eliminado lógicamente" });

        } catch (err) {

            // Control de errores, en caso de fallo en el código
            res.status(500).send({ message: "Error al ejecutar el borrado lógico", error: err.message });
        }
    } 
    else{
        try {
            // Borrado físico de la base de datos
            const deletedUser = await usersModel.findOneAndDelete({ _id: id });
            
            // Si no existe
            if (!deletedUser) {
                return res.status(404).send({ message: `User con id: ${id} no encontrado`  });
            }

            // Enviar mensaje de que se ha borrado correctamente la user
            res.status(200).send({ message: "User eliminado físicamente" });

        } catch (err) {

            // Control de errores, en caso de fallo en el código
            res.status(500).send({ message: "Error al ejecutar el borrado físico", error: err.message });
        }
    }

}



module.exports = { registerCtrl, loginCtrl, updateUser, getUsers, deleteUser, getUser, restoreUser }