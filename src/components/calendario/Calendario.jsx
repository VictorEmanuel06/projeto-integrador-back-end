import React, { useState } from 'react';
import moment from 'moment';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import './components/Components-Calendario-css.css';


const DragAndDropCalendar = withDragAndDrop.default(Calendar);
const localizer = momentLocalizer(moment);


const Calendario = () => {

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Evento teste',
      start: new Date(2026, 4, 25, 10, 0),
      end: new Date(2026, 4, 25, 10, 0),
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
    <div style={{ height: '100vh', padding: '20px' }}>
      <DragAndDropCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      onEventDrop={moveEvent}
      selectable
      resizable
      />
    </div>
  )
}

export default Calendario;