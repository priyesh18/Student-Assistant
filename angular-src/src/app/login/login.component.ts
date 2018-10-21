import { ResultFunc } from 'rxjs/observable/GenerateObservable';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
result;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  login(data) {
    console.log(data);
    this.auth.login(data).subscribe((data: {token , userid}) =>{
      console.log(data);
      this.result = true;
      localStorage.setItem("token",data.token);
       localStorage.setItem("userid",data.userid);
    })
  }
}
