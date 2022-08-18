const puppeteer = require('puppeteer');
var browser = undefined
var page = undefined

const GetQr = async (req,res) => {
    browser = await puppeteer.launch({})
    page = await browser.newPage()
    await page.goto('https://messages.google.com/web/authentication')
    await page.waitForSelector('body > mw-app > mw-bootstrap > div > main > mw-authentication-container > div > div > div > div > div > mw-qr-code > img')
    const qr = await page.$eval(('body > mw-app > mw-bootstrap > div > main > mw-authentication-container > div > div > div > div > div > mw-qr-code > img' ), img => img.src)
    res.status(201).send({res : qr})
}    

const VerificUrl = async(req,res) => {
    new Promise (async (resolve,rejects) => {
        await page.on('response', response => {
            if(page.url() != 'https://messages.google.com/web/authentication' ){
               resolve() 
            }
        })
    }).then(()=> {
        res.status(201).send({res : 'exitoso'}) 
    })      
} 

const SendSms = async(req, res) => {    
    const tel = await req.query.tel
    const sms = await req.query.sms    
    await page.$eval('body > mw-app > mw-bootstrap > div > main > mw-main-container > div > mw-main-nav > div > mw-fab-link > a', el => el.click())
    await page.waitForSelector('body > mw-app > mw-bootstrap > div > main > mw-main-container > div > mw-new-conversation-container > mw-new-conversation-sub-header > div > div.input-container > mw-contact-chips-input > div > mat-chip-listbox > span > input')
    await page.$eval('body > mw-app > mw-bootstrap > div > main > mw-main-container > div > mw-new-conversation-container > mw-new-conversation-sub-header > div > div.input-container > mw-contact-chips-input > div > mat-chip-listbox > span > input', (el, tel) =>{ el.value = tel }, tel)
    await page.keyboard.press('Space');
    await page.waitForSelector('body > mw-app > mw-bootstrap > div > main > mw-main-container > div > mw-new-conversation-container > div > mw-contact-selector-button > button')
    await page.$eval('body > mw-app > mw-bootstrap > div > main > mw-main-container > div > mw-new-conversation-container > div > mw-contact-selector-button > button',el => el.click() )
    await page.waitForSelector('body > mw-app > mw-bootstrap > div > main > mw-main-container > div > mw-conversation-container > div > div.container > div > mws-message-compose > div > div.input-box > div > mws-autosize-textarea > textarea')
    await page.$eval('body > mw-app > mw-bootstrap > div > main > mw-main-container > div > mw-conversation-container > div > div.container > div > mws-message-compose > div > div.input-box > div > mws-autosize-textarea > textarea', (el, sms) =>{ el.value = sms }, sms)
    await page.keyboard.press('Space');
    await page.$eval('body > mw-app > mw-bootstrap > div > main > mw-main-container > div > mw-conversation-container > div > div.container > div > mws-message-compose > div > mws-message-send-button > div > mw-message-send-button > button', el => el.click())
    res.status(201).send({res : 'exitoso'})
}
 
module.exports = {  
    GetQr,
    VerificUrl,   
    SendSms  
}   