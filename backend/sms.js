const puppeteer = require('puppeteer');
var browser = undefined
var page = undefined

const GetQr = async (req,res) => {
    browser = await puppeteer.launch({
        headless : false
    })
    page = await browser.newPage()
    await page.goto('https://messages.google.com/web/authentication')
    await page.waitForSelector('body > mw-app > mw-bootstrap > div > main > mw-authentication-container > div > div > div > div.qr-code-container.ng-tns-c104-0 > div.qr-code-wrapper.ng-tns-c104-0 > mw-qr-code > img')
    const qr = await page.$eval(('body > mw-app > mw-bootstrap > div > main > mw-authentication-container > div > div > div > div.qr-code-container.ng-tns-c104-0 > div.qr-code-wrapper.ng-tns-c104-0 > mw-qr-code > img' ), img => img.src)
    
    //  await qr.screenshot({path : 'qr.png'})
    //res.writeHead(200,{'content-type' : 'qr.png'})
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
    await page.$eval('body > mw-app > mw-bootstrap > div > main > mw-main-container > div > mw-main-nav > div > mw-fab-link > a', el => el.click())
    await page.waitForSelector('body > mw-app > mw-bootstrap > div > main > mw-main-container > div > mw-new-conversation-container > mw-new-conversation-sub-header > div > div.input-container > mw-contact-chips-input > div > mat-chip-listbox > span > input')
    await page.$eval('body > mw-app > mw-bootstrap > div > main > mw-main-container > div > mw-new-conversation-container > mw-new-conversation-sub-header > div > div.input-container > mw-contact-chips-input > div > mat-chip-listbox > span > input', el => el.value = '3045688647')
    await page.waitForSelector('body > mw-app > mw-bootstrap > div > main > mw-main-container > div > mw-new-conversation-container > div > mw-contact-selector-button > button')
    await page.$eval('body > mw-app > mw-bootstrap > div > main > mw-main-container > div > mw-new-conversation-container > div > mw-contact-selector-button > button',el => el.click() )
 
}

module.exports = {
    GetQr,
    VerificUrl,
    SendSms
} 