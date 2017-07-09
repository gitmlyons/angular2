import { Component, ViewChild } from '@angular/core';
import { BackendApiService } from './backend-api.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from "ngx-modal";
import { Observable } from 'rxjs/Observable';

import { WjGridModule, WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { DataMap } from 'wijmo/wijmo.grid';
import { DataGridModule } from 'primeng/components/datagrid/datagrid';

import { OnlyDigitsDecimal } from './only-digits-decimal.directive';
import { CompleterService, CompleterData, CompleterCmp } from 'ng2-completer';
import { City } from './city';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class App2Component {
  title: string;
  cities: City[];
  citiesFiltered: any[];
  citiesObservable: Observable<string[]>;
  cityData: any[];
  data: any[];
  cityMap: DataMap;
  //at time of writing ng-completer does not have a way to return bind to non display property
  _cityId: number;
  get cityId(): number { return this._cityId; }
  set cityId(value: number) {
    this._cityId = value;
    this._cityName = this.cities.find(c => c.id == value) ? this.cities.find(c => c.id == value).name : null;
  };
  _cityName: string;
  get cityName(): string { return this._cityName; }
  set cityName(value: string) {
    this._cityName = value;
    this._cityId = this.cities.find(c => c.name == value) ? this.cities.find(c => c.name == value).id : null;
  };

  closed: boolean = false;
  @ViewChild('flex') flex: WjFlexGrid;
  heroForm: FormGroup;
  @ViewChild('saveModal') saveModal: Modal;
  @ViewChild('revertModal') revertModal: Modal;
  @ViewChild('citySelect') citySelect: CompleterCmp;
  
  value: number;
  protected dataService: CompleterData;

  constructor(private backendApiService: BackendApiService, private fb: FormBuilder,
    private completerService: CompleterService) {
    //[{'test':'test column value'}]
    this.cityData = [{ 'city': 'Geelong' }];
    this.cities = [new City({ 'id': 1, 'name': 'Brisbane' }), new City({ 'id': 2, 'name': 'Gold Coast' }), new City({ 'id': 2, 'name': 'Sydney' })]
    this.cityId = 2;
    this.dataService = completerService.local(this.cities, 'name', 'name');
    this.citiesFiltered = this.cities.filter(c => true);
    this.heroForm = this.fb.group({
      name: ['', Validators.required], // <--- the FormControl called "name"
      value: ['', Validators.required], // <--- the FormControl called "name"
      cityName: ['', Validators.required], // <--- the FormControl called "name"
    });
  }

  getServiceData() {

    this.backendApiService.getServiceData().subscribe(
      data => {
      this.title = data.succeeded,
        this.cities = data.result.map(function (city: string) { return { 'city': city } }),
        this.cityData = data.result.map(function (city: string) { return { 'city': city } })
      },
      error => { this.title = error });

    this.data = this.cities;
    this.cityMap = new DataMap(this.cityData, 'city', 'city');
    this.citiesObservable = this.backendApiService.getServiceData2();
  }

  onSubmit() {
    this.saveModal.open();
  }

  revert() {
    this.revertModal.open();
  }

  private openCitySelect(): void
  {
    this.citySelect.open();
    this.citySelect.focus();
  }

  private onCitySelect(): void
  {
    this.citySelect.close();
  }
}
