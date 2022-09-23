import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ContactService } from "../contact.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.createContactForm();
  }

  createContactForm() {
    this.contactForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      message: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.postContactForm(this.contactForm.value).subscribe({
        next: response => {
          console.log(response);
        },
        error: error => {
          console.log(error);
          this.toastr.error(error.message);
        }
      });
    }
  }
}
