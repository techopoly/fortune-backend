const enterCoinModel = require('../model/enterCoin');


const enterCoin = (req, res, next)=>{

    console.log("request body: " , req.body);
    const symbol = req.body.symbol;
    const threshold = req.body.threshold
    const coin = new enterCoinModel.Coin(symbol, threshold);
    coin.startPorcess();
    coin.save()
    .then(()=>{
        res.status(200).json({
            message: 'Enter coin created',
            coin: coin
        })
    })

}

module.exports = enterCoin;
