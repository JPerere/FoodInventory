import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import { FoodItem } from './food-item';
import { JsonPipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { iif } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent  implements OnInit{
  title = 'food-diary';
  newItemForm: FormGroup;
  newItem = new FoodItem();
  firstName = new FormControl('',Validators.required);
  expirationDate = new FormControl('',[Validators.required, Validators.pattern('(^\\d{4}-\\d{1,2}-\\d{1,2}$)|(^\\d{1,2}\/\\d{1,2}\/\\d{4}$)')]);
  foodItems: FoodItem[];
  deletedItem: FoodItem;

  ngOnInit(): void{
    this.newItemForm = new FormGroup({
      name: this.firstName,
      expirationDate: this.expirationDate
    });
    this.firstName.valueChanges.subscribe(value => this.nameMessage = this.setMessage(this.firstName,this.nameValidationMessages));
    this.expirationDate.valueChanges.subscribe(value => {
      
      this.expirationDateMessage = this.setMessage(this.expirationDate,this.expirationValidationMessages);
    });
  }
  nameMessage: string;
  private nameValidationMessages = {
    required: "Food name is required"
    };
    expirationDateMessage: string;
    private expirationValidationMessages = {
      required: "Expiration date is required",
      pattern: "Please enter a valid expiration date"
    };

  setMessage(c: AbstractControl, errorsObject: any): string {
    if((c.dirty || c.touched) && c.errors){
      return Object.keys(c.errors).map(key => errorsObject[key]).join(' ');
    }
    return "";
  }

  delete(foodItem){
    console.log("deleting...");
    console.log(foodItem);
    this.deletedItem = foodItem;
    this.foodItems = this.foodItems.filter(obj => obj !== foodItem);
  }
  undoDelete(){
    this.foodItems.push(this.deletedItem);
    this.foodItems = this.foodItems.sort(
      function(a,b){ if(a.CreatedDate < b.CreatedDate){
        return -1;
      }else{
        return 1;
      }
    });
    this.deletedItem = null;
  }
}
