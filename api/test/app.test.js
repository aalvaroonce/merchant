const request = require('supertest');
const app = require('../app')
const path= require('path')

describe('users', () => {

    let tokenAdmin = ""
    let idUser= ""
    let id = ""

    it('should register a admin', async () => {
        
        const response = await request(app)
            .post('/api/users/register')
            .send({
                "name": "Menganito",
                "email": "user25@test.com",
                "password": "HolaMundo.01",
                "age": 20,
                "city": "Madrid",
                "hobbies": ["Restaurant", "Football"],
                "role":"admin"
            })
            .set('Accept', 'application/json')

    
        // Verificaciones de los datos devueltos en el cuerpo de la respuesta
        expect(response.statusCode).toBe(200);
        expect(response.body.data.user.name).toEqual('Menganito');
        expect(response.body.data.user.email).toEqual('user25@test.com');
        expect(response.body.data.user.role).toEqual('admin');
        expect(response.body.data.user.age).toBe(20); // Edad como número
        expect(response.body.data.user.city).toEqual('Madrid'); // Verificación de ciudad
        expect(response.body.data.user.hobbies).toEqual(["Restaurant", "Football"]); // Validación de hobbies
    
        // Comprobamos que el token y el id existan y no estén vacíos
        expect(response.body.data.token).toBeDefined();
        expect(response.body.data.token).not.toBe('');
        expect(response.body.data.user._id).toBeDefined();
    
        // Guardamos el token y el id para usos posteriores en otros tests
        
        tokenAdmin = response.body.data.token;
        id = response.body.data.user._id;
    });

    it('should register a user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                "name": "Antonio",
                "email": "antonioelguapo@test.com",
                "password": "pep1A3nqekf.01",
                "age": 20,
                "city": "Madrid",
                "hobbies": ["Restaurant", "Tennis"],
            })
            .set('Accept', 'application/json')

    
        // Verificaciones de los datos devueltos en el cuerpo de la respuesta

        expect(response.statusCode).toBe(200);
        expect(response.body.data.user.name).toEqual('Antonio');
        expect(response.body.data.user.email).toEqual('antonioelguapo@test.com');
        expect(response.body.data.user.age).toBe(20); // Edad como número
        expect(response.body.data.user.city).toEqual('Madrid'); // Verificación de ciudad
        expect(response.body.data.user.hobbies).toEqual(["Restaurant", "Tennis"]); // Validación de hobbies
    
        // Comprobamos que el token y el id existan y no estén vacíos
        expect(response.body.data.token).toBeDefined();
        expect(response.body.data.token).not.toBe('');
        expect(response.body.data.user._id).toBeDefined();
    
        // Guardamos el token y el id para usos posteriores en otros tests
        // const tokenUser = response.body.data.token;
        idUser = response.body.data.user._id;

    });
    
    it('should log in a user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                "email": "antonioelguapo@test.com",
                "password": "pep1A3nqekf.01",
            })
            .set('Accept', 'application/json')

    
        // Verificaciones de los datos devueltos en el cuerpo de la respuesta
        expect(response.statusCode).toBe(200);
        expect(response.body.data.user.email).toEqual('antonioelguapo@test.com');
    
        // Comprobamos que el token y el id existan y no estén vacíos
        expect(response.body.data.token).toBeDefined();
        expect(response.body.data.token).not.toBe('');
        expect(response.body.data.user._id).toBeDefined();
    });

    it('should get a Unusersorized error', async () => {
        const response = await request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
        
        expect(response.statusCode).toBe(401);
    });

    it('should get the users', async () => {
        const response = await request(app)
            .get('/api/users')
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.users.pop().name).toEqual('Antonio')
    });

    it('should get a user by id', async () => {
        const response = await request(app)
            .get('/api/users/'+idUser)
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.data.name).toEqual('Antonio')
    });

    it('should update a user', async () => {
        const response = await request(app)
            .put('/api/users/'+idUser)
            .auth(tokenAdmin, { type: 'bearer' })
            .send({
                "name": "Alfredo",
                "email": "antonioelguapo@test.com",
                "age": 80,
                "city": "Madrid",
                "hobbies": ["Restaurant", "Tennis"],
            })
            .set('Accept', 'application/json')

    
        // Verificaciones de los datos devueltos en el cuerpo de la respuesta
        expect(response.statusCode).toBe(200);
        expect(response.body.data.name).toEqual('Alfredo');
        expect(response.body.data.email).toEqual('antonioelguapo@test.com');
        expect(response.body.data.age).toBe(80); // Edad como número
        expect(response.body.data.city).toEqual('Madrid'); // Verificación de ciudad
        expect(response.body.data.hobbies).toEqual(['Restaurant', 'Tennis']); // Validación de hobbies

    });

    it('should delete a user (logic)', async () => {
        const response = await request(app)
            .delete('/api/users/'+idUser+'?logic=true')
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("User eliminado lógicamente")
    });

    it('should restore a user', async () => {
        const response = await request(app)
            .put('/api/users/restore/'+idUser)
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Usuario restaurado")
    })

    it('should delete a user (fisic)', async () => {
        const response = await request(app)
            .delete('/api/users/'+idUser)
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json')
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("User eliminado físicamente")
    })

})


