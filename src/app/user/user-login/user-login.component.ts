import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html', 
  styleUrls: ['./user-login.component.css'] 
})
export class UserLoginComponent implements OnInit {

  public email:any;
  public password:any;
  public userCredentials:any;

  constructor(private service:AuthService, private router:Router) { }
  
    ngOnInit(): void {
    }

  userAuth(){
    this.service.userData().subscribe(data=>{
      this.userCredentials=data;
      for(let i=0;i<this.userCredentials.length;i++){
        if(this.userCredentials[i].email==this.email && this.userCredentials[i].password==this.password && this.userCredentials[i].block==false){
          localStorage.setItem('userEmail', 'authenticate')
          this.service.send.next(this.userCredentials[i]);
          this.router.navigateByUrl('userDashboard');
        }
      }
    })
  }
  }
  