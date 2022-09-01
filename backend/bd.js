const {google} = require('googleapis')


const CreateBd = async (req,res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile : 'keys.json',
        scopes: "https://www.googleapis.com/auth/spreadsheets", 
    })

    const authClientObject = await auth.getClient();
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    const spreadsheetId = "1fpMImegNZMhR2Nc2IJnXNeX2VzLB9xxUu0-4p6qV6_w";   
    const resource = {
        properties: {
          title : 'hola',
        },
    };
 // const newsheet =   await googleSheetsInstance.spreadsheets.create({
   //     resource,
   //     fields: 'spreadsheetId',
// })
 //   await googleSheetsInstance.spreadsheets.values.append({
   //     auth,
   //     spreadsheetId,
   //     range: "Contactos!A:B",
    //    valueInputOption: "USER_ENTERED",
    //    resource : {
    //        values : [['nombre', 'telefono']]
    //    }
   // })
   
   const newss = await googleSheetsInstance.spreadsheets.developerMetadata.search().data
    console.log(newss)
    res.status(201).send({'res' : 'ok'})
}

module.exports = {
    CreateBd 
}   