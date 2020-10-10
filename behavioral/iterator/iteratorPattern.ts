class CustomIterator{
    constructor(
        private iterObj: Iterable<any>,
        private currentPosition = 0
    ){}
    next(){
        this.currentPosition += 1;
        return this.iterObj[this.currentPosition]
    }
    hasNext(){
        return this.currentPosition < this.length
    }
    first(){
        return this.iterObj[0]
    }
    get length(): number{
        length = Reflect.get(this.iterObj, 'length')
        if (length) return length
        return Object.keys(this.iterObj).length
    }
    *[Symbol.iterator](){
        yield this.first()
        yield this.next()
        yield this.next()
        yield this.next()
        yield this.next()
    }
}

const iter = new CustomIterator([1,2,3,4])
for (const ele of iter){
    console.log(ele);
    // 1
    // 2
    // 3
    // 4
    // undefined
}