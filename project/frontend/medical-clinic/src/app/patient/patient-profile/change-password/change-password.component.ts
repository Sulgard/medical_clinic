import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { MaterialModule } from '../../../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordChangeRequestDTO } from '../../../api/rest-api';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  password: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
  ){}

  onSubmit() {
    if ( this.newPassword !== this.confirmPassword) {
      alert('Password do not match');
      return;
    }

    const payload: PasswordChangeRequestDTO = {
      password: this.password,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    };

    const userId = this.authService.getUserId();

    this.authService.changeUserPassword(userId, payload).subscribe(
      (response) => {
        alert('Password changed successfully.');
      },
      (error) => {
        alert('Failed to change password: ' + error.error.message);
      }
    )
  }
}
