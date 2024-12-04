// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  const { date } = req.params
  console.log(date)
  if (date == null){
    const utcDate = new Date()
    const unixDate = Date.now()
    res.json({unix: Number(unixDate), utc: utcDate.toUTCString()})
  } else if (date.includes('-') || date.includes('/') || date.includes(' ')){
    const utcDate = new Date(date)
    if (utcDate.toString() === 'Invalid Date'){
      res.json({error: 'Invalid Date'})
    } else {
      const unixDate = Date.parse(date)
      res.json({unix: Number(unixDate), utc: utcDate.toUTCString()});
    }
  } else {
    const unixDate = Number(date)
    const utcDate = new Date(unixDate)
    if (utcDate.toString() === 'Invalid Date'){
      res.json({error: 'Invalid Date'})
    } else {
      res.json({unix: unixDate, utc: utcDate.toUTCString()});
    }
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
