const mongodb = require('mongodb')

const getDb = require('../util/database').getDb;


const fetchCurrentCoins = () => {
    const db = getDb();

    return db.collection('currentCoins').find().toArray()
        .then((result) => {
            console.log('Fetched all currentCoins: ', result);
            return result;
        })
        .catch((err) => {
            console.log('Error in fetching currentCoins: ', err);
        })
}

module.exports = {

    fetchCurrentCoins: fetchCurrentCoins
}