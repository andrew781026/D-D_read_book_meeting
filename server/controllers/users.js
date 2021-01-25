//載入相對應的model
const Users = require('../models/index').users;

module.exports = {
    //列表項
    list(req, res) {
        return Users
            .findAll({
                attributes : ['id','name','email','password','create_at','updata_at'],
                order: [
                    ['id', 'DESC']
                ],
            })
            .then((users) => res.status(200).send(users))
            .catch((error) => res.status(400).send(error));
    }
};