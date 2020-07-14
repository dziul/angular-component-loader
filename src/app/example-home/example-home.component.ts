import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-home',
  templateUrl: './example-home.component.html',
  styleUrls: ['./example-home.component.scss'],
})
export class ExampleHomeComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    console.log('Initiad - component Example-home');
  }
  ngOnDestroy() {
    console.log('Destroyed - component Example-home');
  }
}
