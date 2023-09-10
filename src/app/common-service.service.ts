import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

constructor(private http:HttpClient){}

  // previousUrl:string='';
  email:any=localStorage.getItem('loginEmail');
  RegisterLoginCheck:boolean=false;
  
  originalData:any={};
  filteredData(data:any){
    

    console.log("Data is ",data);
    
    console.log("object keys is ",Object.keys(data.data.userDetials));
    
    Object.keys(data.data.userDetials).forEach((el)=>{
      
      if(el=='_id'  || el=='__v'){
        return;
      }
      this.originalData[el]=data.data.userDetials[el];
      return this.originalData;
      // console.log("el is ",el," data is ",data.data.userDetials[el]);
      
    })



    
  Object.keys(this.originalData).forEach((el)=>{
    this.originalData[el].forEach((element:any)=>{
      delete element["_id"];
      console.log("el is ",element);
      // delete el._id;
    })
  })      



  console.log("orginal data is ",this.originalData);

  return this.originalData;
  }



  async getData(){
    const storedData = localStorage.getItem('userObject') as string;
    const parsedData = JSON.parse(storedData);
    
    const body={email:parsedData.EmailEntered};

    // this.http.post('http://localhost:4500/Routes/v1/adddetails/get',body).subscribe((data)=>{


    //   console.log("data of particular user is ",data);
    //   let x= this.filteredData(data);
    //   console.log("x is ",x);
    //   return x;
      
    // })




    let data=await this.http.post('http://localhost:4500/Routes/v1/adddetails/get',body).toPromise();
    // console.log("data inside getData is ",data);
    
    console.log("Data is ",data);

    return this.filteredData(data);
    
  }


  Timer(fn:Function,timer:number,LoadingScreen:any){
    setTimeout(()=>{
      fn();
   
      LoadingScreen=true;
    },timer)
  }


}
