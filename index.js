const readline = require('readline');
const compra = require('./compra');
const detalle_compra = require('./detalle_compra');
const existencias = require('./existencias');
var coleccion;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function displayMenuColections() {
    console.log('1. Compra');
    console.log('2. Detalle Compra');
    console.log('3. Existencias');
  }
  
  function askOption() {

    displayMenuColections();
    rl.question('seleccione colección: ', (option2) => {
      
        switch (option2) {
            case '1':
              coleccion = compra;
              askOperation();
              break;
            case '2':
              coleccion = detalle_compra;
              askOperation();
              break;
            case '3':
              coleccion = existencias;
              askOperation();
              break;
            default:
                console.log('Colección invalida!');
                askOption();
                break;  
        }
    });

  }

  function askOperation(){
    displayMenu();
    rl.question('Seleccione una opción: ', (option) => {
        processOption(option);
        if (option !== '0') {
          console.log('\n');
          askOperation();
          fin=1;
        }
      });
  }
  
  function displayMenu() {
    console.log('1. InsertOne');
    console.log('2. InsertMany');
    console.log('3. FindOne');
    console.log('4. FindMany');
    console.log('5. UpdateMany');
    console.log('6. UpdateOne');
    console.log('7. DeleteMany');
    console.log('8. DeleteOne');
    console.log('9. RunPipelineQuery');
    console.log('10. CreateCollection');
    console.log('11. DropCollection');
    console.log('0. Exit');
  }

  function processOption(option) {
    switch (option) {
      case '1':
        coleccion.insertOne();
        break;
      case '2':
        rl.question('Ingrese numero de documentos a crear: ', (numElements) => {
            coleccion.insertMany(numElements);
          });
        break;
      case '3':
        rl.question('Ingrese id: ', (id_document) => {
          coleccion.findOne(parseInt(id_document,10));
        });
        break;
      case '4':
        coleccion.findMany();
        break;
      case '5':
        coleccion.updateMany();
        break;  
      case '6':
        rl.question('Ingrese el id del documento a eliminar: ', (documentId) => {
          coleccion.updateOne(parseInt(documentId,10));
        });
        break;   
      case '7':
        coleccion.deleteMany();
        break;
      case '8':
        rl.question('Ingrese el id del documento a eliminar: ', (documentId) => {
            coleccion.deleteOne(parseInt(documentId,10));
          });
        break; 
      case '9':
        coleccion.runPipelineQuery();
        break;    
      case '10':
        coleccion.crearColeccion();  
        break; 
      case '11':
        coleccion.dropCollection();
        break;   
      case '0':
        rl.close();
        break;
      default:
        console.log('Invalid option!');
        break;
    }
  }

  console.log('Bienvenido a la aplicación de consola, Crud con Mongodb!');
  askOption();