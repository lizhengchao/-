var xlsx = require("node-xlsx");
var fs = require('fs');
var http = require('http');
var querystring = require('querystring');

var option = {
    hostname:'192.168.6.205',
    port:8096,
    path:'/EnterpriseInfoService/towechat/cgi-bin/user/update',
    method:'POST',
    headers:{
        //'Content-Type':'application/x-www-form-urlencoded',
        'Content-Type':'application/jspn; charset=UTF-8'
    }
};

var data = xlsx.parse('./userData.xls');
var sheet1 = data[0];
var sheet1Data = sheet1.data;


for(var data of sheet1Data) {
    var item = {};
    item.esn = '';
    item.nccode = data[2];
    item.mobile = data[3];
    item.weixinid = data[1];
    item.name = data[0];

    var req = http.request(option, function(resp){

    })

    req.on('error',function(err){
        console.error(err);
    });
    req.write(querystring.stringify(item));
    req.end();

}


