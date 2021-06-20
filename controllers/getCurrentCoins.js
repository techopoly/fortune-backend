const getCurrentCoinsModel = require('../model/getCurrentCoins');


const getCurrentCoins = (req, res, next) => {

    getCurrentCoinsModel.fetchCurrentCoins()
    .then((result)=>{
        res.status(200).json({
            currentCoins: result
        })
    })
}


module.exports = getCurrentCoins;
