import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AppointmentDTO } from '../../api/rest-api';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppointmentDetailsDialogComponent } from '../../doctor/appointment-details-dialog/appointment-details-dialog.component';
import { PatientService } from '../../patient/patient.service';
import { MatDialog } from '@angular/material/dialog';

interface CalendarEvent {
  id: string,
  title: string;
  start: string;
  end: string;
  description?: string;
  status: string;
}

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FullCalendarModule
],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent implements OnInit {
  appointments: AppointmentDTO[] | null = null;
  appointments2: any[] = [];
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
    private authService: AuthService,
    private router: Router,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private dialog: MatDialog

  ){
  }

  ngOnInit():void {
    this.viewUpcomingAppointments();
  }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['events']) {
        this.updateCalendarEvents();
      }
    }

  handleDateClick(arg: any) {
    alert(`Date clicked: ${arg.dateStr}`);
  }

  handleEventClick(arg: any): void {
    const appointmentId = parseInt(arg.event.id, 10);
    this.showAppointmentDetails(appointmentId);
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

  private updateCalendarEvents(): void {
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.calendarEvents
    };
  }
  

  viewUpcomingAppointments(): void {
    const doctorId: number = this.authService.getUserId();
    this.doctorService.listAppointmentsForDocotr(doctorId).subscribe({
      next: (data: AppointmentDTO[]) => {
        this.calendarEvents = data.map(appointment => ({
          id: appointment.appointmentId.toString(),
          title: `${appointment.patientName}`,
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

  bookAppointment():void {

  }

  navigateAppointments():void {
    this.router.navigate(['/doctor/appointment-list']);
  }

  navigatePatients():void {
    this.router.navigate(['/doctor/patient-list']);
  }

  navigateProfile():void {
    this.router.navigate(['/doctor/profile']);
  }

  navigateMedicines():void {
    this.router.navigate(['/doctor/medicine-list']);
  }

  logout():void {
    this.authService.logout();
  }

  manageAppointment(appointmentId: number): void {
    console.log('Manage button clicked for appointment ID:', appointmentId);
    this.router.navigate([`/doctor/manage-appointment/${appointmentId}`]);
  }
}
