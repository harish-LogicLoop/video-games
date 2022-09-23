import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactComponent } from "./contact/contact.component";
import { ContactRoutingModule } from "./contact-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ContactComponent, ContactRoutingModule, ReactiveFormsModule]
})
export class ContactModule {}
