const express = require('express');
var app = express();
app.use(express.json());

//Rickster's CORS/caching middleware handler
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Cache-control', 'no-store'); 
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

var allbooks = [
  { id: "1", title: "Reactions in REACT", author:"Ben Dover", 
    publisher: "Random House", isbn: "978-3-16-148410-0", avail: true},
  { id: "2", title: "Express-sions", author:"Frieda Livery", 
    publisher: "Chaotic House", isbn: "978-3-16-148410-2", avail: true},
  { id: "3", title: "RESTful Rest", author:"Al Gorithm",  
    publisher: "ACM Publishers", isbn: "978-3-16-143310-1", avail: true},
  { id: "4", title: "See Es Es", author:"Anna Log", 
    publisher: "O'Reilly", isbn: "987-6-54-148220-1", avail: false, 
    who: "Homer", due:"1/1/23" },
  { id: "5", title: "Scripting in Javascript", author:"Dee Gital", 
    publisher: "IEEE", isbn: "987-6-54-321123-1", avail: false, 
    who: "Marge", due: "1/2/23" },
  { id: "6", title: "HTML Heros",  author:"Jen Neric", 
    publisher: "self", isbn: "987-6-54-321123-2", avail: false, 
    who: "Lisa", due: "1/3/23" }
  ]

 //simplified, just so some links work 
 app.get('/books/:id', (req,res) => { res.json(allbooks[Number(req.params.id)-1]);});

//**********************************************************
// *** Previous EXPRESS stuff above, new PUG stuff below ***
//**********************************************************

// brute force way of returning html from express

const htmlstring = "<html><body><h1>What is it aboot?</h1><p>It's aboot time, eh?</p></body></html>";
app.get('/aboot', function(req,res) { res.send(htmlstring) });

// prereqs for pug

// npm install --save pug
const path = require('path')   // need path library
app.set('view engine', 'pug')  // Define your template engine
app.set('views', path.join(__dirname, 'views'))  // Define path to views

// now add your page paths & their template/views

app.get('/', (req,res) => { res.render('home') });

app.get('/aboutv1', (req,res) => res.render('aboutv1'));
app.get('/aboutv2', (req,res) => res.render('aboutv2'));
app.get('/aboutv3', (req,res) => res.render('aboutv3', {who:"Rickster", what:"sup?"} ));

app.get('/bacon', (req,res) => res.render('bacon', {text:getBaconWords()} ));

app.get('/allbooks', (req,res) => res.render('allbooks', {books:allbooks} ));
 
// **************************************************
// *** The following has nothing to do with PUG   ***
// *** It's just a (possibly) interesting example ***
// **************************************************

// npm install xmlhttprequest
const { XMLHttpRequest } = require("xmlhttprequest");

function getBaconWords()
{
  let hreq = new XMLHttpRequest();
  const URL = "https://baconipsum.com/api/?type=meat-and-filler";
  hreq.open("GET", URL, false);  //synchronous
  hreq.send(null);
  return JSON.parse(hreq.responseText)[0];
}

console.log("listening on port 3000");
app.listen(3000);