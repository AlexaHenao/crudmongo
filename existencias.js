const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Alexa:_123@cluster0.it2vlnf.mongodb.net/"

async function BasedeDatos(){
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const result = await cliente.db('soft_Imperio').createCollection("Existencias", {
            validator: {
                bsontype: 'object',
                title: "SchemaExistencias",
                required: [
                    "id_existencias",
                    "id_compra",
                    "id_productos",
                    "id_creditos",
                    "Stock",
                    "Cantidad",
                    "Estado"
                ],
                properties: {
                    "id_existencias": {
                        "bsontype": "int",
                    },
                    "id_compra": {
                        "bsontype": "int",
                    },    
                    "id_productos": {
                        "bsontype": "int",
                    },
                    "id_creditos": {
                        "bsontype": "int",
                    },
                    "Stock": {
                        "bsontype": "int",
                    },
                    "Estado": {
                        "bsontype": "char",
                    }
                }
            }
        })
        if (result) {
            console.log("Se creó correctamente la base de datos existencias");
        } else {
            console.log("Error al crear la base de datos existencias");
        }

    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
BasedeDatos();

















































