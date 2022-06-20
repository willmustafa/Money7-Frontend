import React from 'react'
import Datepicker from "react-datepicker"
import ptBR from 'date-fns/locale/pt-BR';
import './InputDatePicker.css'

import { useDate } from 'context/dateContext';

const InputDatePicker = () => {
  const {date, setDate} = useDate()

    return (
        <Datepicker
        selected={date}
        onChange={(date) => setDate(new Date(date.getFullYear(), date.getMonth()+1, 0))}
        locale={ptBR}
        dateFormat="MMMM"
        showMonthYearPicker
      />
    )
}

export default InputDatePicker