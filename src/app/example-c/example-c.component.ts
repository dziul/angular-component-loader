import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-c',
  templateUrl: './example-c.component.html',
  styleUrls: ['./example-c.component.scss'],
})
export class ExampleCComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    console.log('Initialed - component Example-c');
  }
  ngOnDestroy() {
    console.log('Destroyed - component Example-c');
  }
}
