const getCoinModel = require('../model/getCoinModel');


const getCoinController = (req, res, next) => {

    const _id = req.body._id
    const coin = getCoinModel.fetchSingleCoin(_id)
    .then(result=>{
        res.status(200).json({
            message: 'coin fetched successfully',
            coin : result
        })
    })

}


module.exports = getCoinController;
