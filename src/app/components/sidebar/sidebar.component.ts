import {
  Component,
  inject,
  ChangeDetectionStrategy,
  OnInit,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GroupsService } from '../../services/groups.service';
import { NoteGroup } from '../../models/note.type';
import { catchError } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from '../dialog/dialog.component';
import { UpdateGroupDialogComponent } from '../update-group-dialog/update-group-dialog.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  groupsService = inject(GroupsService);
  groupItems = signal(<Array<NoteGroup>>[]);
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogReference = this.dialog.open(DialogComponent);
    dialogReference.afterClosed().subscribe(result => {
      if (result) {
        this.loadGroups()
      }
    })
  }

  editGroup(group: NoteGroup) {
    const dialogRef = this.dialog.open(UpdateGroupDialogComponent, {
      data: {groupId: group.id, groupName: group.name}
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadGroups()
      }
    })
  }

  deleteGroup(group: NoteGroup) {
    this.groupsService.deleteGroup(group.id).pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    ).subscribe(result => {
      if (result) {
        this.loadGroups()
      }
    })
  }

  ngOnInit(): void {
    this.loadGroups()
  }

  private loadGroups() {
    this.groupsService
      .getGroups()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((response) => {
        this.groupItems.set(response.groups);
      });
  }
}
