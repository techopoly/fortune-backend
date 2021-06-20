const getCurrentEnterCoinsModel = require('../model/getCurrentEnterCoins');


const getCurrentEnterCoins = (req, res, next) => {

    getCurrentEnterCoinsModel.fetchCurrentEnterCoins()
    .then((result)=>{
        res.status(200).json({
            currentEnterCoins: result
        })
    })
}


module.exports = getCurrentEnterCoins;
