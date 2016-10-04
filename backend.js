var express = require('express')
	, http = require('http')
	, fs = require('fs')
	, app = express()
	, rightNow = function () {
		var d = new Date()
			, milliseconds = d.getMilliseconds();
		return d.toString().slice(0, 24) + ":" + milliseconds.toString();
	}
    , enableCORS = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        //do not allow PUT,  or DELETE
        res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, Content-Encoding, X-Requested-With');
        if ('OPTIONS' == req.method) {
            res.send(204);
        }
        else {
            next();
        }
    };

app.set('port', process.env.BACKEND_PORT || 61116);

app.configure(function () {
    app.use(express.compress());
    app.use(enableCORS);
    app.use(express.errorHandler());
    app.use(express.bodyParser());
}) ;

app.get('/test/:id'
	, function (req, res) {
		console.log(rightNow() + ' Received test req from %s: %s %s', req.ip, req.method, req.url);
		var answer = "It works for resource " + req.params.id;
		res.send(answer);
		console.log(rightNow() + ' Sent test res to %s: %s', req.ip, answer);
	});

app.post('/logon'
    , function (req, res) {
        var firstName = '';
        console.log(rightNow() + '%s %s', req.method, req.url);
        console.log('Username is ' + req.body.username + ' password is ' + req.body.password);
        switch (req.body.username) {
            case 'mgirou':
                if (req.body.password === 'dfw33fast') firstName = 'Mike';
                break;
            case 'demo':
                if (req.body.password === 'demo') firstName = 'anonymous user';
                break;
        }
        if (firstName != '') {
            console.log (rightNow() + 'Logon success for ' + req.body.username + ' password ' + req.body.password +
                ' first name ' + firstName);
            res.send(JSON.stringify({firstName : firstName}));
        } else {
            console.log(rightNow() + 'Logon failure for ' + req.body.username + ' password ' + req.body.password);
            res.send('');
        }
        console.log('exiting logon');

    });

app.get('/data/metadata'
	, function (req, res) {
		console.log(rightNow() + ' Received metadata req from %s: %s %s', req.ip, req.method, req.url);
		var answer = '{"version": "[1, 2]", ' 
			+ '"counties": "[ ["State": "TX", "County": "Dallas", '
	  		+ '"NECorner": "[33.00, -96.40]", '
	  		+ '"SWCorner": "[32.50, -97.10]", '
	 		+ '"Center":"[32.8028780,-96.8352640]", '
	  		+ '"gridSize": "50", '
	  		+ '"taxRate": "0.0271", '
			+ '"taxURL": "http://www.dallascad.org/AcctDetailCom.aspx?ID=", '
			+ '"timestamp": "2013060215110134"'
			+ '] ]", '
			+ '"manifests": "["program": "rtalite", "timestamp": "2013060215110134"]"};';
		res.send(answer);
		console.log(rightNow() + ' Sent metadata res to %s: %s', req.ip, answer);

	});

app.get('/data/texas/:county/parcel-grid/:area', function (req, res) {
    console.log(rightNow() + ' Received %s req encoded as %s from %s: %s %s', req.header('Accept'), req.header('Encoding'), req.ip, req.method, req.url);
    res.format ({
        'application/json': function () {

            var counties = {'collin-county': 'CollinCounty', 'dallas-county': 'DallasCounty', 'denton-county': 'DentonCounty',
            'tarrant-county': 'TarrantCounty'} ;
            var county = req.params.county;
            console.log('received ' + county);
            var fileSendName = process.env.BACKEND_PREFIX || "./data/TX/" + counties[county] + "/Parcels/" + req.params.area + ".json";
            console.log('filename is ' + fileSendName);
            fs.stat(fileSendName, function (err, stats) {
                if(!err) {
                    res.set ({
                        'Content-Type': 'application/json'
                       // , 'Content-Encoding': 'gzip'
                        //'Content-Length': bytes
                        //'Vary': 'Accept-Encoding'
                    });
                    res.sendfile(fileSendName);
                    console.log(rightNow() + ' Sent %d byte JSON res to %s: File %s', stats.size, req.ip, fileSendName);
                } else {
                    res.send(404);
                    console.log(rightNow() + ' Sent 404 response to %s for File %s', req.ip, fileSendName);

                }
            });
        }
        //if we get down here, without a match, Express automatically sends a "406, Not Acceptable" to the client.
    });
});

app.get('/boomerfocus'
    , function (req, res) {
        console.log(rightNow() + ' Received %s req encoded as %s from %s: %s %s', req.header('Accept'), req.header('Encoding'), req.ip, req.method, req.url);
        res.format ({
            'application/json': function () {
                var fileName = process.env.BACKEND_PREFIX || "./data/TX/DallasCounty/BoomerFocus/allHouses.json";
                fs.stat(fileName, function (err, stats) {
                    if(!err) {
                        res.set ({
                            'Content-Type': 'application/text',
                            'Content-Encoding': 'gzip'
                            //'Content-Length': bytes
                            //'Vary': 'Accept-Encoding'
                        });
                        res.sendfile(fileName);
                        console.log(rightNow() + ' Sent %d byte BoomerFocus JSON res to %s: File %s', stats.size, req.ip, fileName);
                    } else {
                        res.send(404);
                        console.log(rightNow() + ' Sent 404 response to %s for File %s', req.ip, fileName);

                    }
                });
            }
            //if we get down here, without a match, Express automatically sends a "406, Not Acceptable" to the client. we will remove the */* handler above.
        })
    });
app.get('/',
    function (req, res) {
        console.log(rightNow() + 'mystery request');
    })
console.log('about to open the port %d', app.get('port'));

http.createServer(app).listen(app.get('port')
	, function () {
		console.log(rightNow() + " server is now listening on port " + app.get('port'));
	});
