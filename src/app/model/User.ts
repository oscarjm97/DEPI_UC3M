import { Achievement } from "./Achievement";
import { Review } from "./Review";
import { Experience } from "./Experience";

export class IUser {
  userID: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  points: number;
  rol: string;
  description: string;
  photo: string;
}

export class User implements IUser {
  userID: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  points: number;
  rol: string;
  description: string;
  photo: string;
  //experiences:Experience[];
  //achievements:Achievement[];
  //reviews:Review[];

  constructor(o?: IUser) {
    if (o !== undefined) Object.assign(this, o);
  }
}
