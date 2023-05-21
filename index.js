const { faker } = require('@faker-js/faker');
 const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://edbravo:Sena1234@cluster0.ushwfet.mongodb.net/"

//Funcion para crear la base de datos con una collection
async function crearBasedeDatos() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const result = await cliente.db('soft_Imperio').createCollection("Roles", {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    title: "SchemaRoles",
                    required: [
                        "_id_Rol",
                        "nombreRol"
                    ],
                    properties: {
                        "_id_Rol": {
                            "bsonType": "int"
                        },
                        "nombreRol": {
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
//crearBasedeDatos();

//Funcion para insertar los roles
async function insertarRoles() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const result = await cliente.db('Soft_Imperio').collection('Roles').insertOne({
            _id_Rol: 02,
            nombreRol: "Colaborador"
        })

    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
//insertarRoles();

async function crearColeccion() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const result = await cliente.db('Soft_Imperio').createCollection("Usuarios", {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    title: "SchemaUsuarios",
                    required: [
                        "id_usuario",
                        "_id_Rol",
                        "nombre",
                        "documento",
                        "email",
                        "telefono",
                        "password",
                        "estado"
                    ],
                    properties: {
                        "id_usuario": {
                            "bsonType": "int"
                        },
                        "_id_Rol": {
                            "bsonType": "int"
                        },
                        "nombre": {
                            "bsonType": "string"
                        },
                        "documento": {
                            "bsonType": "int"
                        },
                        "email": {
                            "bsonType": "string"
                        },
                        "telefono": {
                            "bsonType": "int"
                        },
                        "foto": {
                            "bsonType": "string"
                        },
                        "password": {
                            "bsonType": "string"
                        },
                        "estado": {
                            "bsonType": "string"
                        }
                    }
                }
            }
        })
        if (result) {
            console.log("Se creo la collection correctamente");
        } else {
            console.log("Error al crear la collection");
        }
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
//crearColeccion();


// parte desde tabla compra
async function crearBasedeDatos(){
    const cliente = new MongoClient(uri);
    try{
        await cliente.connect();
        const result = await cliente.db('Soft_Imperio').createCollection("Compra", {
            validator: {
                bsonType: 'object',
                title: "SchemaCompra",
                required: [
                    "_id_Compra",
                    "fechaCompra",
                    "totalCompra"
                ],
                properties: {
                    "_id_Compra": {
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
//crearBasedeDatos();