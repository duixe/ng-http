import { PostsService } from './post.service';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'http-proj';

  loadedPosts: Post[] = [];
  public isFetching = false; 

  private server = 'https://ng-complete-guide-b2c6b-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    // this.fetchPosts();
    this.isFetching = true;
    this.postsService.fetchPost().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }

  public onCreatePost(postData: Post) {
    // console.log(postData);
    
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    // this.fetchPosts();
    this.isFetching = true;
    this.postsService.fetchPost().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }

  onClearPosts() {
    // Send Http request
  }

  // private fetchPosts() {
  //   this.isFetching = true;
    
  // }
}
