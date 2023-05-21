const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Alexa:_123@cluster0.it2vlnf.mongodb.net/"

async function BasedeDatos() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const result = await cliente.db('soft_Imperio').createCollection("Roles", {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    title: "SchemaRoles",
                    required: [
                        "Id_Rol",
                        "NombreRol"
                    ],
                    properties: {
                        "Id_Rol": {
                            "bsonType": "int"
                        },
                        "NombreRol": {
                            "bsonType": "string"
                        }
                    }
                }
            }
        })
        if (result) {
            console.log("Se creo correctamente la Base de Datos");
        } else {
            console.log("Error al crear la Base de Datos");
        }

    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
BasedeDatos();