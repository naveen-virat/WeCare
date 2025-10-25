import { Component, OnInit, VERSION } from '@angular/core';
import constants from '../../assets/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  c = constants;
  constructor() { }
  ngOnInit() {
    console.log(VERSION)
  }

}
