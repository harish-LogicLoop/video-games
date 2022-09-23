import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeListComponent } from "./home-list/home-list.component";
import { GameCardComponent } from "./game-card/game-card.component";
import { FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [HomeListComponent, GameCardComponent],
  imports: [CommonModule, FormsModule, NgxSpinnerModule]
})
export class HomeModule {}
