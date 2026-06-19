import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Services } from '../../services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  title = "Blox'O'Fruits"
  gmail: string = ''
  password: string = ''

  constructor(private http: HttpClient, private router: Router, private Service: Services) {}

  login(){
    this.Service.getPost(this.gmail, this.password)
    .subscribe({
      next: (user) => {
        this.router.navigate(['/'])
      },
      error: (err) => {
        alert('invalid credentials!'); 
      }
    })
  }
}
