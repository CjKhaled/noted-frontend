import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotesService } from '../../services/notes.service';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './note-dialog.component.html',
  styleUrl: './note-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDialogComponent implements OnInit {
  noteForm!: FormGroup;
  private fb = inject(FormBuilder)
  private dialogRef = inject(MatDialogRef<NoteDialogComponent>) 
  data = inject(MAT_DIALOG_DATA) as { groupId: string }
  isSubmitting = false;
  notesService = inject(NotesService)

  ngOnInit() {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      groupId: [this.data.groupId]
    });
  }

  submitForm() {
    if (this.noteForm.valid && !this.isSubmitting) {
      this.isSubmitting = true
      this.dialogRef.close(this.noteForm.value);
      this.notesService.createNewNote(this.noteForm.value.title, this.noteForm.value.content, this.data.groupId).pipe(
        finalize(() => this.isSubmitting = false),
        catchError((err) => {
          console.log(err)
          throw err
        })
      ).subscribe((response) => {
        this.dialogRef.close(response)
      })
    }
  }
}
