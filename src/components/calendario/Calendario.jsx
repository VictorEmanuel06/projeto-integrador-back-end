import { useState } from "react";
import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");
console.log(moment.locale());

import { Calendar, momentLocalizer } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

import "./Calendario.css";

moment.locale("pt-br");

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-wrapper">
      <Calendar
        localizer={localizer}
        culture="pt-BR"
        selectable
        date={date}
        view="month"
        views={["month"]}
        onNavigate={setDate}
        messages={{
          today: "Hoje",
          previous: "Anterior",
          next: "Próximo",
        }}
      />
    </div>
  );
};

export default Calendario;