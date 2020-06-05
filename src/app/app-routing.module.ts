import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFoodItemComponent } from './add-food-item/add-food-item.component';
import { ItemGridComponent } from './item-grid/item-grid.component';


const routes: Routes = [
  { path: '', redirectTo: 'grid', pathMatch: 'full' },
  {path: 'grid', component: ItemGridComponent},
  {path:'newitem', component:AddFoodItemComponent},
  { path: 'newitem/:id', component: AddFoodItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
