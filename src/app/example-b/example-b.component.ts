import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-example-b',
  templateUrl: './example-b.component.html',
  styleUrls: ['./example-b.component.scss'],
})
export class ExampleBComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    console.log('Initiad - component Example-b');
  }
  ngOnDestroy() {
    console.log('Destroyed - component Example-b');
  }
}
