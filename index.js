const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const querystring = require('querystring');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('hello word')
})

app.post('/smd', (req, res) => {
    // console.log(req.body.phone)
    let code = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
    var queryData = querystring.stringify({
        mobile: req.body.phone,  // 接受短信的用户手机号码
        tpl_id: req.body.tpl_id,  // 您申请的短信模板ID，根据实际情况修改
        tpl_value: `#code#=${code}`,  // 您设置的模板变量，根据实际情况修改
        key: req.body.key,  // 应用APPKEY(应用详细页查询)
    });
    
    var queryUrl = 'http://v.juhe.cn/sms/send?'+queryData;
    
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 打印接口返回内容
            
            var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
            console.log(jsonObj)
            res.json(jsonObj)
        } else {
            console.log('请求异常');
        }
    }) 
})
const port = process.env.PORT || 5002;

app.listen(port, ()=> {
    console.log(`Server is runing on port ${port}`)
})