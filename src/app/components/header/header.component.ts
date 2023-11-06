import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  name: string | null;
  surname: string | null;
  constructor(
    private router: Router
  ) { 
    this.name = localStorage.getItem('name');
    this.surname = localStorage.getItem('surname');
  }
  
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
