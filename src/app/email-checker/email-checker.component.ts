import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
@Component({
  selector: 'app-email-checker',
  templateUrl: './email-checker.component.html',
  styleUrls: ['./email-checker.component.css']
})
export class EmailCheckerComponent {

  useremail: string = '';
  userObject:any={};
  form:FormGroup
  passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
  constructor( private http: HttpClient,private router:Router,private service:CommonServiceService){
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      // password:new FormControl('',[Validators.required,Validators.pattern(this.passwordRegex)]),
    });
    console.log("constructor abgbgf called");
  }


  
  // constructor(private http: HttpClient,private router: Router){}
  // data='';
  user:any='';
  
  
  async gettingUser(){
   
  

    console.log("pinttin hello "," apple called");
    
  const body={email:this.useremail}
  
  
    this.service.RegisterLoginCheck=true;
  
   

   let data=await this.http.post('http://localhost:4500/Routes/v1/auth/CheckUser',body).toPromise();

      console.log("data is ",data);
      this.user=data;
   
      if(this.user.data==null){
        console.log("navigation to register");
        this.service.RegisterLoginCheck=true;
       
        this.router.navigate(['/register']);
        const leadCreate=this.http.post('http://localhost:4500/Routes/v1/adddetails/lead/',body).subscribe((data)=>{
      console.log("Data inside lead is  ",data);
      
      })
        return;
      }

    
      
      
    
      this.router.navigate(['/login']);
    
    //  })
   

     

    console.log("going out of function ");
    
  }


  Checker(){

    this.userObject.EmailEntered=this.useremail;
    localStorage.setItem('userObject',JSON.stringify(this.userObject));
    console.log("useremail si ",this.useremail);
    this.user='Loading';
    

    setTimeout(()=>{
      console.log("user last isvf  is ",this.user);
      this.gettingUser();
    
    },1000);
   
    
  }


  getData(){
    const body={email:this.useremail}

    // this.http.post('http://localhost:4500/Routes/v1/adddetails/get',body).subscribe((data)=>{


    //   console.log("data of particular user is ",data);
    //   this.service.filteredData(data);
      
    // })

    this.service.getData();
  }
}
