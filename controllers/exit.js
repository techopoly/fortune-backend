const exitModel = require('../model/exitModel').exit;



const exit = (req, res, next) => {
    const _id = req.query._id;
    exitModel(_id)
    .then(result =>{
        console.log("result: ", result)
        res.status(200).json({
            message: "exit successfull",
            coin: result.coin,
            netProfit : result.netProfit,
            currentPrice : result.currentPrice
    
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports = exit;
