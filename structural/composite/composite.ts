import { v4 as uuidv4 } from 'uuid';

interface DirectoryInfo{
    name: string
    size: number
}

type FolderInfo = Omit<DirectoryInfo, 'size'>
type directoryIdentifier = string
type directory = InstanceType<typeof File> | InstanceType<typeof Folder>
type directories = Array<directory>

abstract class Directory {
    protected _id: string
    protected _name: string
    protected _size: number
    constructor(info: DirectoryInfo){
        this._id = uuidv4()
        this._name = info.name
        this._size = info.size
    }
    protected abstract get name(): string
    protected abstract get size(): number
    protected abstract displaySize(): string
}

class File extends Directory{
    constructor(
        info: DirectoryInfo
    ){
        super(info);
    }
    get name(){
        return this._name
    }
    get size(): number{
        return this._size
    }
    displaySize(){
        return `${this._size} kb`
    }
    get id(){
        return this._id
    }
}

class Folder extends Directory{
    private sub: Map<directoryIdentifier, directory>
    constructor(
        info: FolderInfo
    ){
        super({name: info.name, size: 0});
        this.sub = new Map();
    }
    get name(): string{
        return this._name
    }
    get size(): number{
        let sum = 0
        for (let [_, dir] of this.sub){
            sum += dir.size
        }
        return sum
    }
    get id(){
        return this._id
    }
    displaySize(){
        return `${this.size} kb`
    }
    add(dirs: directories){
        for (let dir of dirs){
            this.sub.set(dir.id, dir)
        }
    }
    remove(dir: directory){
        this.sub.delete(dir.id)
    }
    getDir(id): directory | undefined{
        return this.sub.get(id)
    }
}

const oneFile = new File({name: 'one', size: 1})
const twoFile = new File({name: 'two', size: 2})
const threeFile = new File({name: 'three', size: 3})
const oneFolder = new Folder({name: 'one'})
const twoFolder = new Folder({name: 'two'})

twoFolder.add([oneFile, twoFile])
oneFolder.add([oneFile, twoFile, threeFile, twoFolder])

oneFolder.displaySize() // 9kb
twoFolder.displaySize() // 3kb
oneFolder.remove(twoFolder) // remove folder
console.log(oneFolder.displaySize()) // 6kb

export {}