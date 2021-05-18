import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  RequiredValidator,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {HttpClient} from '@angular/common/http';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
    register=new FormGroup({
    'name':new FormControl(''),
    'email':new FormControl(''),
    'address':new FormControl(''), 
    'id':new FormControl(''),
    'password':new FormControl(''),
    'Cpassword':new FormControl('')
  })

  public inputToken : any; 
  message:String="1234zxcv567890bnm"; 
  incorrect:String;
  imgFile = null;
  isClicked=false
  public flag=false;

  constructor(private fb:FormBuilder, http:HttpClient, private router:Router, private authService:AuthService) {
   }
  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.imgFile = <File>event.target.files[0];
    console.log(this.imgFile);
  }


  confirm() {  
    if(this.inputToken==this.message) {
      this.register.value.src="assets/images/"+`${this.imgFile.name}`; 
      this.register.value.block=false;
      this.authService.send.next(this.register.value);
      this.authService.addUser(this.register.value).subscribe(data=>{
      this.router.navigateByUrl('userLogin');
    })
    }
    else {
      this.flag=true;
    }
  }     

  addUser(event){

   this.isClicked=true;
   emailjs.sendForm('service_x1d0ebk', 'template_zt1zj9s', event.target as HTMLFormElement, 'user_QiE4kMe5TqNOJ3EUlCk8p')
     .then((result: EmailJSResponseStatus ,) => {
       console.log(result.text); 
     }, (error) => {
       console.log(error.text);
     });

  }

}
