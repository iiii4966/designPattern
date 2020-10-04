/** 
  example 1
*/

let instance = null;

class Printer {
    page: string
    constructor (page) {
        this.page = page
    }
    get () {
        this.page
    }
    set() {
        this.page
    }
    display(){
        return console.log(
            `You are connected to the printer. You want to print ${this.page} pages.`
        )
    }
    static getInstance(page) {
        if (!instance){
            instance = new Printer(page)
        }
        return instance
    }
}

/** 
  example 2
*/

class Printer {
    page: string
    constructor (page) {
        this.page = page
    }
    get () {
        this.page
    }
    set() {
        this.page
    }
    display(){
        return console.log(
            `You are connected to the printer. You want to print ${this.page} pages.`
        )
    }
}

export const printer = (page: string): InstanceType<typeof Printer> => {
    let instance = null;
    if (!instance) return new Printer(page)
    return instance
}