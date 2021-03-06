import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BudgetItem } from "src/shared/models/budget-item.model";
import { MatDialog } from "@angular/material";
import { EditItemModalComponent } from "../edit-item-modal/edit-item-modal.component";

@Component({
  selector: "app-budget-item-list",
  templateUrl: "./budget-item-list.component.html",
  styleUrls: ["./budget-item-list.component.scss"]
})
export class BudgetItemListComponent implements OnInit {
  @Input() budgetItems: BudgetItem[];
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  onDeleteButtonClicked(item: BudgetItem) {
    this.delete.emit(item);
  }

  onCardClicked(item: BudgetItem) {
    // show the edit modal
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: "580px",
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //check if result has a value
        if (result) {
          // result is the update budget item
          // replace the item with the update/submitted item from the form
          this.budgetItems[this.budgetItems.indexOf(item)] = result;
        }
      }
    });
  }
}
