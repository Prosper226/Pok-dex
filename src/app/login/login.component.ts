import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  message: string = "Vous etes deconnecte. (admin/1234)"
  name: string
  password: string
  auth: AuthService

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.auth = this.authService
  }

  setMessage(){
    if(this.auth.isLoggedIn){
      this.message = 'Vous etes connecte.'
    }else{
      this.message = 'Identifiant ou mot de passe incorrect.'
    }
  }

  login(){
    this.message = 'Tentative de connexion en cours...'
    this.auth.login(this.name, this.password).subscribe(
      (isLoggedIn: boolean) => {
        this.setMessage()
        if(isLoggedIn){
          this.router.navigate(['/pokemons'])
        }else{
          this.password = ''
          this.router.navigate(['/login'])
        }
      }
    )
  }

  logout(){
    this.auth.logout()
    this.message = 'Vous etes deconnecte.'
  }
}
