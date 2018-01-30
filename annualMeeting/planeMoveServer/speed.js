var express = require('express');
var app = express();

const defalutSpedd = 300;
var speed = defalutSpedd;
app.get('/getSpeed', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.send(speed + '')
})

app.get('/setSpeed', function(req, res) {
    var newSpeed = req.query.speed;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    if(isInteger(newSpeed) && newSpeed != '') {
        speed = newSpeed;
        res.send('0');
    } else {
        res.send('1');
    }
})

app.use('/static', express.static('static'));

function isInteger(x) {
    return x % 1 === 0;
}

app.listen(3001);

