import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Services } from '../../services';
import { FormsModule } from '@angular/forms';

interface info {
  name: string;
  gmail: string;
  password: string;
}

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  title = "Blox'O'Fruits"
  name: string = ''
  gmail: string = ''
  password: string = ''
  confirmPassword: string = '';

  constructor(private router: Router, private Service: Services) {}

  
      register() {
        if(this.password !== this.confirmPassword){
          alert('passwords do not match');
        }
        if(!this.name || !this.gmail || !this.password) {
          alert('fill out all the fields');
          return;
        }
        this.Service.addPost({
          name: this.name, gmail: this.gmail, password: this.password
        }).subscribe({
          next: (createdUser) =>{
            alert('registered successfully')
            this.router.navigate(['/login']);
          },
          error: (err)=> {
            alert('signup failed!')
          }
        })
      }
  
}
