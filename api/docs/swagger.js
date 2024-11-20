const swaggerJsdoc = require("swagger-jsdoc");
const { updateUser } = require("../schemas/register");

const options = {

    definition: {
            openapi: "3.1.0",

            info: {
                title: " Express API with Swagger ",
                version: "0.1.0",
                description: "This is a CRUD API application made with Express and documented with Swagger",

                license: {
                    name: "MIT",
                    url: "https://spdx.org/licenses/MIT.html",
                },

                contact: {
                    name: "Álvaro Caravaca Díez",
                    url: "https://u-tad.com",
                    email: "alvaro.caravaca@immune.institute",

                },

            },

            servers: [

                {
                    url: "http://localhost:3000",
                },

            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer"
                    },
                },
                
                schemas:{
                    register: require("../schemas/register"),
                    user: require("../schemas/user"),
                    login: require("../schemas/login"),
                    business: require("../schemas/business"),
                    web:require("../schemas/web")
            },
        }
    },

    apis: ["./routes/*.js"],

};

module.exports = swaggerJsdoc(options)