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

function checkVal(s){
    for(let i=0; i<s.length; i++){
        const n = parseInt(s[i]);
        if(Number.isNaN(n)){
            return false;
        }
    }
    return true;
}

app.get("/api", function(req, res) {
  const date = new Date();
  const dateOutput = date.toUTCString();
  res.json(
    {
      unix: date.getTime(),
      "utc": dateOutput
    }
  );
})

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const {date: dateString} = req.params;
  let timeStamp = checkVal(dateString) ? parseInt(dateString) : Date.parse(dateString);
  if(Number.isNaN(timeStamp)){
    res.json({
      "error" : "Invalid Date"
    })
    return;
  }
  const date = new Date(timeStamp);
  const dateOutput = date.toUTCString();
  res.json(
    {
      unix: date.getTime(),
      "utc": dateOutput
    }
  );
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
