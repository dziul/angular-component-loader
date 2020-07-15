import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-a',
  templateUrl: './example-a.component.html',
  styleUrls: ['./example-a.component.scss'],
})
export class ExampleAComponent implements OnInit, OnDestroy {
  data = {};
  constructor() {}

  ngOnInit() {
    console.log('Initialed - component Example-a');
  }
  ngOnDestroy() {
    console.log('Destroyed - component Example-a');
  }
}
