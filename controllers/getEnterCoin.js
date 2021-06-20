const getEnterCoinModel = require('../model/getEnterCoin');


const getEnterCoin = (req, res, next) => {
    const _id = req.body._id
    getEnterCoinModel.fetchEnterCoin(_id)
    .then(result=>{
        res.status(200).json({
            message: 'coin fetched successfully',
            coin : result
        })
    })
}


module.exports = getEnterCoin;
