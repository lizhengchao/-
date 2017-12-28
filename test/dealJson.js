/**
 * Created by lzc on 2017/12/18.
 */
var xlsx = require("node-xlsx");
var fs = require('fs');
var data = [
    {
        name: "table1",
        data: [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']]
    }
]

var data = [
    {
        "userid": "ChenYuan",
        "name": "陈苑",
        "department": [
            1
        ]
    },
    {
        "userid": "HouYuZhen",
        "name": "侯玉珍",
        "department": [
            2
        ]
    },
    {
        "userid": "lzc",
        "name": "伊泽瑞尔",
        "department": [
            5
        ]
    },
    {
        "userid": "syd",
        "name": "孙越东",
        "department": [
            1
        ]
    },
    {
        "userid": "xyp",
        "name": "徐远鹏",
        "department": [
            1
        ]
    },
    {
        "userid": "bqq",
        "name": "包千千",
        "department": [
            2
        ]
    },
    {
        "userid": "00005",
        "name": "jw",
        "department": [
            2
        ]
    },
    {
        "userid": "10000",
        "name": "胡超",
        "department": [
            2
        ]
    },
    {
        "userid": "00007",
        "name": "董小七",
        "department": [
            2
        ]
    },
    {
        "userid": "00009",
        "name": "田钟",
        "department": [
            2
        ]
    },
    {
        "userid": "00010",
        "name": "wh",
        "department": [
            2
        ]
    },
    {
        "userid": "00012",
        "name": "测试2",
        "department": [
            2
        ]
    },
    {
        "userid": "00013",
        "name": "测试3",
        "department": [
            2
        ]
    },
    {
        "userid": "00014",
        "name": "测试4",
        "department": [
            2
        ]
    },
    {
        "userid": "00015",
        "name": "测试5",
        "department": [
            2
        ]
    },
    {
        "userid": "0002",
        "name": "李玉婷",
        "department": [
            5
        ]
    }
];
var result = [];
for(var item of data) {
    result.ppush
}
var buffer = xlsx.build(data);
fs.writeFile('resut.xlsx', buffer, function(err) {
    if (err) throw err;
    console.log('has finished');
});