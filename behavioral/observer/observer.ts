class Observer{
    private readonly subscribers: InstanceType<typeof Subscriber>[] = []
    constructor(){}
    update(color: string){
        this.subscribers.forEach(subscriber => {
            subscriber.color = color
        })
    }
    setSubscriber(subscriber: InstanceType<typeof Subscriber>){
        this.subscribers.push(subscriber)
    }
    removeSubscriber(subscriber: InstanceType<typeof Subscriber>){
        delete this.subscribers[this.subscribers.indexOf(subscriber)]
    }
}

class Subscriber{
    observer?: InstanceType<typeof Observer>
    constructor(public color: string){}
    subscribe(observer: InstanceType<typeof Observer>){
        this.observer = observer
        observer.setSubscriber(this)
    }
    unSubscribe(){
        this.observer = undefined;
        observer.removeSubscriber(this);
    }
}

const red = new Subscriber('red');
const blue = new Subscriber('blue');
const observer = new Observer;

red.subscribe(observer); // subscribe
observer.update('green'); // notify

console.log(red.color); // green
console.log(blue.color); // not changed

red.unSubscribe();
blue.subscribe(observer); // subscribe
observer.update('red'); // notify

console.log(red.color); // green; not changed
console.log(blue.color); // red