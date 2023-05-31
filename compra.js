const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');
const config = require('./config');
// Obtener la URI de conexión a MongoDB desde el archivo de configuración
const uri = config.URI_MONGO;

// Variable para almacenar la cantidad de documentos creados
var documentCreated= 0;

// Nombre de la base de datos
const dbName = 'soft_Imperio';

// Función para crear la colección "compra"
async function crearColeccion() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db(dbName);
    const colecciones = await database.listCollections({ name: 'compra' }).toArray();

    if (colecciones.length === 0) {
      // Si la colección no existe, se crea con un esquema de validación
      await database.createCollection('compra', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            title: 'SchemaCompra',
            required: ['_id_compra', 'fechaCompra', 'totalCompra'],
            properties: {
              _id_compra: {
                bsonType: 'number',
              },
              fechaCompra: {
                bsonType: 'date',
              },
              totalCompra: {
                bsonType: 'number',
              },
            },
          },
        },
      });
      console.log('La colección "compra" se creó exitosamente.');
    
    } else {
      console.log('La colección "compra" ya existe.');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

//función para insertar un solo documento en la colección
async function insertOne() {
  console.log("insertone");
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const db = cliente.db(dbName);
        const collection = db.collection('compra');

        // Generar un documento falso utilizando Faker
        const documento = {
               _id_compra: faker.number.int({ min: 0, max: 999999999 }),
                fechaCompra: faker.date.anytime(),
                totalCompra: faker.number.float({ min: 0, max: 999999999 }),
        };

        // Insertar el documento en la colección
        const result = await collection.insertOne(documento);
        console.log(`Un documento fué insertado con _id: ${result.insertedId} en la colección Compra`);


    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}

//insertOne();

// Función para insertar multiples documentos en una coleccion
async function insertMany(numElements) {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const db = cliente.db(dbName);
        const collection = db.collection('compra');
    
        // Generar un nuevo documento falso utilizando Faker y agregarlo al array de documentos
        const documentos = [];
        for (let i = 0; i < numElements;i++){
           
            const nuevoDocumento = {
                _id_compra: faker.number.bigInt({ min: 0, max: 9999999999 }),
                fechaCompra: faker.date.past(),
                totalCompra: faker.number.bigInt({ min: 0, max: 9999999999 }),
               };
              documentos.push(nuevoDocumento);
        }
        // Opciones para la inserción de documentos
        const options = { ordered: true };
    
        // Insertar los documentos en la colección
        const result = await collection.insertMany(documentos, options);
        console.log('Documentos insertados:', result.insertedCount);
      } catch (error) {
        console.error('Error al insertar documentos:', error);
      } finally {
        await cliente.close();
    }
}
    
//insertMany();

// Función para actualizar un documento en la colección
async function updateOne(id_document) {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const db = cliente.db(dbName);
        const collection = db.collection('compra');

        // Filtro para identificar el documento a actualizar
        const filter = { _id: id_document };
      
        // Opciones de actualización
        const options = { upsert: true };

        //Datos de actualización
        const updateDoc = {
          $set: {
            fechaCompra: faker.date.anytime(),
            totalCompra: faker.number.float()
          },
        };

        // Actualizar el documento en la colección
        const result = await collection.updateOne(filter, updateDoc, options);
        console.log(
          `${result.matchedCount} documentos coincidieron con el filtro, actualizados ${result.modifiedCount} documentos`,
        );
    
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}

//updateOne();

// Función para actualizar varios documentos en la colección
async function updateMany() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const db = cliente.db(dbName);
        const collection = db.collection('compra');

        // Filtro para identificar los documentos a actualizar
        const filter = { _id_compra: faker.number.int };
        
        // Datos de actualización
        const updateDoc = {
          $set: {
            fechaCompra: faker.date.anytime(),
            totalCompra: faker.number.float()
          },
        };

        // Actualizar los documentos en la colección
        const result = await collection.updateMany(filter, updateDoc);
        console.log(`Actualizados ${result.modifiedCount} documentos`);
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
//updateMany();

