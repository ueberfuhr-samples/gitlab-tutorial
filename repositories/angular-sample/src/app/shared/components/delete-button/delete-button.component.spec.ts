import {createComponentFactory, Spectator} from '@ngneat/spectator/vitest';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {of} from 'rxjs';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {DeleteButtonComponent} from "@app/shared";

describe(DeleteButtonComponent.name, () => {
  let spectator: Spectator<DeleteButtonComponent>;
  const createComponent = createComponentFactory({
    component: DeleteButtonComponent,
    providers: [MatDialog],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should emit without confirm dialog', () => {
    const dialog = spectator.inject(MatDialog);
    const dialogSpy = vi.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(true),
    } as unknown as MatDialogRef<unknown, unknown>);
    let emitted = false;

    spectator.output('deleteButtonClicked').subscribe(() => (emitted = true));
    spectator.click('button');

    expect(dialogSpy).not.toHaveBeenCalled();
    expect(emitted).toEqual(true);
  });

  it('should emit with confirm dialog', () => {
    const dialog = spectator.inject(MatDialog);
    const dialogSpy = vi.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(true),
    } as unknown as MatDialogRef<unknown, unknown>);
    let emitted = false;

    spectator.setInput('withConfirm', true);
    spectator.output('deleteButtonClicked').subscribe(() => (emitted = true));

    spectator.click('button');

    expect(emitted).toEqual(true);
    expect(dialogSpy).toHaveBeenCalledTimes(1);
  });

  it('should not emit with confirm dialog', () => {
    const dialog = spectator.inject(MatDialog);
    const dialogSpy = vi.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(false),
    } as unknown as MatDialogRef<unknown, unknown>);
    let emitted = false;

    spectator.setInput('withConfirm', true);
    spectator.output('deleteButtonClicked').subscribe(() => (emitted = true));

    spectator.click('button');

    expect(emitted).toEqual(false);
    expect(dialogSpy).toHaveBeenCalledTimes(1);
  });
});
