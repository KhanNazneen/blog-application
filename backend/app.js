const express = require('express')
const appConfig = require('./config/appConfig')
const fs = require('fs')
const cors= require('cors')
const mongoose = require('mongoose')
const globalErrorMiddleware = require('./middlewares/appErrorHandler')


const app = express()
mongoose.set('useCreateIndex', true)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(globalErrorMiddleware.globalErrorHandler)

fs.readdirSync(__dirname+'/models').forEach(function (file) {
  if (file.indexOf('.js')) {
    require('./models' + '/' + file)
  }
})

fs.readdirSync(__dirname + '/routes').forEach(function (file) {
  if (file.indexOf('.js')) {
    let route = require('./routes' + '/' + file);
    route.setRouter(app);
  }
});

app.use((req, res, next) => {
  res.send("Hello")
})
app.use(globalErrorMiddleware.globalNotFoundHandler)


app.listen(appConfig.port, () => {
  console.log('Example app listening on port', appConfig.port);
  //creating the mongo db connection here
  let db = mongoose.connect(
    appConfig.db.uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  );

})

// const server = http.createServer(app)
// server.listen(appConfig.port)
// server.on('listening', onListening)

// function onListening() {
//   let db = mongoose.connect(
//     appConfig.db.uri,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false
//     }
//   );
// }

mongoose.connection.on('error', function (err) {
  console.log('database connection error');
  console.log(err)
});

mongoose.connection.on('open', function (err) {
  if (err) {
    console.log("database error");
    console.log(err);
  } else {
    console.log("database connection open success");
  }
});
