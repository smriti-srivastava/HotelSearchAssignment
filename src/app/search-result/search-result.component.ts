import { Component, OnInit, Input } from '@angular/core';
import { hotel } from '../hotel.model';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input() hotels: hotel[];
  constructor() { }

  getArray(n: number): any[] {
    return Array(n);
  }

  ngOnInit() {
  }

}
