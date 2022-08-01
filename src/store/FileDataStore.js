import {makeAutoObservable} from "mobx";

export default class FileDataStore{
    constructor(){
        this._fileData=[]

        makeAutoObservable(this)
    }

     setfileData(data){
        this._fileData=data
     }


    get fileData(){
        return this._fileData
    }
}