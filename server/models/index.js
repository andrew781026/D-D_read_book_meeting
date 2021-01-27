//讀取檔案套件
const fs = require('fs');
//處理文件路徑套件
const path = require('path');
//資料庫連接套件
const Sequelize = require('sequelize');
//設定預設文件路徑,module.filename將會回傳該原始碼所在的文件夾
const basename = path.basename(module.filename);
//目前系統環境為開發中，若有設定環境變數，將可以讓程式自適應環境，切換所要連線的伺服器。
const env = /*process.env.NODE_ENV || */'development';
//設定檔載入
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

//初始化資料庫連線
let sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

//將資料夾內的.js檔案依序實例，並註冊在同一物件之中。
fs.readdirSync(__dirname)
    .filter((file) =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
 
db.sequelize = sequelize;
db.Sequelize = Sequelize;
 
module.exports = db;