const express = require('express')
const https = require('https')
const path= require('path')
const fs = require('fs')
require('dotenv').config();

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json({limit:'1mb'}));
app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
/*app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');*/
app.set('view engine', 'pug');

var myArray = new Array();


const { auth , requiresAuth } = require('express-openid-connect');
const { stringify } = require('querystring');
const { Console } = require('console');
app.use(
  auth({
    authRequired:false,
    auth0Logout:true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL:process.env.BASE_URL, 
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,

  })
);

app.get('/',  function (req, res) {
  req.user = {
      isAuthenticated : req.oidc.isAuthenticated()
  };
  if (req.user.isAuthenticated) {
      req.user.name = req.oidc.user.name;
      storeUser(req.oidc.user);
      req.user.users = myArray;
      req.user.username = req.oidc.user.nickname;
      //console.log(req.oidc.user)
  }
  else{
  }
  res.render('index', {user : req.user});
});


app.post('/api', (request,response)=> {
 // console.log(request.oidc.user)
  //console.log("Resquest came" + request.body.lat);
  storeUser(request.oidc.user,request.body.lat,request.body.lon)

  response.send(myArray);
})



function storeUser(user,lat,lon){
  if (lat == undefined || user == undefined)return;
  var currentdate = new Date().toLocaleString();
  //console.log(user)
  var newUser = {"username":user.nickname, "dateTime":currentdate , "lat":lat , "lon":lon};

  var exists = false;
  for (const element of myArray) {
    if (element.username == newUser.username)exists=true;
  }
  if (!exists)myArray.push(newUser);

  console.log("My array");
  console.log(myArray);
  
}



const sslServer = https.createServer(
    {
    key: fs.readFileSync(path.join(__dirname, 'cert' ,'key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'cert', 'cert.pem')),
},
app);
sslServer.listen(3000, ()=> console.log('Secure server on port 3000'))


//app.listen(3000, ()=> {console.log('Secure server on port 3000')});