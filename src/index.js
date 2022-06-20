const XLSX = require('xlsx');
const moment = require('moment');
const rute = 'src/pueba.xlsx';
const workbook = XLSX.readFile(rute, {cellDates: true, });
const workbookSheets = workbook.SheetNames;
const sheet = workbookSheets[0];
const dataSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);


/*Archivo destino*/
const fs = require('fs');
const targetFile = 'src/formatedFile.txt';

console.log(dataSheet);

for (const itemRow of dataSheet) {
    let content;
    let fileDate;
    let date;
    let momentDate;
    
    //date format
    fileDate = itemRow['Fecha'];
    date = String(fileDate.getDate()).padStart(2, '0') + '/' + String(fileDate.getMonth() + 1).padStart(2, '0') + '/' +  fileDate.getFullYear();
    
    //time format
    momentDate = moment(itemRow['Hora']);
    hour = momentDate.format("HH:mm:ss");

    content = '|'+ itemRow['Nombre'] + '|' + itemRow['Apellido'] + '|' + itemRow['Edad'] + '|' + date + '|' + hour ;
    fs.appendFile(targetFile, content, (err) => {
        if (err){
            console.log('error al escribir archivo: ', err);
        }
    });
}


