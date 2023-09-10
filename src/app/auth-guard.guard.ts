import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonServiceService } from './common-service.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  

 
  const currentRoutes=state.url.split('/')[1]; // as url is /home so we changed to home


  const router=inject(Router);
  const previousUrl=localStorage.getItem('previousUrl');
  console.log("previous url isndie authguard is ",previousUrl);
  const service=inject(CommonServiceService)
  const restrictedRoutes:any={
    home:['dashboard','login','register'],
    login:['dashboard','register'],
    register:['dashboard','login'],
    dashboard:['home','login','register']
  }





  
  //  if user is login and try to go to dashboard
  if(localStorage.getItem('login') && currentRoutes=='dashboard'){
    localStorage.setItem('previousUrl','dashboard')
    return true;
  }
  


  // if user is on register an tru to go login after 




  // if user is on home and he entered email and than click button either go to register or login 
  if(service.RegisterLoginCheck &&((currentRoutes=='login') || (currentRoutes=='register')) && ((previousUrl=='home') || (previousUrl=='register') )){
    service.RegisterLoginCheck=false;
    localStorage.setItem('previousUrl',currentRoutes);
    return true;

  }



  console.log("hello");


  
  if(previousUrl==null){
   
    localStorage.setItem('previousUrl','home');
    router.navigate(['/home']);
   
    // service.previousUrl='home' i dont do this wheever the page loads service run again and previous url again set to ''
    return true;
  }
  

  //  when user clicks on logout and than user navigates to home from dashboard
  if((localStorage.getItem('login')==null) && (previousUrl=='dashboard')){
    return true;
  }


  //  if previous url is home and user try to go dashboard
  if(restrictedRoutes[previousUrl].includes(currentRoutes) ){
    console.log("inside back condition ",previousUrl);
    
router.navigate(['/'+previousUrl]);
  return false;
  }



 localStorage.setItem('previousUrl',currentRoutes);

return true;

};
