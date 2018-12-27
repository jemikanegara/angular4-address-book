import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AddressBookService } from "../../address-book.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-new",
  templateUrl: "./add-new.component.html",
  styleUrls: ["./add-new.component.css"]
})
export class AddNewComponent implements OnInit {
  @Input() singleItemPost = {
    id: "",
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: { lat: "", lng: "" }
    },
    phone: "",
    website: "",
    company: { name: "", catchPhrase: "", bs: "" }
  };

  constructor(
    private addressBookService: AddressBookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  postAddressBook() {
    this.addressBookService
      .postAddressBook(JSON.stringify(this.singleItemPost))
      .subscribe(res => {
        this.showAddressBook.emit();
        console.log(res);
      });
  }

  @Output() showAddressBook = new EventEmitter<any>();

  onSubmit(formValue) {
    if (this.route.snapshot.url.toString().includes(`edit`)) {
      this.updateAddressBook();
    } else {
      this.postAddressBook();
    }
  }

  updateAddressBook() {
    this.addressBookService
      .updateAddressBook(
        JSON.stringify(this.singleItemPost),
        this.singleItemPost.id
      )
      .subscribe(res => {
        this.router.navigate([""]);
      });
  }

  ngOnInit() {
    if (this.route.snapshot.url.toString().includes(`edit`)) {
      this.route.data.subscribe(
        data => (this.singleItemPost = JSON.parse(JSON.stringify(data.edit)))
      );
    }
  }
}
