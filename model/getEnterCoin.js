const mongodb = require('mongodb')

const getDb = require('../util/database').getDb;


const fetchEnterCoin = (_id)=>{
    const db = getDb();
    return db.collection('enterCoins').find({_id: new mongodb.ObjectID(_id)}).next()
        .then(response => {
            console.log(response);
            if(response == null){
                console.log('no coin')
            }
            return response
        })
        .catch(err => {
            console.log(err)
        }) 
}

module.exports = {

    fetchEnterCoin: fetchEnterCoin
}