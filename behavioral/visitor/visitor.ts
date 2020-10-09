/**
 *  Visitor pattern
 */

interface ProductInterface{
    name: string
    price: number
    getPrice(): number
    getName(): string
    getDiscount(discounter: InstanceType<typeof Discounter>): void
    getPoint(point: InstanceType<typeof Point>): void
}

abstract class Product implements ProductInterface{
    constructor(readonly name: string, readonly price: number){}
    getPrice(){
        return this.price
    }
    getName(){
        return this.name
    }
    getDiscount(discounter: InstanceType<typeof Discounter>): void{
        return discounter.calculate(this)
    }
    getPoint(point: InstanceType<typeof Point>): void{
        return point.calculate(this)
    }
}

class Book extends Product{
    constructor(readonly name: string, readonly price: number){
        super(name, price)
    }
}

class Toy extends Product{
    constructor(readonly name: string, readonly price: number){
        super(name, price)
    }
}

class Candle extends Product{
    constructor(readonly name: string, readonly price: number){
        super(name, price)
    }
}

type ProductInstance = InstanceType<typeof Book | typeof Toy>

interface Benefit {
    calculate(item: Product): void
}

class Discounter implements Benefit {
    constructor(
        private ratio: number
    ){}
    calculate(item: ProductInstance): void {
        console.log(item.price * this.ratio / 100)
    }
}

class Point implements Benefit {
    constructor(
        private ratio: number
    ){}
    calculate(item: ProductInstance): void {
        console.log(item.price * this.ratio / 100)
    }
}

const bookPoint = new Point(0.2)
const toyPoint = new Point(0.1)
const bookDiscounter = new Discounter(5)
const toyDiscounter = new Discounter(10)

const book = new Book('designpattern', 30000)
const miniCar = new Toy('miniCar', 8000)

book.getDiscount(bookDiscounter)
book.getPoint(bookPoint)
miniCar.getDiscount(toyDiscounter)
miniCar.getPoint(toyPoint)