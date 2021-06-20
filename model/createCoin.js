var Push = require('pushover-notifications');
const axios = require('axios');

const getDb = require('../util/database').getDb;
const exitModel = require('../model/exitModel');
let intRef = []
let currentPrice = 0;
let test = 'this is test';


const getCurrentPrice = () => {
    return currentPrice
}

const getTest = () => {
    return test;
}


const removeInterval = (num) => {
    console.log(`interval reference index: ${num} `, intRef[num]);
    clearInterval(intRef[num])
}

class Coin {
    constructor(symbol, threshold) {
        this.symbol = symbol;
        this.threshold = threshold;
        this.time = new Date();
        this.processRunning = false;
        this.startPrice;
        this.intIndex;
    }




    save = () => {
        const db = getDb();
        return axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${this.symbol.toUpperCase()}USDT`)
            .then((response) => {
                this.startPrice = response.data.price;
                return db.collection('coins').insertOne(this)
                    .then((result) => {
                        //console.log(result)
                        return this.insertCurrentCoin(this._id)
                            .then(response => {
                                //console.log(response);
                                return response; // this one is actually returned when you call save() in controller. not sure yet
                            })
                            .catch(err => {
                                console.log(err);
                            })
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

        return db.collection('currentCoins').insertOne({ coin_id: _id })
            .then(result => {
                console.log(_id, ' INSERTED IN CURRENT COIN');
                return result;
            })
            .catch(err => {
                console.log('ERROR IN insertCurrentCoin', err)
            }
            )
    }

    startPorcess = () => {

        // pra: uz2deb865aq3fjsdhamsq4ys6ihang
        // pra2: ua1s43mfjm7hkco5vim6u58dh9jajs
        // ishmam: uhgpth8xaedb8i12xmmf54a3gar79r
        // a: uz6sz8umnmwf2b4e65uy7k8m8yx7gj
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
            message: 'BHAG',	// required
            title: "",
            priority: 2,
            retry: 30,
            expire: 3600
        }

        // p.send(msg, function (err, result) {
        //     if (err) {
        //         throw err
        //     }
        //     console.log(result)
        // })



        let peak = 0;
        let threshold = this.threshold;
        let symbol = this.symbol;

        const fetchPrice = () => {
            return axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}USDT`)
                .then((response) => {
                    currentPrice = response.data.price;
                    if (currentPrice < threshold * peak) {
                        console.log("DANGER");
                        p1.send(msg, function (err, result) {
                            if (err) {
                                throw err
                            }
                            console.log(result)
                        });
                        p2.send(msg, function (err, result) {
                            if (err) {
                                throw err
                            }
                            console.log(result)
                        });

                        // clearInterval(this.interval_1);
                        removeInterval(this.intIndex);
                        exitModel.deleteCurrentCoin(this._id);

                    }
                    if (currentPrice > peak) {
                        peak = currentPrice
                        console.log("peak: " + peak);
                    }
                    console.log(this.symbol, "_currentPrice: " + currentPrice);
                    return response
                })
                .catch(
                    (err) => {
                        console.log('ERROR GETTING COIN PRICE');
                        console.log(err)
                        // console.log(err)
                    }
                )
        }

        let lenght = intRef.length;  // stores the lenght at the moment when this function was first executed
        this.intIndex = lenght;
        console.log(this.intIndex);
        intRef[this.intIndex] = setInterval(fetchPrice, 1000);
        this.processRunning = true;
    }
}


exports.Coin = Coin;
exports.removeInterval = removeInterval;
exports.getTest = getTest;
exports.getCurrentPrice = getCurrentPrice;

// module.exports = {
//     Coin : Coin,
//     getTest : getTest,
//     removeInterval : removeInterval,
//     getCurrentPrice : getCurrentPrice
// }

//THIS IS SO IMPORTANT TO UNDERSTAND.
//THE COMMENTED EXPORT DOES NOT WORK. DONT KNOW THE EXACT REASON WHY ITS NOT WORKING
//BUT I BELIEVE ITS BEACUSE OF THE COIN CONSTRUCTOR 
