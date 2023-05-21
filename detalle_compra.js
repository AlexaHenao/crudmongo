const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Alexa:_123@cluster0.it2vlnf.mongodb.net/"

async function BasedeDatos(){
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const result = await cliente.db('Soft_Imperio').createCollection("Detalle_Compra", {
            validator: {
                bsonType: "object",
                title: "SchemaDetalleCompra",
                required: [
                    "id_detalleCompra",
                    "id_compra",
                    "id_productos",
                    "cantidad_Producto",
                    "subtotalCompra",
                ],
                properties: {
                    "id_detalleCompra": {
                        "bsonType": "int",
                    },
                    "id_compra": {
                        "bsonType": "int",
                    },
                    "id_productos": {
                        "bsonType": "int",
                    },
                    "cantidad_Producto": {
                        "bsonType": "int",
                    },
                    "subtotalCompra": {
                        "bsonType": "float",
                    }
                }
            }
        })
        if (result) {
            console.log("Se creó correctamente la base de datos detalle_compra");
        } else {
            console.log("Error al crear la base de datos detalle_compra")
        }
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
BasedeDatos();    