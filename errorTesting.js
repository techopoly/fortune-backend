const axios = require('axios');
let intRef = [];
let varA = 1;

class Obj {

    constructor() {
        this.intNum;
    }

    static manVarA = (num) => {
        varA = varA + num;
        return varA;
    }

    startInterval = (sec) => {
        let i = 0;
        let lenght = intRef.length;  // stores the lenght at the moment when this function was first executed
        this.intNum = lenght;
        intRef[lenght] = setInterval(() => {
            i++;
            if (i == sec) {
                removeInterval(this.intNum)
            }
            console.log(i);

        }, 1000);
        console.log(intRef[this.intNum]);
    }

    
}

const removeInterval = (num) => {
    clearInterval(intRef[num])
}

// const objA = new Obj();
// const objB = new Obj()
// objA.startInterval(5);
// objB.startInterval(10);

// let value = 10;

// setInterval(() => {
//     value++;
//     console.log(value)
//     if(value>12){
//         value = 40;
//         console.log(value)
//     }
// }, 1000);

axios.get(`https://api.taapi.io/rsi?secret=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlY2hvcG9seTQ0NEBnbWFpbC5jb20iLCJpYXQiOjE2MjQ0ODQxODcsImV4cCI6NzkzMTY4NDE4N30.rbbboPhxSQnO1AcF3KqVIsXXX-P7sO-Q38rCZCeKvqQ&exchange=binance&symbol=ETH/USDT&interval=15m`)
.then(res=>{
    console.log(res.data)
}).catch(err=>{
    console.log(err)
})

// console.log(Obj.manVarA(5));
// console.log(Obj.manVarA(10));


