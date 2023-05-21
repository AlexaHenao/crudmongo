const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Alexa:_123@cluster0.it2vlnf.mongodb.net/"

async function crearColeccion(){
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const result = await cliente.db('soft_Imperio').createCollection("Usuarios", {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    title: "SchemaUsuarios",
                    required: [
                        "Id_Usuario",
                        "Id_Rol",
                        "Nombre",
                        "Documento",
                        "Email",
                        "Telefono",
                        "Foto",
                        "Password",
                        "Estado"
                    ],
                    propierties: {
                        "Id_Usuario": {
                            "bsonType": "int"
                        },
                        "Id_Rol": {
                            "bsonType": "int"
                        },
                        "Nombre": {
                            "bsonType": "string"
                        },
                        "Documento": {
                            "bsonType": "int"
                        },
                        "Email": {
                            "bsonType": "string"
                        },
                        "Telefono": {
                            "bsonType": "int"
                        },
                        "Foto": {
                            "bsonType": "string"
                        },
                        "Password": {
                            "bsonType": "string"
                        },
                        "Estado": {
                            "bsonType": "string"
                        }                
                    }
                } 
            }
        })
        if (result) {
            console.log("Se creó la colección correctamente");
        } else{
            console.log("Error al crear la colección");
        }   
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
crearColeccion();