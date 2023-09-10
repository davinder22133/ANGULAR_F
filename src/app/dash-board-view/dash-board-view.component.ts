import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-dash-board-view',
  templateUrl: './dash-board-view.component.html',
  styleUrls: ['./dash-board-view.component.css']
})
export class DashBoardViewComponent {
  constructor(private http:HttpClient,private service:CommonServiceService){
    console.log("i am called");
    
    this.orginalData=this.show()
    
    console.log("orgiaina daa is ",this.orginalData,);
    
  }
  // data:any='';
  // headers:any;
  // constructor( private http: HttpClient) {
  //   const body={email:'abc@gmail.com'}
  //   this.http.post('http://localhost:4500/Routes/v1/adddetails/get', body).subscribe((data) => {
  //     console.log("data is ", data);
  //     this.data=data;
  //   // console.log(this.data.user);
  //   console.log(this.data.userDetials);
  //     // this.data.use
  //     let keys=Object.keys(this.data.userDetials)
  //     console.log("key is ",keys);
  //     this.headers=keys.splice(1,keys.length-2);
  //     console.log("lek ",keys, " data is ",this.data);
      

   
  // });
  // }



  // helper(el:any){
  //   if(this.data=='') return;
    
  //   let x=this.data.userDetials[el];
  //   console.log("x is ",x);
    
  //   return this.data.userDetials[el];
  // }

  data :any= [
    {
      Education: [{ x: 10, y: 11 },{x:11}],
      experience: [{ x: 10, y: 11 }],
      user: [{ x: 10, y: 11 }],
    },
    {
      Education: [{ x: 102, y: 11 },{ x: 102, y: 11 },{ x: 102, y: 11 },{ x: 102, y: 11 }],
      experience: [{ x: 103, y: 11 }],
      user: [{ x: 102, y: 11 }],
    },
    {
      Education: [{ x: 104, y: 11 }],
      experience: [{ x: 105, y: 11 }],
      user: [{ x: 105, y: 11 }],
    },
  ];
  apiData: any = null;

maxRowSpan(el:any):number{

  // console.log("el is ",el);
  
  let maxlength=el.Education.length;
  if(maxlength<el.experience.length) maxlength=el.experience.length;
  if(maxlength<el.user.length) maxlength=el.user.length;
  return maxlength
  
}
  length(el:any,length:any):number{
    return el.value.length;
  }

  headers:any=[];
  vast(el:any,length=''):any{
   
    console.log("el is ",el);
    if(Array.isArray(el.value)){
      return el.value;
    }
    return [];
   
  
    
    return this.data[el];
  }
  ngOnInit() {
    // Fetch data from your API and assign it to apiData when it's available
    this.http.get('http://localhost:4500/Routes/v1/adddetails/get').subscribe((data:any) => {
      this.apiData = data;
      console.log("api data is ",this.apiData);
      this.headers=Object.keys(this.apiData.data[0].userDetials);
      console.log("  is ",this.headers);
    //  let x=this.service.filteredData(this.apiData);
    //  console.log("x os ",x);
     
      // this.service.filteredData(data);
       this.headers.pop();
    });
  }
  orginalData:any=[];
  async show(){
  await this.http.get('http://localhost:4500/Routes/v1/adddetails/get').toPromise().then((El)=>{
    return El;
  })
   
  }
 
}
