import { Component } from '@angular/core';
import { hotel } from './hotel.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hotels = [
    {hotelName: "Hyatt", rating: 3, address: "Pune", from: "2018-05-25", to: "2019-05-25", category: -1},
    {hotelName: "Lalit", rating: 4, address: "Pune", from: "2018-05-25", to: "2019-05-25", category: -1},
  ];
  hotelSearchResults: hotel[];
  getSearchResults(hotels) {
    this.hotelSearchResults = hotels;
  }
}
