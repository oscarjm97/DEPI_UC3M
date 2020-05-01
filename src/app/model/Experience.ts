export interface IExperience {
  name: string;
  description: string;
  price: number;
  type: string;
  rate: number;
  photo: string;
  reviews: number[];
}
export class Experience implements IExperience {
  name: string;
  description: string;
  price: number;
  type: string;
  rate: number;
  photo: string;
  reviews: number[];

  constructor(o?: IExperience) {
    if (o !== undefined) Object.assign(this, o);
  }
}
