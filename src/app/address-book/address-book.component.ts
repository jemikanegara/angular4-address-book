import { Component, OnInit, OnChanges } from "@angular/core";
import { AddressBookService } from "../address-book.service";

@Component({
  selector: "app-address-book",
  templateUrl: "./address-book.component.html",
  styleUrls: ["./address-book.component.css"]
})
export class AddressBookComponent implements OnInit {
  addressBook: any[] = [];

  constructor(private addressBookService: AddressBookService) {}

  showAddressBook() {
    this.addressBookService.getAddressBook().subscribe(res => {
      console.log(res);
      if (res !== null) {
        let getAddressBooks = [];
        for (let arr in res) {
          const newArr = Object.assign({}, res[arr], { id: arr });
          getAddressBooks.push(newArr);
        }
        this.addressBook = getAddressBooks;
      } else {
        this.addressBook = [];
      }
    });
  }

  // post() {
  //   this.addressBookService
  //     .postAddressBook(this.addressBook)
  //     .subscribe(res => console.log(res));
  // }

  ngOnInit() {
    this.showAddressBook();
  }
}
