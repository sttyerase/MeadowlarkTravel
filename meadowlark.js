const express = require('express');
var app = express();
var path = require('path');
app.disable('x-powered-by');  // DISABLE RESPONSE HEADER INFO
app.set('port', process.env.PORT || 8181);
app.set('views', path.join(__dirname,'views/layouts'));
app.locals.title = 'MEADOWLARK Travel SERVICE';
app.locals.email = 'dbmi@techie.com';
// app.locals.strftime = require('strftime');
app.locals.poopie = 'POOPIE';
// INCLUDE LIBRARY MODULES HERE
var fortune = require('./lib/fortune.js');
var showpath = require('./lib/showpath.js');
var childproc = require('./lib/childprocess.js');
var childsync = require('./lib/childexecsync.js');
var util = require('util');
// FORM PROCESSING WITH BODY-PARSER
app.use(require('body-parser').urlencoded({ extended: true }));

// set up handlebars view engine
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// SPECIAL FUNCTIONS
app.use(function(req, res, next){
   res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
   next();
});

// ROUTES START HERE
app.get('/', function(req, res){
        res.render('home');
});

app.get('/about', function(req, res){
   res.render('about', { fortune: fortune.getFortune() } );
});

app.get('/about/me', function(req, res){
   res.render('aboutme' );
});

app.get('/headers', function(req,res){
   res.set('Content-Type','text/plain');
   var s = '';
   for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
   res.send(s);
});

app.get('/params', function(req,res){
   res.set('Content-Type','text/plain');
   var s = 'TOP NOTCH PARAMETER PARSING: \n';
   for(var name in req.params) s += name + ': ' + req.headers[name] + '\n';
   res.send(s);
});

app.get('/route', function(req,res){
   res.render('route', { showpath: showpath.getRoute(req)});
});

//NEWSLETTER FORM PROCESSING
app.get('/newsletter', function(req, res){
   // we will learn about CSRF later...for now, we just
   // provide a dummy value
   res.render('newsletter', { csrf: 'CSRF token goes here' });
});

app.get('/thank-you', function(req,res){
   res.render('thank-you')
});

app.post('/process', function(req, res){
   console.log('Form (from querystring): ' + req.query.form);
   console.log('CSRF token (from hidden form field): ' + req.body._csrf);
   console.log('Name (from visible form field): ' + req.body.name);
   console.log('Email (from visible form field): ' + req.body.email);
   res.redirect(303, '/thank-you');
});

// A TEST FUNCTION FOR OPERATING SYSTEM COMMANDS
app.get('/ls-l', function(req, res){
   var dir = req.query.dirname;
   var os_command = 'ls -l ' + dir; 
   res.set('Content-Type','text/html');
   var myText = '<html><body><p>The child process has been requested. Check the console.</p></body></html>';
   res.send(myText);
   console.log(os_command);
   childproc.execProc(os_command);
});

//A TEST FUNCTION FOR OPERATING SYSTEM COMMANDS
app.get('/lsout', function(req, res){
   var dir = req.query.dirname;
   var os_command = 'ls -l ' + dir; 
   res.set('Content-Type','text/plain');
   var myText = 'The child process has been requested.\n';
   console.log(os_command);
   var output = childsync.execProc(os_command);
   myText += 'RETURNED: \n' + output + '\n'
   myText += 'THE END';
   res.send(myText);
});

// custom 404 page
app.use(function(req, res){
        console.log("NOT FOUND: " + req.path)
        res.status(404);
        res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render('500');
});

// START LISTENING ON PORT
app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
