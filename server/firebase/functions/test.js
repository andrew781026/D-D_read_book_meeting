var organizer = "Dl7EAom5PhDCVyqmwZoaCf7L5BsRv3";
var coorganizer = "[KivrjfbmN5BLIa6SfxdSzSMcIMT6wq,UnaJa7JvgjVfcjG5sjNhg8nY14jmbb]".replace(/[\[|\]]/g, "").split(',');
var randomId = require('random-id'); //建立隨機的會員ID

console.log([organizer].concat(coorganizer))

var user_id = randomId(30, 'aA0');
console.log(user_id)