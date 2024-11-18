import { Component, inject, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Note } from '../../models/note.type';
import { NotesService } from '../../services/notes.service';
import { catchError } from 'rxjs';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import {MatIconModule} from '@angular/material/icon'
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [FormatDatePipe, MatIconModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnChanges {
  groupId = input.required<string>();
  notesService = inject(NotesService)
  noteItems = signal(<Array<Note>>[])
  readonly dialog = inject(MatDialog)

  openDialog() {
    const dialogueReference = this.dialog.open(NoteDialogComponent, {
      data: {groupId: this.groupId()}
    })

    dialogueReference.afterClosed().subscribe(result => {
      if (result) {
        this.loadNotes()
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupId'] && changes['groupId'].currentValue) {
      this.loadNotes()
    }
  }

  private loadNotes() {
    this.notesService.getNotes(this.groupId()).pipe(
      catchError((err) => {
        console.log(err)
        throw err
      })
    ).subscribe((response) => {
      this.noteItems.set(response.notes)
      console.log(response.notes)
    })
  }
}
