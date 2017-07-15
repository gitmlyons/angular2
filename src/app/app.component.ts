import { Component, ViewChildren, QueryList } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from './city';
import { MdOptionSelectionChange, MdAutocomplete, MdAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class App2Component {
  cities: City[];
  currentCity: City = new City();
  citiesFiltered: any[];

  cities2: City[];
  currentCity2: City = new City();
  citiesFiltered2: any[];

  heroForm: FormGroup;
  @ViewChildren(MdAutocompleteTrigger) completers:QueryList<MdAutocompleteTrigger>;

  constructor(private fb: FormBuilder) {
    this.cities = [new City({ 'id': 1, 'name': 'Brisbane' }), new City({ 'id': 2, 'name': 'Gold Coast' }), new City({ 'id': 3, 'name': 'Sydney' }),
      new City({ 'id': 4, 'name': 'Brisbane' }), new City({ 'id': 5, 'name': 'Gold Coasta' }), new City({ 'id': 6, 'name': 'Sydney' }),
      new City({ 'id': 7, 'name': 'Brisbane' }), new City({ 'id': 8, 'name': 'Gold Coast' }), new City({ 'id': 9, 'name': 'Sydney' }),
      new City({ 'id': 10, 'name': 'Brisbane' }), new City({ 'id': 11, 'name': 'Gold Coast' }), new City({ 'id': 12, 'name': 'Sydney' })]
    this.currentCity = new City(this.cities[4]);    

    this.cities2 = [new City({ 'id': 1, 'name': 'Brisbane' }), new City({ 'id': 2, 'name': 'Gold Coast' }), new City({ 'id': 3, 'name': 'Sydney' }),
      new City({ 'id': 4, 'name': 'Brisbane' }), new City({ 'id': 5, 'name': 'Gold Coasta' }), new City({ 'id': 6, 'name': 'Sydney' }),
      new City({ 'id': 7, 'name': 'Brisbane' }), new City({ 'id': 8, 'name': 'Gold Coast' }), new City({ 'id': 9, 'name': 'Sydney' }),
      new City({ 'id': 10, 'name': 'Brisbane' }), new City({ 'id': 11, 'name': 'Gold Coast' }), new City({ 'id': 12, 'name': 'Sydney' })]
    this.currentCity2 = new City(this.cities[2]);        

    this.heroForm = this.fb.group({
      cityControl: [this.currentCity.id, [Validators.required]],
      cityControl2: [this.currentCity2.id, [Validators.required]]
    });            
  }

  private filterCities(value: any): City[] {
      let filter = value ? typeof value == "string" ? value : this.cities.find(c => c.id == value).name  : "";
      return this.cities.filter(city => new RegExp(`${filter}`, 'gi').test(city.name)); 
  }

  private openPanel() : void {
    this.completers.toArray()[0].openPanel(); 
  }

  private cityCompleteDisplay(city : number) : string {
    return city ? this.cities.find(c => c.id == city).name : null;    
  }

  private onCitySelect(city : City, event : MdOptionSelectionChange) : void {
    if (event.source.selected) {
      this.heroForm.get('cityControl').setValue(city.id);
      this.heroForm.get('cityControl').markAsDirty();
    }
  }

  private cityCompleteBlur() : void {
    this.currentCity.id = this.heroForm.get('cityControl').value ? this.heroForm.get('cityControl').value : this.currentCity.id;
  }

  private openPanel2() : void {
    this.completers.toArray()[1].openPanel(); 
  }

  private filterCities2(value: any): City[] {
      let filter = value ? typeof value == "string" ? value : this.cities2.find(c => c.id == value).name  : "";
      return this.cities2.filter(city => new RegExp(`${filter}`, 'gi').test(city.name)); 
  }

  private cityCompleteDisplay2(city : number) : string {
    return city ? this.cities2.find(c => c.id == city).name : null;    
  }

  private onCitySelect2(city : City, event : MdOptionSelectionChange) : void {
    if (event.source.selected) {
      this.heroForm.get('cityControl2').setValue(city.id);
      this.heroForm.get('cityControl2').markAsDirty();
    }
  }

  private cityCompleteBlur2() : void {
    this.currentCity2.id = this.heroForm.get('cityControl2').value ? this.heroForm.get('cityControl2').value : this.currentCity2.id;
  }
}

