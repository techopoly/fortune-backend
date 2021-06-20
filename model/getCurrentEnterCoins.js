const mongodb = require('mongodb')

const getDb = require('../util/database').getDb;


const fetchCurrentEnterCoins = () => {
    const db = getDb();

    return db.collection('currentEnterCoins').find().toArray()
        .then((result) => {
            console.log('Fetched all currentEnterCoins: ', result);
            return result;
        })
        .catch((err) => {
            console.log('Error in fetching currentEnterCoins: ', err);
        })
}

module.exports = {

    fetchCurrentEnterCoins: fetchCurrentEnterCoins
}