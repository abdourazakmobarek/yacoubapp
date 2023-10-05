import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router= inject(Router);
  const service= inject(ServiceService);
  if (service.isLoggedIn !== true) {
    router.navigate(['']);
  }
  return true;
 
  
};
