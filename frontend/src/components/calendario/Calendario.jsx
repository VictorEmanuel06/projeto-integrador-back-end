
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { ptBR } from "date-fns/locale";

const Calendario = ({ value, onChange }) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ptBR}
    >
      <DateCalendar
        value={value}
        onChange={onChange}
        disablePast
      />
    </LocalizationProvider>
  );
};

export default Calendario;