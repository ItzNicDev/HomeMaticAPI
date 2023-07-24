import {Component, OnInit} from '@angular/core';
import {DataService} from "./services/data.service";
import {HttpClient} from "@angular/common/http";
import * as xml2js from 'xml2js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public response: any;
public liters: number = 0;
private litersMax: number = 4500;
  constructor(private http: HttpClient,private dataservice:DataService) {
  }

  ngOnInit() {
    this.http.get('http://192.168.178.43/config/xmlapi/statelist.cgi', {responseType: 'text'}).subscribe(data => {
      // this.response = data;
      const serializer = new XMLSerializer();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      let value = xmlDoc.querySelector('[name="Wasserstandsmelder"]');
      value = xmlDoc.querySelector('[name="HM-Sen-Wa-Od PEQ1605600:1"]');
      value = xmlDoc.querySelector('[name="BidCos-RF.PEQ1605600:1.FILLING_LEVEL"]');

      let filteredvalue = value?.getAttribute('value');

      if (filteredvalue !== null) {
        // @ts-ignore
        this.response = (parseInt(filteredvalue) - 10);

        this.liters = this.litersMax * (this.response / 100)
      } else {
        console.log("Attribute 'value' not found or is null.");
      }
    });

    this.dataservice.apiCall();
  }
}
