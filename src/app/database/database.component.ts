import { Component, OnInit } from '@angular/core';
import { Experience } from '../model/Experience';
import { UserService } from '../services/firestore/user.service';
import { User } from '../model/User';
import { Observable, Subscription } from 'rxjs';
import { UV_UDP_REUSEADDR } from 'constants';
@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss'],
})
export class DatabaseComponent implements OnInit {
  public users:User[];
  public s_users:Subscription;

  public userJuan:User;

  public userLogged:Promise<User>;

  public getUser(user:string)
  {
   this.userService.getUserByName(user).subscribe(data=>{
      this.userJuan=data[0];
   })
    
  }

  public authenticate(userID:string,pass:string):boolean{
    
    this.userLogged=this.userService.getUser(userID);

    
    this.userLogged.then(data=>{
      return data.password==pass && userID==data.userID;

    });
    return false;
    /*
    if(this.userLogged..password==pass){
      console.log('usuarioLogged',this.userLogged.password);
    }else{
      console.log('loco, que no',this.userLogged.password);
    }*/
  }


  constructor(private userService: UserService) 
  {
    //this.userLogged=new Promise<User>();
    this.userJuan=new User();
    this.users=[];
  }
  
  ngOnInit() {
    this.s_users=this.userService.getUsers().subscribe(data =>{
      this.users=data;
    });
    console.log(this.authenticate('oscar123','oscarpass'));
  }
  ngOnDestroy(){
    this.s_users.unsubscribe();
  }

}
