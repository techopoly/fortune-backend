
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

const objA = new Obj();
const objB = new Obj()
objA.startInterval(5);
objB.startInterval(10);

// console.log(Obj.manVarA(5));
// console.log(Obj.manVarA(10));