describe('business', () => {

    let tokenAdmin = ""
    let tokenBiz= ""
    let cif = ""
    let id= "" 

    it('should log in an admin', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                "email": "user25@test.com",
                "password": "HolaMundo.01"
            })
            .set('Accept', 'application/json')

    
        // Verificaciones de los datos devueltos en el cuerpo de la respuesta
        expect(response.statusCode).toBe(200);
        expect(response.body.data.user.email).toEqual('user25@test.com');
    
        // Comprobamos que el token y el id existan y no estén vacíos
        expect(response.body.data.token).toBeDefined();
        expect(response.body.data.token).not.toBe('');
        expect(response.body.data.user._id).toBeDefined();

        tokenAdmin= response.body.data.token
        id= response.body.data.user._id
    });

    it('should create a business', async () => {
        const response = await request(app)
            .post('/api/business')
            .auth(tokenAdmin, { type: 'bearer' })
            .send({
                "name":"berskha",
                "CIF":"H03802347",
                "direction": "c/ santillana 37",
                "email":"berskha@email.com",
                "phone":"094298423",
                "pageID": 2480
            })
            .set('Accept', 'application/json')

    
        // Verificaciones de los datos devueltos en el cuerpo de la respuesta
        expect(response.statusCode).toBe(200);
        expect(response.body.data.biz.name).toEqual('berskha');
        expect(response.body.data.biz.CIF).toEqual('H03802347');
        expect(response.body.data.biz.direction).toEqual('c/ santillana 37');
        expect(response.body.data.biz.email).toEqual('berskha@email.com'); // Edad como número
        expect(response.body.data.biz.phone).toEqual('094298423'); // Verificación de ciudad
        expect(response.body.data.biz.pageID).toBe(2480); // Validación de hobbies
    
        // Comprobamos que el token y el id existan y no estén vacíos
        expect(response.body.data.token).toBeDefined();
        expect(response.body.data.token).not.toBe('');
        expect(response.body.data.biz.CIF).toBeDefined();
    
        // Guardamos el token y el id para usos posteriores en otros tests
        cif = response.body.data.biz.CIF;
        tokenBiz= response.body.data.token
    });

    it('should get a Unusersorized error', async () => {
        const response = await request(app)
            .get('/api/business')
            .set('Accept', 'application/json')
        
        expect(response.statusCode).toBe(401);
    });

    it('should get the businesses', async () => {
        const response = await request(app)
            .get('/api/business')
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.bizs.pop().name).toEqual('berskha')
    });

    it('should get a business by cif', async () => {
        const response = await request(app)
            .get('/api/business/'+cif)
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.data.name).toEqual('berskha')
    });

    it('should update a business', async () => {
        const response = await request(app)
            .put('/api/business/'+cif)
            .auth(tokenBiz, { type: 'bearer' })
            .send({
                "name":"primark",
                "direction": "c/ santillana 37",
                "email":"primark@email.com",
                "phone":"094298423",
                "pageID": 2480
            })
            .set('Accept', 'application/json')

        console.log(response.body)
        // Verificaciones de los datos devueltos en el cuerpo de la respuesta
        expect(response.statusCode).toBe(200);
        expect(response.body.data.name).toEqual('primark');
        expect(response.body.data.CIF).toEqual('H03802347');
        expect(response.body.data.direction).toEqual('c/ santillana 37');
        expect(response.body.data.email).toEqual('primark@email.com'); // Edad como número
        expect(response.body.data.phone).toEqual('094298423'); // Verificación de ciudad
        expect(response.body.data.pageID).toBe(2480); // Validación de hobbies
    
    });

    it('should delete a business (logic)', async () => {
        const response = await request(app)
            .delete('/api/business/'+cif+'?logic=true')
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Empresa eliminada lógicamente")
    });

    it('should restore a business', async () => {
        const response = await request(app)
            .put('/api/business/restore/'+cif)
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Empresa restaurada")
    })

    it('should delete a business (fisic)', async () => {
        const response = await request(app)
            .delete('/api/business/'+cif)
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Empresa eliminada físicamente")
    })
})


