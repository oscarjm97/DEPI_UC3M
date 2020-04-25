import {Achievement} from './Achievement'
import {Review} from './Review'
import { Experience } from './Experience';

export interface IUser{
    userID:string;
    name:string;
    email:string;
    points:number;
    password: string;
    rol: string;
    description:string;


}



export class User implements IUser{
    userID:string;
    name:string;
    password: string;
    rol: string;
    email: string;
    points: number;
    description: string;
    experiences:Experience[];
    achievements:Achievement[];
    reviews:Review[];

    constructor(o?:IUser)
    {
        if(o !== undefined) Object.assign(this,o);
    }   

}