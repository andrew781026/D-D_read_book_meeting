const functions = require("firebase-functions");

const express = require("express");
const PORT = 3000;
const app = express();


var admin = require("firebase-admin");

var serviceAccount = require("./secret/fir-project-85d2e-firebase-adminsdk-gddm9-b450a5bc32.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-project-85d2e-default-rtdb.firebaseio.com"
});
const database = admin.database();


app.get('/', (req, res, next) => {
    res.send('Welcome to Firebase functions with Node Express!')
});


app.get('/process_update', function(req, res) {

    var data = {}
    data[String(new Date())] = {
        "first_name": req.query.first_name,
        "last_name": req.query.last_name
    };

    database.ref('/base_name').update(data);

    console.log("upload success");
    res.end("upload to Firebase success");
});


app.get('/data_get', function(req, res) {

    database.ref('/base_name').on('value', e => {
        res.end(JSON.stringify((e.val())))
    });
});

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
});


exports.app = functions.https.onRequest(app);