describe('web', () => {

    let tokenBiz = ""
    let tokenAdmin= ""
    let cif = ""
    let id=""

    it('should log in an admin', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                "email": "user25@test.com",
                "password": "HolaMundo.01"
            })
            .set('Accept', 'application/json')

    
        // Verificaciones de los datos devueltos en el cuerpo de la respuesta
        expect(response.statusCode).toBe(200);
        expect(response.body.data.user.email).toEqual('user25@test.com');
    
        // Comprobamos que el token y el id existan y no estén vacíos
        expect(response.body.data.token).toBeDefined();
        expect(response.body.data.token).not.toBe('');
        expect(response.body.data.user._id).toBeDefined();

        tokenAdmin= response.body.data.token
        id= response.body.data.user._id
    });

    it('should create a business', async () => {
        const response = await request(app)
            .post('/api/business')
            .auth(tokenAdmin, { type: 'bearer' })
            .send({
                "name":"berskha",
                "CIF":"H03802347",
                "direction": "c/ santillana 37",
                "email":"berskha@email.com",
                "phone":"094298423",
                "pageID": 2480
            })
            .set('Accept', 'application/json')

    
        // Verificaciones de los datos devueltos en el cuerpo de la respuesta
        expect(response.statusCode).toBe(200);
        expect(response.body.data.biz.name).toEqual('berskha');
        expect(response.body.data.biz.CIF).toEqual('H03802347');
        expect(response.body.data.biz.direction).toEqual('c/ santillana 37');
        expect(response.body.data.biz.email).toEqual('berskha@email.com'); // Edad como número
        expect(response.body.data.biz.phone).toEqual('094298423'); // Verificación de ciudad
        expect(response.body.data.biz.pageID).toBe(2480); // Validación de hobbies
    
        // Comprobamos que el token y el id existan y no estén vacíos
        expect(response.body.data.token).toBeDefined();
        expect(response.body.data.token).not.toBe('');
        expect(response.body.data.biz.CIF).toBeDefined();

        tokenBiz= response.body.data.token
        cif= response.body.data.biz.CIF
    });

    it('should create a web', async () => {
        const response = await request(app)
            .post('/api/web')
            .auth(tokenBiz, { type: 'bearer' })
            .send({
                "businessCIF": cif,
                "city": "Madrid",
                "activity": "Restaurante",
                "heading": "Delicias de Madrid",
                "summary": "Un restaurante con las mejores tapas de la ciudad."
            })
            .set('Accept', 'application/json')

        // Verificaciones de los datos devueltos en el cuerpo de la respuesta
        expect(response.statusCode).toBe(200);
        expect(response.body.data.businessCIF).toEqual(cif);
        expect(response.body.data.city).toEqual('Madrid');
        expect(response.body.data.activity).toEqual('Restaurante');
        expect(response.body.data.heading).toEqual('Delicias de Madrid'); 
        expect(response.body.data.summary).toEqual('Un restaurante con las mejores tapas de la ciudad.'); 

        // Comprobamos que el id exista y no estén vacíos
        expect(response.body.data._id).toBeDefined();
    
    });

    it('should get a Unusersorized error', async () => {
        const response = await request(app)
            .put('/api/web/restore'+ cif)
            .set('Accept', 'application/json')
        
        expect(response.statusCode).toBe(401);
    });

    it('should return users from the same city that are interested', async () => {
        const response = await request(app)
            .get('/api/business/users')
            .auth(tokenBiz, { type: 'bearer' })
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
    });

    it('should get the webs', async () => {
        const response = await request(app)
            .get('/api/web')
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.webs.pop().city).toEqual('Madrid')
    });

    it('should get a web by cif', async () => {
        const response = await request(app)
            .get('/api/web/'+cif)
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.data.city).toEqual('Madrid')
    });

    it('should update a web', async () => {
        const response = await request(app)
            .put('/api/web/'+cif)
            .auth(tokenBiz, { type: 'bearer' })
            .send({
                "businessCIF": cif,
                "city": "Barcelona",
                "activity": "Restaurante",
                "heading": "Delicias de Barcelona",
                "summary": "Un restaurante con las mejores tapas de la ciudad."
            })
            .set('Accept', 'application/json')

    
        // Verificaciones de los datos devueltos en el cuerpo de la respuesta
        expect(response.statusCode).toBe(200);
        expect(response.body.data.businessCIF).toEqual(cif);
        expect(response.body.data.city).toEqual('Barcelona');
        expect(response.body.data.activity).toEqual('Restaurante');
        expect(response.body.data.heading).toEqual('Delicias de Barcelona'); 
        expect(response.body.data.summary).toEqual('Un restaurante con las mejores tapas de la ciudad.'); 

    });

    it('should add an image to a web', async () => {
        const response = await request(app)
            .patch('/api/web/addimage/'+cif)
            .auth(tokenBiz, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .attach('image', path.join(__dirname, '../images/restaurante2.jpg'), 'restaurante2.jpg')
    
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty("imageArray");
        expect(response.body.data.imageArray.pop().split('/').pop()).toEqual("restaurante2.jpg");
    });

    it('should add a text to a web', async () => {
        const response = await request(app)
            .patch('/api/web/addtext/'+cif)
            .auth(tokenBiz, { type: 'bearer' })
            .send({
                "textArray": "Que buena esta la lasaña"
            })
            .set('Accept', 'application/json')

    
        // Verificaciones de los datos devueltos en el cuerpo de la respuesta
        expect(response.statusCode).toBe(200);
        expect(response.body.data.textArray.pop()).toEqual("Que buena esta la lasaña");
    });

    it('should delete a web (logic)', async () => {
        const response = await request(app)
            .delete('/api/web/'+cif+'?logic=true')
            .auth(tokenBiz, { type: 'bearer' })
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Web eliminada lógicamente")
    });

    it('should restore a web', async () => {
        const response = await request(app)
            .put('/api/web/restore/'+cif)
            .auth(tokenBiz, { type: 'bearer' })
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Web restaurada")
    })

    it('should delete a web (fisic)', async () => {
        const response = await request(app)
            .delete('/api/web/'+cif)
            .auth(tokenBiz, { type: 'bearer' })
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Web eliminada físicamente")
    })

    it('should delete a business (fisic)', async () => {
        const response = await request(app)
            .delete('/api/business/'+cif)
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Empresa eliminada físicamente")
    })

    it('should delete an admin (fisic)', async () => {
        const response = await request(app)
            .delete('/api/users/'+id)
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("User eliminado físicamente")
    })
})

