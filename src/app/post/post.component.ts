import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private userService: UsersService, private route: ActivatedRoute) { }

  private sub: any;
  post: Post;
  user: User;
  loading = true;
  editing = false;
  postId: number;
  index: number;
  lastPosts: Post[];

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.postId = +params['id'];
      this.getPost(this.postId);
    });
  }

  getPost(id: number){
    this.lastPosts = JSON.parse(sessionStorage.getItem('lastPosts') || '');

    this.post = this.lastPosts.find(post => {
      return post.id === this.postId;
    }) || {
      userId: 0,
      id: 0,
      title: '',
      body: ''
    };

    this.form.controls['title'].setValue(this.post.title);
    this.form.controls['body'].setValue(this.post.body);
    this.form.controls['title'].disable();
    this.form.controls['body'].disable();

    this.getUser(this.post.userId);
  }

  getUser(id: number){
    this.userService.getUserById(id).subscribe( user => {
        if(user){
          this.hideloader();
          this.user = user;
        }
      }
    )
  }

  hideloader() {
    this.loading = false;
  }

  startEditing(){
    this.form.controls['title'].enable();
    this.form.controls['body'].enable();
    this.editing = true;
  }

  confirmEditing(){
    this.form.controls['title'].disable();
    this.form.controls['body'].disable();

    this.post.title = this.form.controls['title'].value;
    this.post.body = this.form.controls['body'].value;
    this.lastPosts[this.index] = this.post;

    sessionStorage.setItem('lastPosts', JSON.stringify(this.lastPosts));
    this.editing = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
