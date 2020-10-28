import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false
  constructor(private router: Router ,private authService: AuthService) {
    this.authService.authSub.subscribe((data) => {
      this.isLoggedIn = data
    })
  }

  ngOnInit(){
    this.isLoggedIn = this.authService.getAuthStatus()
  }
  onSignIn(){
    this.router.navigate(['register'] );
  }
  onLogIn() {
    this.router.navigate(['login']);
  }
  logout() {
    this.authService.logoutUser()
    this.router.navigate(['/login'])
  }
  toggleMenuBar() {
    if(document.getElementById("collapsibleNavId").style.display == "block") {
      document.getElementById("collapsibleNavId").style.display = "none";
    } else {
      document.getElementById("collapsibleNavId").style.display = "block";
    }
  }

}
