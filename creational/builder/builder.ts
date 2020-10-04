interface Menu {
    burger: string,
    side?: string,
    soda?: string
}

class Order{
    burger: string
    side?: string
    soda?: string
    constructor(
        menu: Menu
    ){
        this.burger = menu.burger
        this.side = menu.side
        this.soda = menu.soda
    }
}

class Chef{
    static makeBurger(pattie: string){
        return `${pattie}Burger`
    }
    static makeSoda(soda: string){
        return `${soda}Soda`
    }
    static makeSide(side: string){
        return `${side}Side`
    }
}

class BurgerBuilder{
    private orderedMeal: InstanceType<typeof Order>
    constructor(menu: Menu){
        this.orderedMeal = this.order(menu)
    }
    private order(menu: Menu): InstanceType<typeof Order>{
        return new Order(menu);
    }
    cookBurger(){
        return Chef.makeBurger(this.orderedMeal.burger)
    }
    makeSoda(){
        return Chef.makeSoda(this.orderedMeal.soda)
    }
    cookSide(){
        return Chef.makeSide(this.orderedMeal.side)
    }
}

class SetBurger{
    readonly burger: string
    readonly soda: string
    readonly side: string
    constructor(builder: InstanceType<typeof BurgerBuilder>){
        this.burger = builder.cookBurger()
        this.soda = builder.makeSoda()
        this.side = builder.cookSide()
    }
}

class SingleBurger{
    readonly burger: string
    readonly soda: string
    readonly side: string
    constructor(builder: InstanceType<typeof BurgerBuilder>){
        this.burger = builder.cookBurger()
    }
}

const chickenBurgerSet = new SetBurger(
    new BurgerBuilder({
        burger: "chicken",
        soda: "coke",
        side: "curly fries"
    })
)

const chickenBurger = new SetBurger(
    new BurgerBuilder({
        burger: "chicken",
    })
)

