const express = require("express")
const cors = require("cors")
const app = express()
const path = require('path')
app.use(cors({
    origin : '*'
}))

app.use(express.static(path.join(__dirname, 'assets')))

const bd = require('./backend/bd')
const sms = require('./backend/sms')

app.get('/createbd', bd.CreateBd)
app.get('/getqr', sms.GetQr)
app.get('/listenurl', sms.VerificUrl)
app.get('/sendsms', sms.SendSms)
const PORT = 3000; 

//start server 
const server = app.listen(PORT, () =>{
    console.log(`Server started on port localhost:${PORT}`); 
});   