import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form:FormGroup
  passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
  constructor( private http: HttpClient,private router: Router,private service:CommonServiceService){
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.pattern(this.passwordRegex)]),
    });


    const storedData = localStorage.getItem('userObject') as string;
    const parsedData = JSON.parse(storedData);
    
    console.log("parse data is ",parsedData);
    
   this.form.get('email')?.setValue(parsedData.EmailEntered);
  // console.log("email si ",this.form.get('email'));
  
  }

  userDetails:any;

  Submit(){
    console.log("login form is ",this.form);
    // const body={
    //   "name":"Dav","email":"Dav@gmail.com","Password":"12345","confirmPassword":"12345" }

      const body={email:this.form.get('email')?.value,Password:this.form.get('password')?.value}

   this.http.post('http://localhost:4500/Routes/v1/auth/login',body).subscribe((data)=>{
    console.log("data is ",data);
    // if(data.data==null){}
    this.userDetails=data;
    this.userDetails=this.userDetails;
    if(this.userDetails.data==null){
      alert(this.userDetails.message);
      this.router.navigate(['/register']);
      return;
    }


      localStorage.setItem('login','true');

      
      // const body={email:this.service.email};

      // this.http.post('http://localhost:4500/Routes/v1/adddetails/get',body).subscribe((data)=>{


        // console.log("data of particular user is ",data);
        // this.service.getData();
        this.router.navigate(['/dashboard']);
      // })


      
     
      

   })
    




  }
}
