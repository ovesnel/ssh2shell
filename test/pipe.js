var dotenv = require('dotenv'),
    fs = require('fs')
dotenv.load()

var host = {
  server:             {     
    host:         process.env.HOST,
    port:         process.env.PORT,
    userName:     process.env.USER_NAME,
    password:     process.env.PASSWORD
  },
  commands:           [
    "`Test session text message: passed`",
    "msg:console test notification: passed",
    "ls -la"
  ],

}
//until npm published use the cloned dir path.
var SSH2Shell = require ('../lib/ssh2shell')

//run the commands in the shell session
var SSH = new SSH2Shell(host),
    callback = function( sessionText ){
          console.log ( "-----Callback session text:\n" + sessionText);
          console.log ( "-----Callback end" );
      },
    firstLog = fs.createWriteStream('first.log'),
    secondLog = fs.createWriteStream('second.log'),
    buffer = ""

//multiple pipes can be added but they wont be bound to the stream until the connection is established    
SSH.pipe(firstLog).pipe(secondLog);    

SSH.on('data', function(data){
    //do something with the data chunk
    console.log(data)
})

SSH.connect(callback)