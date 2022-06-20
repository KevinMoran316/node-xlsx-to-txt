const XLSX = require('xlsx');
const rute = 'src/pueba.xlsx';
const workbook = XLSX.readFile(rute);
const workbookSheets = workbook.SheetNames;
const sheet = workbookSheets[0];
const dataSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

/*Archivo destino*/
const fs = require('fs');
const targetFile = 'src/formatedFile.txt';


for (const itemRow of dataSheet) {
    let content;
    content = '|'+ itemRow['Nombre'] + '|' + itemRow['Apellido'] + '|' + itemRow['Edad'] ;
    fs.appendFile(targetFile, content, (err) => {
        if (err){
            console.log('error al escribir archivo: ', err);
        }
    });
}


