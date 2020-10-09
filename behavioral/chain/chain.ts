class UpperChain{
    toUpper(char: string){
        return `not uppered ${char}`
    }
}

class A extends UpperChain{
    private next: InstanceType<typeof UpperChain>
    constructor(){
        super();
        this.next = new UpperChain
    }
    set setNext (chain: InstanceType<typeof UpperChain>){this.next = chain}
    toUpper(char: string) {
        if (char === 'a') return 'A';
        return this.next.toUpper(char);
    }
}

class B extends UpperChain{
    private next: InstanceType<typeof UpperChain>
    constructor(){
        super();
        this.next = new UpperChain
    }
    set setNext (chain: InstanceType<typeof UpperChain>){this.next = chain}
    toUpper(char: string) {
        if (char === 'b') return 'B';
        return this.next.toUpper(char);
    }
}

class C extends UpperChain{
    private next: InstanceType<typeof UpperChain>
    constructor(){
        super();
        this.next = new UpperChain  
    }
    set setNext (chain: InstanceType<typeof UpperChain>){this.next = chain}
    toUpper(char: string) {
        if (char === 'c') return 'C';
        return this.next.toUpper(char);
    }
}

const aUpper = new A();
const bUpper = new B();
const cUpper = new C();
aUpper.setNext = bUpper
bUpper.setNext = cUpper

console.log(aUpper.toUpper('a')) // A
console.log(aUpper.toUpper('b')) // B
console.log(aUpper.toUpper('c')) // C
console.log(aUpper.toUpper('d')) // not upperd d
