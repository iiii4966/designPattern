/**
 * 커맨드 패턴
 * 실행될 기능을 캡슐화함으로써 기능의 실행을 요구하는 호출자(Invoker) 
 * 클래스와 실제 기능을 실행하는 수신자(Receiver) 클래스 사이의 의존성을 제거한다.
 * 
 * 따라서 실행될 기능의 변경에도 호출자 클래스를 수정 없이 그대로 사용 할 수 있도록 해준다.
 */

 class Printer{ // receiver
     on(){return 'on'}
     off(){return 'off'} // original handler
 } // receiver

 abstract class Command{ // command
     constructor(protected readonly reciever){}
     abstract execute(): any
 }

 class OnCommand extends Command{
     constructor(readonly reciever){super(reciever)}
     execute (){ // encapsulation handler
         return this.reciever.on();
     }
 }

 class OffCommand extends Command{
     constructor(readonly reciever){super(reciever)}
     execute (){ // encapsulation handler
        // return this.reciever.off();
        return this.logExecute(); // easy modify without change original handler
     }
     logExecute(){
        const result = this.reciever.off();
        console.log(result);
        return result
     }
 }

 type Commands = InstanceType<typeof OnCommand> | InstanceType<typeof OffCommand>

 const press = (command: Commands) => {command.execute();} // invoker

 const printer = new Printer()
 const printerOnCommand = new OnCommand(printer)
 const printerOffCommand = new OffCommand(printer)

 press(printerOnCommand); // not stdout on
 press(printerOffCommand); // off



 