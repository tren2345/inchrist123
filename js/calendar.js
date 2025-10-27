// js/calendar.js
export function initCalendar() {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: 'https://www.googleapis.com/calendar/v3/calendars/your_calendar_id/events?key=your_api_key',
    // Fallback events if API fails
    events: [
      { title: 'Sunday Worship Service', start: '2025-11-02T11:00:00', end: '2025-11-02T12:00:00' },
      { title: 'Monday Manna', start: '2025-11-03T19:15:00', end: '2025-11-03T20:15:00' },
      { title: 'Bible Study', start: '2025-11-06T19:00:00', end: '2025-11-06T20:00:00' }
    ]
  });
  calendar.render();
}