describe('GET /api/web/search/:city/:activity', () => {
    const testCases = [
        // Combinaciones de parámetros
        { city: 'Madrid', activity: 'Restaurante', sortByScoring: 'true', upwards: 'true' },
        { city: 'Madrid', activity: 'Restaurante', sortByScoring: 'true', upwards: 'false' },
        { city: 'Madrid', activity: 'Restaurante', sortByScoring: 'false', upwards: 'true' },
        { city: 'Madrid', activity: 'Restaurante', sortByScoring: 'false', upwards: 'false' },
        { city: 'Madrid', activity: 'Café', sortByScoring: 'true', upwards: 'true' },
        { city: 'Madrid', activity: 'Café', sortByScoring: 'true', upwards: 'false' },
        { city: 'Barcelona', activity: 'Restaurante', sortByScoring: 'true', upwards: 'true' },
        { city: 'Barcelona', activity: 'Café', sortByScoring: 'false', upwards: 'false' },
        { city: '', activity: '', sortByScoring: 'true', upwards: 'true' }, // Sin ciudad ni actividad
    ];

    testCases.forEach(({ city, activity, sortByScoring, upwards }) => {
        it(`should return filtered webs for city: "${city}", activity: "${activity}", sortByScoring: "${sortByScoring}", upwards: "${upwards}"`, async () => {
            const response = await request(app)
                .get(`/api/web/search/${city}/${activity}`)
                .query({ sortByScoring, upwards });
            console.log(response.body)
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('webs');
            // Puedes agregar más expectativas según la lógica de tu aplicación
        });
    });
});