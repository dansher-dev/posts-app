import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {Post, PostResponse} from './post.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  public getPosts(): void {
    this.http.get<PostResponse>('http://localhost:3000/api/posts')
      .pipe(map(postData => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((posts) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  public getPostUpdateListener(): Observable<Post[]>  {
    return this.postsUpdated.asObservable();
  }

  public addPost(title: string, content: string): void {
    const post: Post = {id: '', title: title, content: content};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
      .subscribe((res) => {
        console.log(res.message);
        post.id = res.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  public deletePost(id: string): void {
    this.http.delete('http://localhost:3000/api/posts/' + id)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
