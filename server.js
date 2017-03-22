var express = require('express')
var bodyparser = require('body-parser')
var cors = require('cors')
var app = express()

app.use(cors())
app.use(bodyparser.json())

app.get('/api/whoami', function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    var lang = req.headers['accept-language'].split(',');
    var start = req.headers['user-agent'].indexOf('(') + 1;
    var end = req.headers['user-agent'].indexOf(')');
    var soft = req.headers['user-agent'].slice(start, end).split(';');
    res.json({
        'ipaddress': ip,
        'language': lang[0],
        'software': soft[0] + ';' + soft[1]
    });
})

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening')
})