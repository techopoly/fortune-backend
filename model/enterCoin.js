var Push = require('pushover-notifications');
const axios = require('axios');

const getDb = require('../util/database').getDb;
const exitEnter = require('./exitEnter');
let intRef = [];
let currentPrice = 0;

const getCurrentPrice = () => {
    return currentPrice
}

const removeInterval = (num) => {
    console.log(`interval reference index: ${num} `, intRef[num])
    clearInterval(intRef[num])
}

class Coin {
    constructor(symbol, threshold) {
        this.symbol = symbol;
        this.threshold = threshold;
        this.time = new Date();
        this.processRunning = false;
        this.startPrice;
        this.interval_1;
        this.intIndex;
    }

    save = () => {
        const db = getDb();
        return axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${this.symbol.toUpperCase()}USDT`)
            .then((response) => {
                this.startPrice = response.data.price;
                return db.collection('enterCoins').insertOne(this)
                    .then(result => {
                        //console.log(result)
                        console.log(this);
                        return result;
                    })
                    .then(() => {
                        return this.insertCurrentCoin(this._id);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log('COULD NOT SAVE START PRICE');
            })
    }

    insertCurrentCoin = (_id) => {
        const db = getDb();

        return db.collection('currentEnterCoins').insertOne({ coin_id: _id })
            .then(result => {
                console.log(_id, ' INSERTED IN CURRENT ENTER COIN');
                return result;
            })
            .catch(err => {
                console.log('ERROR IN INSERTING currentEnterCoins', err)
            }
            )
    }

    startPorcess = () => {

        // pra: uz2deb865aq3fjsdhamsq4ys6ihang
        // pra2: ua1s43mfjm7hkco5vim6u58dh9jajs
        // ishmam: uhgpth8xaedb8i12xmmf54a3gar79r
        // ishmam_desk: uhgpth8xaedb8i12xmmf54a3gar79r
        //ishmam_2: ucvsdabqdqhf89w3y9r1y8vcnsgwx5

        var p1 = new Push({
            user: 'ucvsdabqdqhf89w3y9r1y8vcnsgwx5',
            token: 'as277w258d5osnxptbib3vq489zhv7'
        })

        var p2 = new Push ({
            user: 'ua1s43mfjm7hkco5vim6u58dh9jajs',
            token: 'as277w258d5osnxptbib3vq489zhv7'
        })

        var msg = {
            message: 'Opportunity',	// required
            title: "",
            priority: 2,
            retry: 30,
            expire: 3600
        }

        //---------------------------minima--------------------------//



        let currentPrice = 0;
        let minima = 10000000;
        let threshold = this.threshold;
        let symbol = this.symbol;


        const fetchPrice = () => {
            axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}USDT`)
                .then((response) => {
                    currentPrice = response.data.price;
                    if (currentPrice > threshold * minima) {
                        console.log("Opportunity");
                        p1.send(msg, function (err, result) {
                            try {
                                if (err) {
                                    throw err
                                }
                                console.log(result)
                            } catch (err) {
                                console.log(err)
                            }
                        });
                        p2.send(msg, function (err, result) {
                            try {
                                if (err) {
                                    throw err
                                }
                                console.log(result)
                            } catch (err) {
                                console.log(err)
                            }

                        });
                        removeInterval(this.intIndex);
                        exitEnter.deleteCurrentCoin(this._id);
                    }
                    if (currentPrice < minima) {
                        minima = currentPrice
                        console.log("Minima: " + minima);
                    }
                    console.log(this.symbol, "_currentPrice: " + currentPrice);
                })
                .catch(
                    (err) => {
                        console.log(err)
                    }
                )
        }


        let lenght = intRef.length;  // stores the lenght at the moment when this function was first executed
        this.intIndex = lenght;
        console.log(this.intIndex);
        intRef[this.intIndex] = setInterval(fetchPrice, 1000);
    }

}


module.exports.Coin = Coin;
module.exports.removeInterval = removeInterval;
module.exports.getCurrentPrice = getCurrentPrice;