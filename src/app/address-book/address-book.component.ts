import { Component, OnInit, OnChanges } from "@angular/core";
import { AddressBookService } from "../address-book.service";

@Component({
  selector: "app-address-book",
  templateUrl: "./address-book.component.html",
  styleUrls: ["./address-book.component.css"]
})
export class AddressBookComponent implements OnInit {
  addressBook: any[] = [];
  filteredBook: any[] = [];

  search: string = "";

  constructor(private addressBookService: AddressBookService) {}

  showAddressBook() {
    this.addressBookService.getAddressBook().subscribe(res => {
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

  onSearch(searchPhrase) {
    const copy = this.addressBook.slice();
    const filtered = copy.filter(
      arr =>
        arr.name.includes(searchPhrase) ||
        arr.email.includes(searchPhrase) ||
        arr.phone.includes(searchPhrase) ||
        arr.username.includes(searchPhrase) ||
        arr.website.includes(searchPhrase) ||
        arr.address.city.includes(searchPhrase) ||
        arr.address.street.includes(searchPhrase) ||
        arr.address.suite.includes(searchPhrase) ||
        arr.address.zipcode.includes(searchPhrase) ||
        arr.company.name.includes(searchPhrase) ||
        arr.company.bs.includes(searchPhrase) ||
        arr.company.catchPhrase.includes(searchPhrase)
    );
    console.log(filtered);
    this.filteredBook = filtered;
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
