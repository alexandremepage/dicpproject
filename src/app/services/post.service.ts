import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://localhost:3000/api/';

  private headers = { 'content-type': 'application/json'} 
  constructor(private httpClient: HttpClient) { }

  getPosts(){
    return this.httpClient.get(this.url)
  }
  
  create(post: any){
    console.log(post)
    console.log(JSON.stringify(post))
    return this.httpClient.post<any>(this.url, JSON.stringify(post), {'headers':{ 'content-type': 'application/json'} });
  }
}
