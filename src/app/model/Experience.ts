export interface IExperience {
  id: string;
  userID: string;
  userphoto: string;
  name: string;
  description: string;
  price: number;
  type: string;
  rate: number;
  photo: string;
  country: string;
  province: string;
  reviews: number[];
}
export class Experience implements IExperience {
  id: string;
  userID: string;
  userphoto: string;
  name: string;
  description: string;
  price: number;
  type: string;
  rate: number;
  photo: string;
  country: string;
  province: string;
  reviews: number[];

  constructor(o?: IExperience) {
    if (o !== undefined) Object.assign(this, o);
  }
}
