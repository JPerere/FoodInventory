import { Injectable } from '@angular/core';
import { FoodItem } from './food-item';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {
  UpdateFoodItem(newItem: FoodItem) {
    this.DeleteItem(newItem);
    this.SaveFoodItem(newItem);
  }
  getSavedFoodItem(ID: number): FoodItem {
    console.log("finding item with id" + ID);
    let foodItemArray = this.GetFoodItems();
  console.log(foodItemArray);
    let foodItem:FoodItem = null;
    foodItemArray.forEach((element, index) => {
      console.log(element);
      if(ID == element.ID){
        foodItem = element;
      }
    });
    return foodItem;
  }
  DeleteItem(foodItem: FoodItem) {
    let foodItemArray = this.getLocalFoodItems();
    let indexToDelete:number = -1;
    foodItemArray.forEach((element, index) => {
      if(foodItem.ID == element.ID){
        indexToDelete = index;
      }
    });
    if(indexToDelete >= 0){
      foodItemArray.splice(indexToDelete,1);
      this.saveToLocalStorage(foodItemArray);
    }
  }

  constructor() { }

  SaveFoodItem(item:FoodItem){
    if(!item.ID || item.ID === 0){
      item.ID = this.getNewFoodItemID();
    }
    if(localStorage.getItem("foodItems") === null)
    {
     
      let foodItemArray = new Array<FoodItem>();
      foodItemArray.push(item);
      this.saveToLocalStorage(foodItemArray);
    }else{
      let foodItemArray = this.getLocalFoodItems();
      foodItemArray.push(item);
      this.saveToLocalStorage(foodItemArray);
    }
  }
  getNewFoodItemID():number {
    console.log("getting new id:");
    let savedFoodItems = this.GetFoodItems();
    let maxid:number = 0;

    savedFoodItems.map(function(obj){     
        if (obj.ID > maxid) maxid = obj.ID;    
    });
    maxid = maxid + 1;
    console.log(maxid);
    return maxid;
  }
  private saveToLocalStorage(foodItemArray: FoodItem[]) {
    let arrayString = JSON.stringify(foodItemArray);
    localStorage.setItem("foodItems", arrayString);
  }

  GetFoodItems():Array<FoodItem>{
    if(localStorage.getItem("foodItems") === null)
    {
      return [];
    }else{
      return this.getLocalFoodItems();
    }
  }

  private getLocalFoodItems(): FoodItem[] {
    return JSON.parse(localStorage.getItem("foodItems"));
  }
}
