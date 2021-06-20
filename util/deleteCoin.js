const getDb = require('./database').getDb;


const deleteAllCoins = () => {
    const db = getDb();
    //console.log(db)
    return db.collection('coins').deleteMany()
    .then((result)=>{
        console.log('Deleted all coins in coins collection')
    })
    .catch(err=>{
        console.log(err)
    })
}


const deleteAllEnterCoins = () => {
    const db = getDb();
    //console.log(db)
    return db.collection('enterCoins').deleteMany()
    .then((result)=>{
        console.log('Deleted all coins in enterCoins collection')
    })
    .catch(err=>{
        console.log(err)
    })
}

const deleteAllCurrentCoins = () => {
    const db = getDb();
    //console.log(db)
    return db.collection('CurrentCoins').deleteMany()
    .then((result)=>{
        console.log('Deleted all coins in CurrentCoins collection')
    })
    .catch(err=>{
        console.log(err)
    })
}

const deleteAllCurrentEnterCoins = () => {
    const db = getDb();
    //console.log(db)
    return db.collection('currentEnterCoins').deleteMany()
    .then((result)=>{
        console.log('Deleted all coins in CurrentEnterCoins collection')
    })
    .catch(err=>{
        console.log(err)
    })
}




exports.deleteAllCoins = deleteAllCoins;
exports.deleteAllEnterCoins = deleteAllEnterCoins;
exports.deleteAllCurrentCoins = deleteAllCurrentCoins;
exports.deleteAllCurrentEnterCoins = deleteAllCurrentEnterCoins;