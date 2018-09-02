import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IfStmt } from '@angular/compiler';
import { hotel } from '../hotel.model';

@Component({
  selector: 'filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.css']
})
export class FilterSectionComponent implements OnInit {
  
  toDateToggle:boolean;
  searchButtonToggle: boolean;
  fromDate:Date;
  toDate:Date;
  searchBox:string;
  errorMessage:string;
  @Input() hotels;
  @Output() hotelSearchEvent: EventEmitter<hotel[]> = new EventEmitter();
  constructor() { 
    this.toDateToggle = true;
    this.searchButtonToggle = false;
    this.searchBox = "";
  }
  
  checkAllInputs() {
    if (this.fromDate && !this.toDate) {
       this.searchButtonToggle = true;
       this.errorMessage = "With 'FROM:','TO:' field is mandatory";
     }
     else if((this.fromDate>this.toDate)) {
      this.searchButtonToggle = true;
      this.errorMessage = "'TO:' date cannot be less than 'FROM:' date";
     }
     else
     {
       this.searchButtonToggle = false;
       this.errorMessage = "";
     }
  }

  checkFromDate() {
    if(this.fromDate) {
      this.toDateToggle = false;
    }
    else
    {
      this.toDate = null;
      this.toDateToggle = true;
    }
    this.checkAllInputs();   
  }

  search() {
    var from = new Date(this.fromDate);
    var to = new Date(this.toDate);
    var name = this.searchBox;
    var searchResult: hotel[] = new Array();
    var index = 0;
    for(let hotel of this.hotels) {
        if(hotel.hotelName.toLowerCase().includes(name.toLowerCase())) {
            var hotelTo = new Date(hotel.to);
            var hotelFrom = new Date(hotel.from);
            if(hotelFrom <= from && to <= hotelTo) {
              hotel.category = 1;
            }
            else if((from < hotelFrom && to < hotelFrom) || (from > hotelTo && to > hotelTo)  ) {
              hotel.category = 3;
            }
            else {
              if(this.fromDate)
              hotel.category = 2;
              else
              {
                hotel.category = -1;
              }
            }
          searchResult[index] = hotel;
          index++;
        }
    }
    this.hotelSearchEvent.emit(searchResult);
  }

  ngOnInit() {
  }
}
