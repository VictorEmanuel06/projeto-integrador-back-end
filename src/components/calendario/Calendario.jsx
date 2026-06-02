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

  const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro"
];

const dias = [
  "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"
];

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
        formats={{
          monthHeaderFormat: (date) =>
            `${meses[date.getMonth()]} ${date.getFullYear()}`,

          weekdayFormat: (date) =>
            dias[date.getDay()],
        }}
      />
    </div>
  );
};

export default Calendario;