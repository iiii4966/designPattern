abstract class Factory {
    protected abstract create(creatorType: string, prop: object): InstanceType<any>
}

class Noting{}

enum toyType {
    CAR = "CAR",
    DUCK = "DUCK"
}

interface GenericToyProps {
    color: string
    price: number
    name?: string
}

type ToyInstance = InstanceType<typeof Duck | typeof Car | typeof Noting>

class ToyFactory extends Factory {
    create(creatorType: toyType, prop: GenericToyProps): ToyInstance{
        switch (creatorType) {
            case toyType.CAR: {
                return new Car(prop);
            }
            case toyType.DUCK: {
                return new Duck(prop)
            }
            default: {
                return new Noting();
            }
        }
    }
}

class Toy{
    protected color: string
    protected price: number
    protected name?: string
    protected constructor(
        prop: GenericToyProps
    ){
        this.color = prop.color
        this.price = prop.price
        this.name = prop.name
    }
}

class Duck extends Toy{
    constructor(prop: GenericToyProps){
        super(prop)
    }
}

class Car extends Toy{
    constructor(prop: GenericToyProps){
        super(prop)
    }
}

export const toryFactory = new ToyFactory()

toryFactory // ToyFactory {}
toryFactory.create(toyType.DUCK, {color: 'red', price: 1000, name: 'baby duck'}) // Duck { color: 'red', price: 1000, name: 'baby duck' }
toryFactory.create(toyType.CAR, {color: 'red', price: 1000}) // Car { color: 'red', price: 1000, name: undefined }