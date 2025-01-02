import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { PatientService } from './../patient.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentDTO, AppointmentForListDTO, BillingDTO, BillingForListDTO, PatientInfoDTO } from '../../api/rest-api';
import { AppointmentDetailsDialogComponent } from '../appointment-details-dialog/appointment-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BillingDetailsDialogComponent } from '../billing-details-dialog/billing-details-dialog.component';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NavbarComponent } from "../navbar/navbar.component";

interface CalendarEvent {
  id: string,
  title: string;
  start: string;
  end: string;
  description?: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FullCalendarModule,
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  patientInfo: PatientInfoDTO | null = null;
  appointments: AppointmentDTO[] | null = null;
  billings: BillingForListDTO[] | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  calendarEvents: CalendarEvent[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    selectable: true,
    editable: true,
    themeSystem: 'bootstrap5',

    validRange: {
      start: '2025-01-01',
      end: '2025-12-31'
    },
    hiddenDays: [0, 6],
    slotMinTime: '08:00:00',
    slotMaxTime: '18:00:00',
    events: [],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };
  

  constructor(
    private patientService: PatientService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.viewPatientInfo();
    this.viewUpcomingAppointments();
    this.viewPendingCharges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events']) {
      this.updateCalendarEvents();
    }
  }

  handleDateClick(arg: any) {
    alert(`Date clicked: ${arg.dateStr}`);
  }

  viewPatientInfo(): any {
    const patientId: number = this.authService.getUserId();
    this.patientService.getPatientInfo(patientId).subscribe({
      next: (data: PatientInfoDTO) => {
        this.patientInfo = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching patient info', err);
        this.errorMessage = 'Failed to load patient information';
      this.isLoading = false;
      },
    });
  }

  viewUpcomingAppointments(): void {
    const patientId: number = this.authService.getUserId();
    this.patientService.listAppointmentsForPatient(patientId).subscribe({
      next: (data: AppointmentDTO[]) => {
        this.calendarEvents = data.map(appointment => ({
          id: appointment.appointmentId.toString(),
          title: `${appointment.appointmentType}`,
          start: this.combineDateAndTime(appointment.appointmentDate, appointment.appointmentTime),
          end: this.calculateEndTime(appointment.appointmentDate, appointment.appointmentTime),
          description: appointment.visitDescription,
          status: appointment.status,
          color: this.getEventColor(appointment.status)
        }));
        this.appointments = data;

        this.calendarOptions = {
          ...this.calendarOptions,
          events: this.calendarEvents
        };

        console.log("APPOINTMENTS: ", this.appointments);
        console.log("EVENTS: ", this.calendarEvents)

      },
      error: (err: any) => {
        console.error('Error fetching appointments:', err);
      }
    });
  }

  getEventColor(status: string): string {
    switch (status) {
      case 'CANCELLED':
        return 'red';
      case 'PENDING':
        return 'orange';
      case 'COMPLETED':
        return 'green';
      default:
        return 'blue';
    }
  }

  handleEventClick(arg: any): void {
    const appointmentId = parseInt(arg.event.id, 10);
    this.showAppointmentDetails(appointmentId);
  }

  private updateCalendarEvents(): void {
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.calendarEvents
    };
  }

  combineDateAndTime(date: string, time: string): string {
    const appointmentDate = new Date(date);
    const appointmentTime = time.split(':');
    appointmentDate.setHours(parseInt(appointmentTime[0]));
    appointmentDate.setMinutes(parseInt(appointmentTime[1]));
    return appointmentDate.toISOString();
  }

  calculateEndTime(date: string, time: string): string {
    const endTime = new Date(date);
    const appointmentTime = time.split(':');
    endTime.setHours(parseInt(appointmentTime[0]));
    endTime.setMinutes(parseInt(appointmentTime[1]) + 60);
    return endTime.toISOString();
  }

  viewPendingCharges(): void {
    const patientId: number = this.authService.getUserId();
    this.patientService.getPendingCharges(patientId).subscribe({
      next: (data: BillingForListDTO[]) => {
        this.billings = data;
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
      }
    });
  }

  showAppointmentDetails(id: number) {
    console.log("ID: ", id);
      this.patientService.getAppointmentDetails(id).subscribe((details: AppointmentDTO) => {
        this.dialog.open(AppointmentDetailsDialogComponent, {
          data: details,
          width: '400px',
        });
      });
  }

  showBillingDetails(id: number) {
    console.log("ID: ", id);
    this.patientService.getBillingDetails(id).subscribe((details: BillingDTO) => {
      this.dialog.open(BillingDetailsDialogComponent, {
        data: details,
        width: '400px',
      });
    });
  }

  bookAppointment(): void {
    this.router.navigate(['/patient/book-appointment']);
  }

  viewDoctors(): void {
    this.router.navigate(['/patient/doctors-list']);
  }

  viewBillings(): void {
    this.router.navigate(['/patient/billing-list']);
  }

  viewAppointments(): void {
    this.router.navigate(['/patient/patient-appointments']);
  }

  viewProfile(): void {
    this.router.navigate(['/patient/patient-profile']);
  }


  logout(): void {
    this.authService.logout();
  }

}
