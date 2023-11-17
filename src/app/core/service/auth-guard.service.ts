import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Erro 403',
        text: 'Faça login para acessar esta página.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

