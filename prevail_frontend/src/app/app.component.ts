import { Component } from '@angular/core';
import { CookieService } from './services/cookie.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  login = true;
  missionLogs = false;

  constructor(
    private data: DataService,
    private ls: CookieService
  ) {}

  ngOnInit(): void {
    if (this.ls.get('username')) {
      this.login = false;
      this.missionLogs = !this.login;
    }
  }

  userValidated(boolVal: boolean) {
    this.login = !boolVal;
    this.missionLogs = boolVal;
  }
}
