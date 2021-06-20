const Coin = require('../model/createCoin').Coin;


exports.createCoin = (req, res, next)=>{

    console.log("request body: " , req.body);
    const symbol = req.body.symbol;
    const threshold = req.body.threshold
    const poly = new Coin(symbol, threshold);
    poly.startPorcess();
    poly.save()
    .then((response)=>{
        console.log('current coin response: ',response)
        res.status(200).json({
            message: 'coin created',
            coin: poly,

        })
    })
}
