const functions = require("firebase-functions");

const express = require("express");
const PORT = 3000;
const app = express();

var randomId = require('random-id'); //建立隨機的會員ID
var admin = require("firebase-admin");
const docuRouter = require('./swagger');


var serviceAccount = require("./secret/fir-project-85d2e-firebase-adminsdk-gddm9-b450a5bc32.json");
const { event } = require("firebase-functions/lib/providers/analytics");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-project-85d2e-default-rtdb.firebaseio.com"
});
const database = admin.database();

function take(i, array) {
    /*用於回傳剃除指定位置之資料後的陣列*/
    var temp = [];
    var countdown = 0;
    var take_out = 0;

    for (countdown = array.length - i; countdown > 1; countdown--) { temp.push(array.pop()); }
    take_out = array.pop();
    for (countdown = temp.length; countdown > 0; countdown--) { array.push(temp.pop()); }
    return array;
}

app.get('/', (req, res, next) => {
    res.send('Welcome to Firebase functions with Node Express!')
});

app.use(docuRouter);

// 設定能被選擇的類別
app.get('/interests', (req, res, next) => {
    console.log("request command undefined");
    res.send("currently we suppose these command to do on 'interests':\n * add\n * quary \n * delete \n * recover")
});

// 設定能被選擇的類別
app.post('/interests/add', (req, res, next) => {
    new Promise(
        function(resolve) {
            database.ref('/interests').on('value', e => { resolve(e.val()) });
        }).then(function(final_data) {
        var interest_array = {};
        for (var i = 0; i < final_data.length; i++) {
            if (final_data[i].length !== 0 || final_data[i].length !== null) {
                interest_array[i] = final_data[i];
            }
        }

        interest_array[final_data.length] = req.query.name;
        database.ref('/interests').set(interest_array);
        res.send(String(req.query.name) + "add to list success")

    }).catch(function(error) {
        res.send(String(error))
        console.log(index + " request error");
    });

});

app.delete('/interests/delete', (req, res, next) => {
    new Promise(
        function(resolve) {
            database.ref('/interests').on('value', e => { resolve(e.val()) });
        }).then(function(final_data) {
        var temp = take(final_data.indexOf(req.query.name), final_data)

        var interest_array = {};
        for (var i = 0; i < temp.length; i++) {
            interest_array[i] = temp[i]
        }

        database.ref('/interests').set(interest_array);
        res.send(String(req.query.name) + " delete form list success")
        console.log(String(req.query.name) + " delete form list success")

    }).catch(function(error) {
        res.send(String(error))
        console.log(index + " request error");
    });

});

app.get('/interests/quary', (req, res, next) => {
    new Promise(
        function(resolve) {
            database.ref('/interests').on('value', e => { resolve(e.val()) });
        }).then(function(final_data) {

        res.json(final_data)

    }).catch(function(error) {
        res.send(String(error))
        console.log(index + " request error");
    });
});


app.put('/interests/recover', (req, res, next) => {

    var interest_array = {};
    var temp = ["商業經營", "投資理財", "藝術設計", "生活體驗", "社會文學", "心理勵志", "語言學習", "資訊科技", "考試衝刺", "組隊競賽"];
    for (var i = 0; i < temp.length; i++) {
        interest_array[i] = temp[i]
    }
    database.ref('/interests').set(interest_array);
    res.send("list recover success")

});

//成員設定
app.post('/menber/setup', function(req, res) {

    var data = {};
    var user_id = randomId(30, 'aA0');
    data[user_id] = {
        "email": req.query.email,
        "password": req.query.password,
        "interests": req.query.interests, //陣列形式
        "neckname": req.query.neckname,
        "occupation": req.query.occupation,
        "introduction": req.query.introduction
    };

    database.ref('/user_info').update(data);
    console.log(" user_id " + user_id + " upload success");
    res.send("upload to Firebase Database success!\nthe user_id is " + user_id);
});

app.get('/menber/quary', function(req, res) {

    new Promise(
        function(resolve) {
            database.ref('/user_info').on('value', e => {
                resolve(e.val()[req.query.user_id])
            });
        }).then(function(final_data) {

        if (Object.keys(final_data).legnth !== 0) {
            res.json(final_data)
        } else {
            res.send()
        }
        console.log("querry user id " + req.query.user_id + " success")

    }).catch(function(error) {
        res.send("the user you request is not hound")
        console.log(req.query.user_id + " request error");
    });;

});

//社團設定
app.post('/group_setup', function(req, res) {

    var data = {};
    var group_id = randomId(30, 'aA0');

    data[group_id] = {
        "type": req.query.type,
        "name": req.query.name,
        "location": req.query.location,
        "time": req.query.time,
        "frequency": req.query.frequency,
        "organizer": req.query.organizer,
        "co-organizer": req.query.co_organizer, //儲存共同創辦者的userid
        "picture": req.query.picture,
        "discription": req.query.discription,
        "menbers": [req.query.organizer].concat(req.query.co_organizer.replace(/[\[|\]]/g, "").split(',')), //儲存userid
        "flag": req.query.flag, //儲存標籤
        "expect_num": req.query.expect_num,
    };

    database.ref('/Group_info').update(data);

    console.log("group setup success");
    res.send("group setup success , the Group id is " + group_id);
});

app.get('/group_quary', function(req, res) {

    new Promise(
        function(resolve) {
            database.ref('/Group_info').on('value', e => {
                resolve(e.val()[req.query.group_id])
            });
        }).then(function(final_data) {
        if (Object.keys(final_data).legnth !== 0) {
            res.json(final_data)
        } else {
            res.send("the group you request is not hound")
        }
        console.log("querry group " + req.query.group_id + " success")

    }).catch(function(error) {
        res.send(String(error))
        console.log("querry group " + req.query.group_id + " request error");
    });;
});

//尚未解決
app.get('/group/add', function(req, res) {

    new Promise(
        function(resolve) {
            database.ref('/Group_info').on('value', e => {
                resolve(e.val())
            });
        }).then(function(final_data) {

        if (req.query.type === "menber") {
            var temp = e.val()[req.query.group_id].menbers;
            console.log(temp)
            database.ref('/Group_info/' + req.query.group_id).update(temp.concat([req.query.userid]));
        } else {
            if (req.query.type === "coorganizer") {
                var temp = e.val()[req.query.group_id]["co-organizer"];
                database.ref('/Group_info/' + req.query.group_id).update(temp.concat([req.query.userid]));
            }
        }

    }).catch(function(error) {
        res.send(String(error))
        console.log("querry group_add_user " + req.query.group_id + " request error");
    });;


});


app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
});


exports.app = functions.https.onRequest(app);