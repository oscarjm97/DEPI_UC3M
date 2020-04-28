export interface IExperience{
    name:string;
    description:string;
    price:number;
    type:number;
    rate:number;
    
}
export class Experience implements IExperience
{
    name: string;
    description: string;
    price: number;
    type: number;
    rate: number;


    constructor(o?:IExperience)
    {
        if(o !== undefined) Object.assign(this,o);
    }   

}
