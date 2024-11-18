import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
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
import { GroupsService } from '../../services/groups.service';
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
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
  groupForm!: FormGroup;
  isSubmitting = false;
  private fb = inject(FormBuilder)
  private dialogRef = inject(MatDialogRef<DialogComponent>)
  groupsService = inject(GroupsService)

  ngOnInit() {
    this.groupForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.groupForm.valid && !this.isSubmitting) {
      this.isSubmitting = true
      this.dialogRef.close(this.groupForm.value);
      this.groupsService.createNewGroup(this.groupForm.value.name).pipe(
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
