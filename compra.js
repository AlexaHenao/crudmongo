const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Alexa:_123@cluster0.it2vlnf.mongodb.net/"

async function crearColeccionCompra(){
    const cliente = new MongoClient(uri);
    try{
        await cliente.connect();
        const result = await cliente.db('soft_Imperio').createCollection("Compra", {
            validator: {
                bsonType: 'object',
                title: "SchemaCompra",
                required: [
                    "_id_compra",
                    "fechaCompra",
                    "totalCompra"
                    
                ],
                properties: {
                    "_id_compra": {
                        "bsonType": "int"
                    },
                    "fechaCompra": {
                        "bsonType": "date"
                    },
                    "totalCompra": {
                        "bsonType": "float"
                    }
                }
            }
        })
        if (result) {
            console.log("Se creó correctamente la base de datos compra");
        } else {
            console.log("Error al crear la base de datos compra");
        }

    } catch (e) {
        console.log(e);
    } finally { 
        await cliente.close();
    }
}
crearColeccionCompra();

async function insertOneCompra() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const db = cliente.db('soft_Imperio');
        const collection = db.collection('compra');

        // Generar un documento falso utilizando Faker
        const documento = {
        _id_compra: 2001,
        fechaCompra: faker.date.past(),
        totalCompra: faker.datatype.float({ min: 0, max: 10000 })
        };

        // Insertar el documento en la colección
        const result = await collection.insertOne(documento);
        console.log("Documento insertado correctamente en la colección compra.");

    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
  