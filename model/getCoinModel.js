const mongodb = require('mongodb')

const getDb = require('../util/database').getDb;


fetchAllCoin = () => {

    const db = getDb();
    return db.collection('coins').find().toArray()
        .then(response => {
            console.log(response);
            return response
        })
        .catch(err => {
            console.log(err)
        })

}


fetchSingleCoin = (_id)=>{
    const db = getDb();
    return db.collection('coins').find({_id: new mongodb.ObjectID(_id)}).next()
        .then(response => {
            console.log(response);
            return response
        })
        .catch(err => {
            console.log(err)
        }) 
}

module.exports = {
    fetchAllCoin: fetchAllCoin,
    fetchSingleCoin: fetchSingleCoin
}