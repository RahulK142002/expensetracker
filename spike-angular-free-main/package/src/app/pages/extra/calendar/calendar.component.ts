import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class AppCalendarComponent implements OnInit {


  ngOnInit(): void {
  }
  calendarOptions: any;

  constructor() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [
        { title: 'Event 1', date: '2024-08-10' },
        { title: 'Event 2', date: '2024-08-12' },
        { title: 'Event 3', date: '2024-08-12' },
        { title: 'Event 5', date: '2024-08-12' },
        { title: 'Event 4', date: '2024-08-16' },
        { title: 'Event 6', date: '2024-07-12' },
        { title: 'Event 7', date: '2024-09-10' },
        { title: 'Event 8', date: '2024-10-17' }
      ],
      // dateClick: this.handleDateClick.bind(this),
      // eventClick: this.handleEventClick.bind(this)
    };
  }

  // handleDateClick(arg: any) {
  //   alert(`Date: ${arg.dateStr}`);
  // }

  // handleEventClick(arg: any) {
  //   alert(`Event: ${arg.event.title}`);
  // }

}
