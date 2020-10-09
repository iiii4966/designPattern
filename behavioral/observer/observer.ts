interface SubjectProperty{
    name: string
    color: string
}

class Subject{
    private readonly subscribers: InstanceType<typeof Observer>[] = []
    constructor(private props: SubjectProperty){}
    change(key: string, value: string){
        Reflect.set(this.props, key, value)
        this.notify(this.props)
    }
    notify(props){
        this.subscribers.forEach(subscriber => {
            subscriber.update(this.props)
        })
    }
    subscribe(subscriber: InstanceType<typeof Observer>){
        this.subscribers.push(subscriber)
    }
    removeSubscriber(subscriber: InstanceType<typeof Observer>){
        delete this.subscribers[this.subscribers.indexOf(subscriber)]
    }
}

class Observer{
    subject?: InstanceType<typeof Subject>
    constructor(readonly name: string){}
    subscribe(subject: InstanceType<typeof Subject>){
        this.subject = subject
        subject.subscribe(this)
    }
    unSubscribe(){
        if (this.subject) {
            this.subject.removeSubscriber(this)
            this.subject = undefined;
        }
    }
    update(props: SubjectProperty){
        console.log(this.name)
        console.log(props)
    }
}

const observer1 = new Observer('1');
const observer2 = new Observer('2');
const car = new Subject({name: 'car', color: 'red'});

observer1.subscribe(car);
car.change('color', 'green'); // change, notify; stdout: 1 { name: 'car', color: 'green' }

observer1.unSubscribe();
observer2.subscribe(car);
car.change('color', 'blue'); // change, notify; 2 { name: 'car', color: 'blue' }