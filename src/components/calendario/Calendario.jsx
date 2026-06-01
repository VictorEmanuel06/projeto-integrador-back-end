import { useState } from 'react';
import moment from 'moment';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import './Calendario.css';

const DragAndDropCalendar = withDragAndDrop.default(Calendar);
const localizer = momentLocalizer(moment);

const Calendario = () => {


  const [date, setDate] = useState(new Date());
  const [view, setView] = useState('month');

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Evento teste',
      start: new Date(2026, 5, 2, 10, 0),
      end: new Date(2026, 5, 2, 10, 0),
    },
  ]);

  const moveEvent = ({ event, start, end }) => {

    const updatedEvents = events.map((item) =>
      item.id === event.id
      ? { ...item, start, end}
      : item
    );
    
    setEvents(updatedEvents);
  };



  return (
      <DragAndDropCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      selectable
      resizable
      onEventDrop={moveEvent}
      date={date}
      view={view}
      onNavigate={setDate}
      onView={setView}
      style={{ height: 500 }}
    />
  )
}

export default Calendario;