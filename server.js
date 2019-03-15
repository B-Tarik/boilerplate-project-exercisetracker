const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const errorHandler = require('./handlers/error');
const apiRoutes = require('./routes/api');


const app = express()



app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// routes
app.use('/api/exercise', apiRoutes);


// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

app.use(errorHandler);


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
