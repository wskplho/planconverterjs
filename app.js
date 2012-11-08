var express = require('express');
var app = express();

var routes = require('./routes');

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
//    app.use(addflash);
    app.use(express.limit('10mb'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});
app.configure('production', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index.get);
app.post('/upload', routes.upload.post);

app.listen(app.get('port'), function() {
    console.log('express listening on port ' + app.get('port'));
});
