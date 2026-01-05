const express = require('express');
const bodyParser = require('body-parser');
const CryptoJS = require('crypto-js');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = 'mysecretKey123';

app.get('/', (req, res) => {
    res.send("Backend is running");
});

app.post('/encrypt', (req, res) => {
    const { text } = req.body;

    const encryptedText = CryptoJS.AES.encrypt(
        text,
        SECRET_KEY
    ).toString();

    res.json({ encryptedText});
});

app.post('/decrypt', (req, res) => {
    const { encryptedText } = req.body;

    const bytes = CryptoJS.AES.decrypt(
        encryptedText,
        SECRET_KEY
    );

    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    res.json({ originalText});

});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});