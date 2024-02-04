import { ServerOptions } from "./interface";

export class classServer{
    number: number;
    name: string;
    hosted: string;
    gameMode: string;
    people: string[];
    slovicka: string[];
    
    constructor(data:ServerOptions){
        this.number = data.number;
        this.name = data.name;
        this.hosted = data.hosted;
        this.gameMode = data.gameMode;
        this.people = data.people;
        this.slovicka = data.slovicka;
    }
    addPerson(name:string){
        this.people.push(name);
    }
}