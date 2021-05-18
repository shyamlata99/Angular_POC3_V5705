import { getLocaleWeekEndRange } from '@angular/common';
import { collectExternalReferences } from '@angular/compiler';
import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private service:AuthService) { }

  public userDetail:any;
  public allUserDetails:any;
  public searchInput:any;
  public searchedUser:any;
  public friendList:any;
  public requestList:any;
  public sendRequest=[];
  public flag=false;

  ngOnInit(): void {
    this.currentData();
    this.getDetails();
  }
  
  currentData(){ 
    this.service.collect.subscribe(data=>{ 
      this.userDetail=data;
      this.friendList=this.userDetail.friends; 
      this.requestList=this.userDetail.requests;   
    });
  }

  getDetails(){
    this.service.userData().subscribe(data=>{  
      this.allUserDetails=data;
    })
  }

  searchedDetails(){
    for(let i=0;i<this.allUserDetails.length;i++){
      if(this.searchInput.toLowerCase()==this.allUserDetails[i].name.toLowerCase() || this.searchInput.toLowerCase()==this.allUserDetails[i].email.toLowerCase()){
        this.searchedUser=this.allUserDetails[i];
        this.flag=true;
      }
    }
  }

  acceptRequest(i){
    let accept=this.requestList[i];
    this.requestList.splice(i,1);
    this.friendList.push(accept);
    this.userDetail.requests=this.requestList;       
    this.service.updateUserStatus(this.userDetail.id,this.userDetail).subscribe(data=>{ 
  })

  for(let i=0; i<this.allUserDetails.length; i++)
    if(this.allUserDetails[i].name==accept)
    {
      this.allUserDetails[i].friends.push(this.userDetail.name);
      this.service.updateUserStatus(this.allUserDetails[i].id,this.allUserDetails[i]).subscribe(data=>{
    }) 
  } 
}

  rejectRequest(i){
    this.requestList.splice(i,1);
}

  addFriend(){
      this.sendRequest.push(this.userDetail.name);
      this.searchedUser.requests=this.sendRequest; 
      this.service.updateUserStatus(this.searchedUser.id,this.searchedUser).subscribe(data=>{
    });
  }

  close(){
    this.flag=false;
  }

}
