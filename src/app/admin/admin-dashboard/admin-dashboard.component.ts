import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  
public userData:any;

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getusers();  
  }
  getusers(){
    this.authService.userData().subscribe(data=>{
      this.userData=data;
    })
  } 

  blockUser(i){
    this.userData[i].block=true;
    this.authService.updateUserStatus(this.userData[i].id,this.userData[i]).subscribe(data=>{
  });
}

  unblockUser(i){
    this.userData[i].block=false;
    this.authService.updateUserStatus(this.userData[i].id,this.userData[i]).subscribe(data=>{ 
    }); 
  }

}


