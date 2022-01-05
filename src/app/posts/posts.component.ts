import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private postService: PostsService) { }

  posts: Post[] = [];

  ngOnInit(): void {
    if(!sessionStorage.getItem('lastPosts')){
      console.log('pegou do server')
      this.getPosts();
    } else {
      console.log('pegou do storage');
      this.posts = JSON.parse(sessionStorage.getItem('lastPosts') || '');
    }
  }

  getPosts(){
    this.postService.getPosts().subscribe( post => {
      this.posts = post;
      sessionStorage.setItem('lastPosts', JSON.stringify(post));
    })
  }
}
