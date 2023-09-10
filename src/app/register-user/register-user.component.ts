import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  form:FormGroup
  passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
  constructor( private http: HttpClient,private router: Router,private service:CommonServiceService){
    this.form = new FormGroup({
      name:new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.pattern(this.passwordRegex)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.pattern(this.passwordRegex)])
    });

    const storedData = localStorage.getItem('userObject') as string;
    const parsedData = JSON.parse(storedData);
    

    this.form.get('email')?.setValue(parsedData.EmailEntered);
  }

  Response:any;

  Submit(){
    console.log("login form is ",this.form);
    const body={
      "name":this.form.get('name')?.value,"email":this.form.get('email')?.value,"Password":this.form.get('password')?.value,"confirmPassword":this.form.get('confirmPassword')?.value}

      // const body={email:"Dav@gmail.com",Password:"12345"}



    //  lead find
    this.http.post('http://localhost:4500/Routes/v1/adddetails/leadfind/',body).subscribe((el)=>{
      console.log("lead refrenced added ",el);
      
    })

   this.http.post('http://localhost:4500/Routes/v1/auth/signup',body).subscribe((data)=>{
    console.log("data is ",data);
    // if(data.)
    // if(data.error)
      this.Response=data;
      // alert(this.Response)
      if(this.Response.error){
        alert(this.Response.error);
        return;
      }

      this.service.RegisterLoginCheck=true;
      this.router.navigate(['/login']);
      

   })
    
  }
}
