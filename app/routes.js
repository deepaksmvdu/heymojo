var Todo = require('./models/todo');
const request = require('request-promise');
function getTodos(res) {
    Todo.find(function (err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos); 
    });
};

function getEntity(res,val) {
    console.log(val)
    if (val==undefined){
        var options = {
            url: 'https://api.api.ai/v1/entities?v=20150910',
            headers: {
                'Authorization': 'Bearer e92c3c3ef1d54d108743dcaf35b1c291'
            },
            method:"GET"
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                res.json(info);
            }
        }
        request(options,callback)
    }
    else
    {
        var options = {
                url: 'https://api.api.ai/v1/entities/'+val.id+'?v=20150910',
                headers: {
                    'Authorization': 'Bearer e92c3c3ef1d54d108743dcaf35b1c291'
                },
                method:"GET"
            };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                res.json(info);
            }
        }
            request(options,callback)
    }


};


function addEntity(req,val) {
    var headers = {
            'Authorization': 'Bearer e92c3c3ef1d54d108743dcaf35b1c291',
            'Content-Type':     'application/json'
        }
    var options = {
            url: 'https://api.api.ai/v1/entities?v=20150910',
            method: 'POST',
            json: true, 
            body:val,
            headers: headers
        }
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info)
            res.json(info);
        }
    }
    request(options,callback)

};


module.exports = function (app) {

    app.get('/api/todos', function (req, res) {
        getEntity(res);
    });

    app.get('/api/todos/:id', function (req, res) {
        getEntity(res,req.params);
    });

    app.post('/api/todos/', function (req, res) {
        console.log(JSON.stringify(req.body))
        const options = {
            method: 'POST',
            json: true,
            uri: 'https://api.api.ai/v1/entities?v=20150910',
            body: req.body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer e92c3c3ef1d54d108743dcaf35b1c291'
            }
        }

        request(options).then(function (response){
            res.status(200).json(response);
        })
        .catch(function (err) {
            console.log(err)
            // console.log(err);
        })
    });

    app.delete('/api/todos/:todo_id', function (req, res) {
        console.log(req.body)
        const options = {
            method: 'DELETE',
            json: true,
            uri: 'https://api.api.ai/v1/entities/'+req.params.todo_id+'?v=20150910',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer e92c3c3ef1d54d108743dcaf35b1c291'
            }
        }

        request(options).then(function (response){
            res.status(200).json(response);
            console.log("SUCCCCCESSSSS")
        })
        .catch(function (err) {
            
            console.log(err);
        })

    });

    app.post('/api/todos/put', function (req, res) {

        var data = {}
        const options = {
            method: 'PUT',
            json: true,
            body: req.body,
            uri: 'https://api.api.ai/v1/entities?v=20150910',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer e92c3c3ef1d54d108743dcaf35b1c291'
            }
        }
    request(options).then(function (response){
        res.status(200).json(response);
       
    })
    .catch(function (err) {
        console.log(err)
    })

});


    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};
