//非同步讀取檔案套件
const fs = require('fs');
//處理文件路徑套件
const path = require('path');
const allControllers = {};

//設定預設文件路徑,module.filename將會回傳該文件夾中的預設文件index.js
const basename = path.basename(module.filename);

//依序讀取目錄中檔案，並且一一引入至同一物件中
fs.readdirSync(__dirname)
    .filter((file) =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach((file) => {
    	const fileName = file.replace('.js','');
        const controller = require('./'+fileName);
        allControllers[fileName] = controller;
    });

//判斷非同步是否完成，完成後放入物件中。
Object.keys(allControllers).forEach((controllerName) => {
    if (allControllers[controllerName].associate) {
        allControllers[controllerName].associate(allControllers);
    }
});

const users = require('./users');

module.exports = allControllers;