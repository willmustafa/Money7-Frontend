import React from 'react'
import { Table as TableBs } from 'reactstrap'
import {useTable} from "react-table"
import {currency_formatter} from '../../../../utils/ValueUtils'

const Table = ({data, columns}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
      } = useTable({
        columns,
        data: data.map(el => {return {...(({valor, ...o}) => o)(el), valor: currency_formatter(el.valor)}})
      });

  return (
    <TableBs {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </TableBs>
  )
}

export default Table