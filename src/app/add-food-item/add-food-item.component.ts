import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FoodItem } from '../food-item';
import { FoodItemService } from '../food-item-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-food-item',
  templateUrl: './add-food-item.component.html',
  styleUrls: ['./add-food-item.component.css']
})
export class AddFoodItemComponent implements OnInit {
  newItemForm: FormGroup;
  newItem = new FoodItem();
  firstName = new FormControl('',Validators.required);
  expirationDate = new FormControl('',[Validators.required, Validators.pattern('(^\\d{4}-\\d{1,2}-\\d{1,2}$)|(^\\d{1,2}\/\\d{1,2}\/\\d{4}$)')]);
  foodItems: FoodItem[];
  deletedItem: FoodItem;
  foodItemService: FoodItemService;
  savedID:number;
  private routeSub: Subscription;
  editFoodItem: FoodItem;
  screenType: string;

  constructor(private router: Router, foodService: FoodItemService,
    private route: ActivatedRoute) {
    this.foodItemService = foodService;
    this.router = router;
   }

  
  ngOnInit(): void{
    this.setInitialDate(new Date(), 7);
    this.screenType = "Add";
    this.newItemForm = new FormGroup({
      name: this.firstName,
      expirationDate: this.expirationDate
    });
    this.firstName.valueChanges.subscribe(value => this.nameMessage = this.setMessage(this.firstName,this.nameValidationMessages));
    this.expirationDate.valueChanges.subscribe(value => {
      
      this.expirationDateMessage = this.setMessage(this.expirationDate,this.expirationValidationMessages);
    });
    
    //this.expirationDate.setValue("2020-05-05");
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      let id = params['id'];
      if(id){
        this.savedID = id;
        console.log("loading item...");
        this.editFoodItem  = this.foodItemService.getSavedFoodItem(this.savedID);
        console.log("found item");
        console.log(this.editFoodItem);
        if(this.editFoodItem != null){
          this.screenType = "Edit";
          this.firstName.setValue(this.editFoodItem.Name);
          this.setInitialDate(this.editFoodItem.ExpirationDate, 0);
        }
      }
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

  private setInitialDate(date: Date, offset:number) {
    console.log("setInitialDate");
    console.log(date);
    var today = new Date(date);
    today.setDate(today.getDate() + offset);
    var day =  (today.getDate() + 1).toString();
    var month = (today.getMonth() + 1).toString();
    if (day.length == 1) {
      day = "0" + day;
    }
    if (month.length == 1) {
      month = "0" + month;
    }
    this.expirationDate.setValue(today.getFullYear() + '-' + month + "-" + day);
  }

  setMessage(c: AbstractControl, errorsObject: any): string {
    if((c.dirty || c.touched) && c.errors){
      return Object.keys(c.errors).map(key => errorsObject[key]).join(' ');
    }
    return "";
  }

  save(){
    if(this.newItemForm.valid)
    {
      if(this.editFoodItem){
        console.log(this.newItemForm);
        console.log("Saved:" + JSON.stringify(this.newItemForm.value));
        let newItem = this.editFoodItem;
        newItem.Name = this.newItemForm.get('name').value;
        newItem.ExpirationDate = this.newItemForm.get('expirationDate').value;
        //newItem.CreatedDate = new Date();
        this.foodItemService.UpdateFoodItem(newItem);
        this.resetForm();
        this.router.navigate(['/grid']);
      }else{
        console.log(this.newItemForm);
        console.log("Saved:" + JSON.stringify(this.newItemForm.value));
        let newItem = new FoodItem();
        newItem.Name = this.newItemForm.get('name').value;
        newItem.ExpirationDate = this.newItemForm.get('expirationDate').value;
        newItem.CreatedDate = new Date();
        this.foodItemService.SaveFoodItem(newItem);
        this.resetForm();
        this.router.navigate(['/grid']);
      }
    }
    else{
      console.log("form invalid");
    }
    
  }


  private resetForm() {
    this.firstName.setValue("");
    this.firstName.markAsUntouched();
    this.firstName.markAsPristine();
    this.nameMessage = null;
    this.expirationDate.setValue("");
    this.expirationDateMessage = null;
    this.expirationDate.markAsUntouched();
    this.expirationDate.markAsPristine();
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
