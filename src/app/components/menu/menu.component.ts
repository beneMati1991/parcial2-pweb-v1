import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MDBModalRef } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
