import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { ptBR } from "date-fns/locale";

const Calendario = () => {
  const [data, setData] = useState(new Date());

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ptBR}
    >
      <DateCalendar
        value={data}
        onChange={(newDate) => setData(newDate)}
      />
    </LocalizationProvider>
  );
};

export default Calendario;