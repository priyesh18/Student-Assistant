import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  result;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }
  register(data)
  {
    this.auth.register(data).subscribe((res) => {
      console.log(res);
      this.result = res;
    });

  }

}
