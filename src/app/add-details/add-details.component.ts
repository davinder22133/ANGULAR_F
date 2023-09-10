import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css']
})
export class AddDetailsComponent {
  UserDetails!: any;

  constructor(private fb: FormBuilder, private http: HttpClient,private router:Router,private service:CommonServiceService) {
    this.UserDetails = this.fb.group({
      Address: this.fb.array(
        [

          //  this.addFormElement('Address')
          this.fb.group({
            houseNo: this.fb.control('', [Validators.required]),
            StreetNo: this.fb.control('', [Validators.required]),
            City: this.fb.control('', [Validators.required]),
            State: this.fb.control('', [Validators.required]),
            Country: this.fb.control('', [Validators.required])
          })
        ]),
      Education: this.fb.array(
        [
          this.fb.group({
            SchoolName_CollegeName: this.fb.control('', [Validators.required]),
            Percentage_CGPA: this.fb.control('', [Validators.required]),
            Class_Degree: this.fb.control(''),
            Year: this.fb.group({
              To: this.fb.control('', [Validators.required]),
              From: this.fb.control('', [Validators.required])
            })
          })
        ]
      ),

      Experience: this.fb.array([
        this.fb.group({
          CompanyName: this.fb.control('', [Validators.required]),
          Designation: this.fb.control('', [Validators.required]),
          Year: this.fb.group({
            To: this.fb.control('', [Validators.required]),
            From: this.fb.control('', [Validators.required])
          })
        })
      ])
    })


    this.PrintData();

  }

  addForm(el: any) {
    let element;

    if (el == 'Address') {
      element = this.fb.group({
        houseNo: this.fb.control('', [Validators.required]),
        StreetNo: this.fb.control('', [Validators.required]),
        City: this.fb.control('', [Validators.required]),
        State: this.fb.control('', [Validators.required]),
        Country: this.fb.control('', [Validators.required])
      });
      this.UserDetails.get('Address').push(element);
    }
    else if (el == 'Education') {
      element = this.fb.group(
        {
          SchoolName_CollegeName: this.fb.control('', [Validators.required]),
          Percentage_CGPA: this.fb.control('', [Validators.required]),
          Class_Degree: this.fb.control(''),
          Year: this.fb.group({
            To: this.fb.control('', [Validators.required]),
            From: this.fb.control('', [Validators.required])
          })
        }
      );
      this.UserDetails.get('Education').push(element);
    }
    else if (el == 'Experience') {
      element = this.fb.group({
        CompanyName: this.fb.control('', [Validators.required]),
        Designation: this.fb.control('', [Validators.required]),
        Year: this.fb.group({
          To: this.fb.control('', [Validators.required]),
          From: this.fb.control('', [Validators.required])
        })
      })
      this.UserDetails.get('Experience').push(element);
    }
    else { }

    return element;
  }


  check: any = 0;
  removeAddress(i: any, el: any) {
    let x = this.UserDetails.get(el).removeAt(i);
  }

  next() {
    this.check += 1;
  }

  prev() {
    this.check -= 1;
  }

  submit_btn() {


    // this.service.email='abc@gmail.com'
    
    const storedData = localStorage.getItem('userObject') as string;
    const parsedData = JSON.parse(storedData);
    

    // this.form.get('email')?.setValue(parsedData.EmailEntered);
   const body={data:this.UserDetails.value,email:parsedData.EmailEntered};





    this.http.post('http://localhost:4500/Routes/v1/adddetails/', body,).subscribe((data) => {
      console.log("data is ", data);




    })
  }


  getControlValue(el: any) {

    return (this.UserDetails.get(el) as FormArray).controls;
  }


  Validator(el: any, i: any) {
    // console.log(" for is ",this.UserDetails.get(el).controls[0]);
    // console.log(" control si ", this.UserDetails.get(el).controls);

    return this.UserDetails.get(el).controls[i];
  }

  clicked() {
    const body={email:'abc@gmail.com'}
    // console.log("this.form is ",this.UserDetails.value);
    // console.log("form is ", this.UserDetails.get('Education')?.controls[0].get('Year'));
    this.http.post('http://localhost:4500/Routes/v1/adddetails/get', body).subscribe((data) => {
      console.log("data is ", data);
     



    })
  }


  logout(){
   
    this.service.RegisterLoginCheck=false;
    localStorage.removeItem('login');
    // loca
  
    localStorage.removeItem('userObject');
    localStorage.removeItem('previousUrl');
    this.router.navigate(['/home']);
  }


  PrintData(){
  //  const x= this.service.getData();
   this.service.getData().then(
    (el)=>{
    // console.log(" el iinside printdata iss ",el);
    // console.log(this.UserDetails.get);
    Object.keys(el).forEach((e)=>{
      // console.log(el[e]," sarray is");
      // el[e].length

      // console.log("length is ",el[e].length);
      
      for(let i=0;i<el[e].length-1;i++){
          // console.log("e is ",e);
          
        this.addForm(e);
        
        
      }


      
      
    })


    
    this.UserDetails.patchValue(el);

   }, )
   
    }


}