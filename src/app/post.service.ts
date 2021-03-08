import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class PostsService{

    private server = 'https://ng-complete-guide-b2c6b-default-rtdb.firebaseio.com';

    constructor(private http: HttpClient) {}

    public createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content };

        this.http.post<{ name: string}>(
            `${this.server}/post.json`, 
            postData
          )
          .subscribe(responseData => {
            console.log(responseData);
          });
    }

    public fetchPost() { 
       return this.http
        .get<{[key: string]: Post}>(`${this.server}/post.json`)
        .pipe(map((responseData) => {
        const postArray: Post[] = [];

        for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });  
            }
        }

        return postArray;
        }))
        // .subscribe(post => {
        // // console.log(this.loadedPosts);
        // })
        // when returning the http from this service method, one can then subscribe to them when used in a component
    }
    
}