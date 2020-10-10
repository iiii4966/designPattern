interface MessageInterface{
    id: number
    content: string
    createdAt: number
}

class Message implements MessageInterface{
    constructor(
        readonly id: number,
        public content: string,
        readonly createdAt: number
    ){}
}

class MessageModel{
    private readonly entity = Message
    private seqId = 0
    private msgs: InstanceType<typeof Message>[] = []
    create(content: string): InstanceType<typeof Message>{
        const message = new this.entity(this.seqId++, content, this.now)
        this.msgs.push(message)
        return message
    }
    delete(msgId: number){
        this.msgs = this.msgs.filter(msg => msg.id !== msgId)
    }
    get now(){
        return Date.now();
    }
}

class MessageView{
    public printedMessages: MessageInterface[] = []
    constructor(private controller: MessageController){}
    printMessage(){
        for (const msg of this.printedMessages){
            console.log(`${msg.id}, ${msg.content}, ${msg.createdAt}`);
        };
    }
    input(content){
        this.controller.create(content)
    }
    delete(msgId){
        this.controller.delete(msgId)
    }
}

class MessageController{
    private view = new MessageView(this)
    private readonly model = new MessageModel()
    constructor(){}

    create(content: string): void{
        this.view.printedMessages.push(this.model.create(content));
        this.view.printMessage();
    }
    delete(msgId: number): void{
        this.model.delete(msgId);
        this.view.printedMessages = this.view.printedMessages.filter(msg => msg.id !== msgId);
        this.view.printMessage();
    }
}

const controller = new MessageController;
const view = new MessageView(controller);

view.input('Hello world!')
view.input('Hello world!')
view.delete(1)
view.input('Hello world!')