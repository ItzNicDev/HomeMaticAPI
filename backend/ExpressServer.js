const express = require('express');
const CryptoJS = require('crypto-js');
var cors = require('cors')
const app = express();
const port = 3000;

const apiKey = 'czTRJv4asd9pSUcWrO';

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const checkApiKey = (req, res, next) => {
    const providedApiKey = req.query.apiKey;

    let plainText = "HomeMaticApiKey2023";
    let encryptionKey = "f9afd0a";
    const encrypted = CryptoJS.AES.encrypt(plainText, encryptionKey);

    console.log(encrypted.toString())


    if (providedApiKey === apiKey) {
        next();
    } else {
        res.status(401).send('Invalid API key.');
    }
};


app.get('/get', cors(corsOptions), checkApiKey, (req, res) => {
    import('node-fetch')
        .then(({ default: fetch }) => {
            fetch('http://192.168.178.43/config/xmlapi/statelist.cgi')
                .then(response => response.text())
                .then(xmlData => {
                    res.set('Content-Type', 'application/xml');
                    res.send(xmlData);
                })
                .catch(error => {
                    console.log('Error:', error);
                    res.status(500).send('Error fetching data.');
                });
        })
        .catch(error => {
            console.log('Error:', error);
            res.status(500).send('Error loading the fetch module.');
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
