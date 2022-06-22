import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useMemo, useState } from 'react'
import { 
    useTable, 
    useSortBy, 
    useRowSelect
 } from 'react-table'
import { Table } from 'reactstrap'
import Checkbox from '../Forms/Checkbox'

const EditableTable = ({data, column}) => {

    const columns = useMemo(() => column, [])
    const datas = useMemo(() => data, [])

    // const {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     rows,
    //     prepareRow,
    //     selectedFlatRows,
    // } = useTable({
    //     columns,
    //     data: datas,
    //     initialState:{
    //         hiddenColumns: ['id']
    //     }
    // },
    // useSortBy,
    // useRowSelect,
    // hooks => {hooks.visibleColumns.push(columns => {
    //     return [
    //         {
    //             id: 'selection',
    //             Header: ({getToggleAllRowsSelectedProps}) => (
    //                 <Checkbox {...getToggleAllRowsSelectedProps()} />
    //             ),
    //             Cell: ({row}) => (
    //                 <Checkbox {...row.getToggleRowSelectedProps()} />
    //             )
    //         },
    //         ...columns
    //     ]
    // })}
    // )

    const [dataRows, setData] = useState(data);
    const [skipPageReset, setSkipPageReset] = useState(false);

    // Editable cell code
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true);
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    };
                }
                return row;
            })
        );
    };

    // Create an editable cell renderer
    const EditableCell = ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData, // This is a custom function that we supplied to our table instance
    }) => {
        // We need to keep and update the state of the cell normally
        const [value, setValue] = useState(initialValue);


        const onChange = e => {
            setValue(e.target.value);
        };

        // We'll only update the external data when the input is blurred
        const onBlur = () => {
            updateMyData(index, id, value);
        };

        // If the initialValue is changed external, sync it up with our state
        useEffect(() => {
            setValue(initialValue);
        }, [initialValue]);

        // Check to make sure not all columns are editable
        if (id !== "col1") {
            return <input value={value} onChange={onChange} onBlur={onBlur} />;
        }
        return value;
    };

    // Set our editable cell renderer as the default Cell renderer
    const defaultColumn = {
        Cell: EditableCell,
    };


    useEffect(() => {
        setSkipPageReset(false);
        console.log(dataRows);
    }, [dataRows]);

    const tableInstance = useTable({ columns, data, defaultColumn, autoResetPage: !skipPageReset, updateMyData });
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

  return (
    <Table stickyHeader {...getTableProps()}>
    <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>
                        {column.render('Header')}
                    </th>
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
                        return (
                            <td {...cell.getCellProps()}>
                                {cell.render('Cell')}
                            </td>
                        );
                    })}
                </tr>
            );
        })}
    </tbody>
</Table>
  )
}

export default EditableTable