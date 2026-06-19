import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Post {
  name: string;
  gmail: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Services {
  private apiUrl = 'https://blox-ofruits-api.gokulabc124.workers.dev/api';

  constructor(private http: HttpClient) {}

  addPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/add`, post);
  }

  getPost(gmail: string, password: string): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/login`, { gmail, password }); 
  }
}
