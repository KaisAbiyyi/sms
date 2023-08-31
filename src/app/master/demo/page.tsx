"use client"
import { useState } from "react";

interface DataItem {
    id: number;
    name: string;
    address: string;
    email: string;
}

const columnMappings: { [key: string]: keyof DataItem } = {
    name: 'name',
    address: 'address',
    email: 'email'
};

export default function DemoPage() {
    const initialData: DataItem[] = [
        {
            id: 1,
            name: "John Doe",
            address: "123 Main St, Cityville, USA",
            email: "john.doe@example.com"
        },
        {
            id: 2,
            name: "Jane Smith",
            address: "456 Elm Ave, Townsville, USA",
            email: "jane.smith@example.com"
        },
        {
            id: 3,
            name: "Michael Johnson",
            address: "789 Oak Rd, Villageland, USA",
            email: "michael.johnson@example.com"
        },
        {
            id: 4,
            name: "Emily Williams",
            address: "101 Pine Lane, Hamletown, USA",
            email: "emily.williams@example.com"
        },
        {
            id: 5,
            name: "David Brown",
            address: "222 Maple Street, Riverside, USA",
            email: "david.brown@example.com"
        },
        {
            id: 6,
            name: "Olivia Taylor",
            address: "333 Cedar Ave, Lakeside, USA",
            email: "olivia.taylor@example.com"
        },
        {
            id: 7,
            name: "William Wilson",
            address: "444 Birch Road, Mountainside, USA",
            email: "william.wilson@example.com"
        },
        {
            id: 8,
            name: "Sophia Martinez",
            address: "555 Redwood Drive, Valleyview, USA",
            email: "sophia.martinez@example.com"
        },
        {
            id: 9,
            name: "James Anderson",
            address: "666 Elm Street, Meadowville, USA",
            email: "james.anderson@example.com"
        },
        {
            id: 10,
            name: "Ava Rodriguez",
            address: "777 Oak Avenue, Hilltop, USA",
            email: "ava.rodriguez@example.com"
        }
    ];

    const [data, setData] = useState<DataItem[]>(initialData);
    const [sortAscending, setSortAscending] = useState<boolean>(true);
    const [columnName, setColumnName] = useState<keyof DataItem>('name'); // Default sorting column
    const [searchValue, setSearchValue] = useState<string>(''); // Search input value
    const [editableCell, setEditableCell] = useState<{ rowId: number; column: keyof DataItem } | null>(null);
    const [editedValue, setEditedValue] = useState<string>(''); // Edited cell value

    const toggleSort = (column: keyof DataItem) => {
        if (columnName === column) {
            setSortAscending(!sortAscending);
        } else {
            setColumnName(column);
            setSortAscending(true);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleCellDoubleClick = (rowId: number, column: keyof DataItem, value: string) => {
        setEditableCell({ rowId, column });
        setEditedValue(value);
    };

    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedValue(event.target.value);
    };

    const handleSaveEdit = () => {
        if (editableCell) {
            const { rowId, column } = editableCell;
            const updatedData = data.map((item) =>
                item.id === rowId ? { ...item, [column]: editedValue } : item
            );
            setData(updatedData);
            setEditableCell(null);
            console.log(`Row: ${rowId}, Column: ${column}, Value: ${editedValue}`);
        }
    };

    const handleCellClick = (rowId: number, column: keyof DataItem, value: string) => {
        // Check if the clicked cell is different from the editable cell
        if (!(editableCell && editableCell.rowId === rowId && editableCell.column === columnMappings[column])) {
            // Save the changes and exit edit mode if an editable cell is currently being edited
            if (editableCell) {
                handleSaveEdit();
                setEditableCell(null);
            }
        }
    };

    const filteredData = data.filter(item =>
        Object.values(item).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())
        )
    );

    const sortedData = filteredData
        .slice()
        .sort((a, b) => {
            const property = columnMappings[columnName];
            const aValue = a[property] as string;
            const bValue = b[property] as string;

            if (sortAscending) {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        });

    const numColumns = Object.keys(columnMappings).length;

    return (
        <div className="p-4 rounded-lg shadow-sm bg-slate-50">
            <div className="flex justify-end">
                <input
                    type="text"
                    id="searchTable"
                    placeholder="Search"
                    className="h-8 px-2 bg-white border-none rounded-lg shadow outline-none w-96"
                    name="searchTable"
                    value={searchValue}
                    onChange={handleSearchChange}
                />
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        {/* Render column headers */}
                        {Object.keys(columnMappings).map((column) => (
                            <th key={column} className="p-2 border text-start bg-slate-100">
                                <button
                                    className="px-2 py-1 capitalize duration-200 ease-in rounded-lg text-slate-500 hover:bg-slate-200"
                                    onClick={() => toggleSort(columnMappings[column])}
                                >
                                    {columnMappings[column]} {columnName === columnMappings[column] && sortAscending ? '▲' : '▼'}
                                </button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Render data rows */}
                    {sortedData.length !== 0 ? (
                        sortedData.map((item) => (
                            <tr key={item.id}>
                                {Object.keys(columnMappings).map((column) => (
                                    <td
                                        key={column}
                                        className={`border hover:bg-slate-100 h-14 `}
                                        onDoubleClick={() => handleCellDoubleClick(item.id, columnMappings[column], item[columnMappings[column]] as string)}
                                        onClick={() => handleCellClick(item.id, columnMappings[column], item[columnMappings[column]] as string)}
                                    >
                                        {editableCell && editableCell.rowId === item.id && editableCell.column === columnMappings[column] ? (
                                            <input
                                                type="text"
                                                value={editedValue}
                                                onChange={handleEditChange}
                                                onBlur={handleSaveEdit}
                                                className="w-full h-full px-4 bg-white rounded-lg shadow-lg outline-none"
                                            />
                                        ) : (
                                            <div className="px-4">{item[columnMappings[column]]}</div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={numColumns} className="p-4 text-center border">
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};