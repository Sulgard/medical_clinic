import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FullCalendarModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{
  @Input() events: any[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    editable: true,
    events: [],
    dateClick: this.handleDateClick.bind(this),
  };


  constructor(){}

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    // Sprawdzamy, czy zmienione zostały dane o wydarzeniach
    if (changes['events']) {
      this.updateCalendarEvents();
    }
  }

  private updateCalendarEvents(): void {
    // Tutaj aktualizujemy kalendarz na podstawie otrzymanych danych
    this.calendarOptions.events = this.events;  // Przypisujemy nowe wydarzenia
  }

  handleDateClick(arg: any) {
    alert(`Date clicked: ${arg.dateStr}`);
  }

}
