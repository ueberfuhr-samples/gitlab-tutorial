import {Component, inject, input, output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {filter} from "rxjs";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-delete-button',
  imports: [
    MatIcon,
    MatButton
  ],
  templateUrl: './delete-button.component.html'
})
export class DeleteButtonComponent {
  public withConfirm = input<boolean>(false);
  public confirmTitle = input<string>('Sind Sie sich sicher?');
  public confirmMessage = input<string>('Soll die Aktion wirklich ausgeführt werden?');

  public deleteButtonClicked = output();

  private readonly dialog = inject(MatDialog);

  protected onButtonClicked(): void {
    if (this.withConfirm()) {
      const dialogRef = this.openDialog();
      dialogRef.afterClosed()
        .pipe(
          filter(result => result),
        )
        .subscribe(() => {
          this.deleteButtonClicked.emit();
        });
    } else {
      this.deleteButtonClicked.emit();
    }
  }

  private openDialog(): MatDialogRef<unknown> {
    return this.dialog.open(DialogComponent, {
      data: {
        title: this.confirmTitle(),
        message: this.confirmMessage(),
      }
    });
  }
}
