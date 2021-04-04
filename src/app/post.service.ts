import { Post } from './post.model';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';


@Injectable({providedIn: 'root'})
export class PostsService{

    private server = 'https://ng-complete-guide-b2c6b-default-rtdb.firebaseio.com';
    public error = new Subject<string>();

    constructor(private http: HttpClient) {}

    public createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content };

        this.http.post<{ name: string}>(
            `${this.server}/post.json`, 
            postData,
            {
                observe: 'response'
            }
          )
          .subscribe(responseData => {
            console.log(responseData);
          }, error => {
              this.error.next(error.message);
          });
    }

    public fetchPost() { 
        // adding multiple query parameter
        let searchParams = new HttpParams();
        searchParams = searchParams.append('pretty', 'print');
        searchParams = searchParams.append('another', 'key value');

       return this.http
        .get<{[key: string]: Post}>(`${this.server}/post.json`, 
            {
               headers: new HttpHeaders({ 'custom-header': 'Hello'}),
            //    params: new HttpParams().set('print', 'pretty'),
               params: searchParams ,
               responseType: 'json'
            }
        )
        .pipe(map((responseData) => {
        const postArray: Post[] = [];

        for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });  
            }
        }

        return postArray;
        }))
        // catchError(errorRes => {
        //     return throwError(errorRes);
        // })
        // .subscribe(post => {
        // // console.log(this.loadedPosts);
        // })
        // when returning the http from this service method, one can then subscribe to them when used in a component
    }

    public deletePosts() {
       return this.http.delete(`${this.server}/post.json`, {
           observe: 'events',
           responseType: 'text' //changing the response type which is json by default to text
       })
       .pipe(tap(
           event => {
               console.log(event);
               if (event.type === HttpEventType.Sent) {
                   //...one can show a msg on the front-end informing a client that request has been sent, the app is
                //    waiting for the response, NB: YOU CAN'T USE EVENT.BODY WITH THIS TYPE
               }

               if (event.type === HttpEventType.Response) {
                   console.log(event.body);
                   
               }
            }
       ));
    }
    
}