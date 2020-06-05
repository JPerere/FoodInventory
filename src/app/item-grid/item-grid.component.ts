import { Component, OnInit } from '@angular/core';
import { FoodItemService } from '../food-item-service.service';
import { FoodItem } from '../food-item';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.css']
})
export class ItemGridComponent implements OnInit {
  foodItems: Array<FoodItem>;
  deletedItem: FoodItem;
  sort: string;
  constructor(private foodService:FoodItemService) {

   }

  ngOnInit() {
    this.loadFoodItems();
    this.setSort('expiration');
  }

  private loadFoodItems() {
    this.foodItems = this.foodService.GetFoodItems();
  }
  setSort(sortType:string){
    this.sort = sortType;
    if(this.sort === "name"){
      this.foodItems.sort(function(a, b){
          var nameA = a.Name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.Name.toUpperCase(); // ignore upper and lowercase
          if(nameA < nameB) { return -1; }
          if(nameA > nameB) { return 1; }
          return 0;
        });
     }
     if(this.sort === "create"){
      this.foodItems.sort(function(a, b){
          if(a.CreatedDate < b.CreatedDate) { return -1; }
          if(a.CreatedDate > b.CreatedDate) { return 1; }
          return 0;
        });
     }
     if(this.sort === "expiration"){
      this.foodItems.sort(function(a, b){
          if(a.ExpirationDate < b.ExpirationDate) { return -1; }
          if(a.ExpirationDate > b.ExpirationDate) { return 1; }
          return 0;
        });
     }
  }
  delete(foodItem){
    console.log("deleting...");
    console.log(foodItem);
    this.deletedItem = foodItem;
    this.foodService.DeleteItem(foodItem);
    this.loadFoodItems();
  }
  undoDelete(){
    //this.foodItems.push(this.deletedItem);
    // this.foodItems = this.foodItems.sort(
    //   function(a,b){ if(a.CreatedDate < b.CreatedDate){
    //     return -1;
    //   }else{
    //     return 1;
    //   }
    // });
    if(this.deletedItem){
      this.foodService.SaveFoodItem(this.deletedItem);
      this.loadFoodItems();
    }
    
    this.deletedItem = null;
  }
}
