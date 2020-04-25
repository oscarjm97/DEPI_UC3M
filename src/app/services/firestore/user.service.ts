import { Injectable } from '@angular/core';
import { User } from 'src/app/model/User';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'; 

@Injectable({
  providedIn: 'root'
})
// https://stackoverflow.com/questions/54002758/how-to-get-an-observable-for-data-from-firestore-query-in-angular-7
export class UserService {
  private afs: AngularFirestoreCollection<User>;
  private users:User[];

  public getUser(userID: string): Promise<User> {
    return this.afs.doc(userID).get().toPromise().then(r => {
      return r.data() as User;
    });
  }
  
  public getUsers(): Observable<User[]>{
    return this.afs.valueChanges();
  }
  public getUserByName(userName:string):Observable<User[]>{
    return this.firestore.collection<User>('users',ref=>ref.where("name","==",userName)).valueChanges();
  }
  
  constructor(private firestore:AngularFirestore) 
  {
    this.afs=this.firestore.collection('users');
    this.users=[];
  }
}
