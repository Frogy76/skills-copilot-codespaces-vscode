// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Get comments
app.get('/comments', function (req, res) {
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});

// Post comments
app.post('/comments', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
        name: req.body.name,
        comment: req.body.comment
    };
    console.log(response);
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data.push(response);
        fs.writeFile(__dirname + "/" + "comments.json", JSON.stringify(data), 'utf8', function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Data written to file");
            }
        });
    });
    res.end(JSON.stringify(response));
});

// Create server
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("App listening at http://%s:%s", host, port);
});