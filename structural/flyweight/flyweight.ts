class File{
    private readonly extensions = {
        '.py': 'python',
        '.go': 'golang'
    }
    constructor(public name: string){
        this.name = name
    }
    get extension():string {
        const splited = self.name.split('.')
        return splited[splited.length - 1]
    }
    get platform(): string{
        return this.extensions[this.extension]
    }
}

abstract class Formatter {
    protected abstract format(file: InstanceType<typeof File>): string
}

class PythonFormatter extends Formatter{
    constructor(){super()}
    format(file: InstanceType<typeof File>): string {return `formatted ${file.name}`}
}

class GoFormatter extends Formatter{
    constructor(){super()}
    format(file: InstanceType<typeof File>): string {return `formatted ${file.name}`}
}

type FileFormatterInstance = InstanceType<typeof PythonFormatter> | 
                             InstanceType<typeof GoFormatter>

class FileFormatterFactory{
    private static formatters: Map<string, FileFormatterInstance> = new Map();
    private static readonly fileFormatters = {
        python: PythonFormatter, 
        go: GoFormatter
    }

    static createFormatter(platform: string): FileFormatterInstance{
        let formatter = this.formatters.get(platform)
        if (formatter) return formatter
        formatter = this.getFormatter(platform)
        this.formatters.set(platform, formatter)
        return formatter
    }

    private static  getFormatter(platform: string): PythonFormatter | GoFormatter{
        const fomatterClass = Reflect.get(this.fileFormatters, platform)
        return new fomatterClass()
    }
}

const pythonFile = new File('one.py');
const goFile = new File('one.go');

const pythonFormatter = FileFormatterFactory.createFormatter('python');
let goFormatter = FileFormatterFactory.createFormatter('go');

console.log(pythonFormatter.format(pythonFile)) // formatted one.py
console.log(goFormatter.format(goFile)) // formatted one.go

goFormatter = FileFormatterFactory.createFormatter('go'); // not create formatter

export {}