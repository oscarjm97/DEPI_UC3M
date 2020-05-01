export interface IExperience {
  name: string;
  description: string;
  price: number;
  type: number;
  rate: number;
  photo: string;
}
export class Experience implements IExperience {
  name: string;
  description: string;
  price: number;
  type: number;
  rate: number;
  photo: string;

  constructor(o?: IExperience) {
    if (o !== undefined) Object.assign(this, o);
  }
}
