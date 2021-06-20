const express = require('express');
var Push = require('pushover-notifications');
const axios = require('axios');
const bodyParser = require('body-parser');

const testRoute = require('./routes/test_api');
const mongoConnect = require('./util/database').mongoConnect;
const Coin = require('./model/createCoin');
const createCoin = require('./routes/createCoin')
const exit = require('./routes/exit');
const coin = require('./routes/coin');
const deleteCoin = require('./util/deleteCoin');
const { response } = require('express');

console.log('app is running Alhamdulillah');
const app = express();
app.use(bodyParser.urlencoded({ extended: true })); //used for x-www-url-encoded <form>
app.use(express.json()) //used for application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})



app.use(testRoute);
app.use(createCoin);
app.use(exit);
app.use(coin);
app.use('/', (req, res, next)=>{
    res.status(200).json({
        message: 'path not found'
    })
} )




mongoConnect(() => {
    app.listen(process.env.PORT || 8080);
    // deleteCoin.deleteAllCoins()
    // deleteCoin.deleteAllEnterCoins();
    // deleteCoin.deleteAllCurrentCoins();
    //  deleteCoin.deleteAllCurrentEnterCoins();
});