// Función para buscar varios documentos en la colección
async function findMany() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const db = cliente.db(dbName);
        const collection = db.collection('compra');

        // Realizar la consulta para buscar documentos en la colección
        const cursor = await collection.find();

        // Verificar si no se encontraron documentos
        if ((await collection.countDocuments()) === 0) {
            console.log("No hay documentos encontrados!");
          }

          // Recorrer el cursor para mostrar los documentos encontrados
          for await (const doc of cursor) {
            console.dir(doc);
          }
    
    } finally {
        await cliente.close();
    }
}
//findMany()

// Función para buscar un documento en la colección
async function findOne(id_document) {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const db = cliente.db(dbName);
        const collection = db.collection('compra');
        
        // Consulta para buscar un documento por su _id_compra
        const query = { _id_compra: id_document};

        // Realizar la búsqueda y obtener el primer documento encontrado
        const compraFound = await collection.findOne(query);
        
        console.log("findOne "+compraFound);
    
    } finally {
        await cliente.close();
    }
}
//findOne()

// Función para eliminar un documento de la colección
async function deleteOne(id_document) {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const db = cliente.db(dbName);
        const collection = db.collection('compra');

        // Consulta para buscar el documento a eliminar por su _id_compra
        const query = { _id_compra: id_document };

        // Elimina el documento de la colección
        const result = await collection.deleteOne(query);

        // Verificar si se eliminó el documento exitosamente
        if (result.deletedCount === 1) {
          console.log("Un documento ha sido eliminado exitosamente.");
        } else {
          console.log("Ningún documento coincidió con la consulta. 0 documentos eliminados.");
        }
    } finally {
        await cliente.close();
    }
}
//deleteOne()

// Función para eliminar varios documentos de la colección
async function deleteMany() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const db = cliente.db(dbName);
        const collection = db.collection('compra');

        // Realizar la eliminación de todos los documentos en la colección
        const result = await collection.deleteMany();
        
        console.log("Se han eliminado " + result.deletedCount + " documentos");

    } finally {
        await cliente.close();
    }
}
//deleteMany()

// Función para ejecutar una consulta utilizando un pipeline
async function runPipelineQuery() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const db = cliente.db(dbName);
      const collection = db.collection('compra');
  
      // Etapas del pipeline
      const pipeline = [
        { $match: { _id_compra: 2001 } },
       // { $group: { /* Criterios de agrupación */ } },
        { $sort: { _id_compra:1 } }
      ];
  
      // Ejecutar la consulta utilizando el pipeline
      const result = await collection.aggregate(pipeline).toArray();
      console.log('Resultado de consulta:', result);
    } catch (error) {
      console.error('Error en la consulta:', error);
    } finally {
      await cliente.close();
    }
  }
  
  // Función para eliminar una colección
  async function dropCollection() {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db(dbName);

      // Eliminar la colección 'compra'
      await db.collection('compra').drop();
      console.log('Colección "compra" eliminada con éxito.');
    }catch(err) {
        console.log("Se presentó exception: " + err.message);
    }
     finally {
      await client.close();
    }
  }

  // Función para eliminar la base de datos
  async function dropDatabase() {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db(dbName);

      // Eliminar la base de datos 'soft_Imperio'
      await db.dropDatabase();
      console.log('Base de datos "soft_Imperio" eliminada con éxito.');
    } finally {
      await client.close();
    }
  }

  
async function performLookup() {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db('soft_Imperio');
      const resultado = await db.collection('compra').aggregate([
        {
          $lookup: {
            from: 'detalle_compra',
            localField: 'compraId',
            foreignField: 'compraId',
            as: 'detalles'
          }
        }
      ]).toArray();
  
      console.log(resultado);
    } finally {
      await client.close();
    }
  }

// Exportación de las funciones
module.exports = {
    deleteMany,
    deleteOne,
    findOne,
    findMany,
    updateMany,
    updateOne,
    insertMany,
    insertOne,
    runPipelineQuery,
    crearColeccion,
    dropCollection
  };
