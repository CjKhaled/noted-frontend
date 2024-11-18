import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GroupsService } from '../../services/groups.service';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-update-group-dialog',
  standalone: true,
  imports: [MatButtonModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './update-group-dialog.component.html',
  styleUrl: './update-group-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateGroupDialogComponent implements OnInit {
  updateGroupForm!: FormGroup;
  isSubmitting = false;
  private fb = inject(FormBuilder)
  private dialogRef = inject(MatDialogRef<UpdateGroupDialogComponent>)
  groupsService = inject(GroupsService)
  data = inject(MAT_DIALOG_DATA) as { groupId: string, groupName: string }

  ngOnInit() {
    this.updateGroupForm = this.fb.group({
      name: [this.data.groupName, Validators.required]
    });
  }

  submitForm() {
    if (this.updateGroupForm.valid && !this.isSubmitting) {
      this.isSubmitting = true
      this.dialogRef.close(this.updateGroupForm.value);
      this.groupsService.updateGroup(this.updateGroupForm.value.name, this.data.groupId).pipe(
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
