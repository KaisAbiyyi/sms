"use client"

import { Suspense, useEffect, useState } from "react";

interface DataItem {
    id: number;
    name: string;
    address: string;
    email: string;
    birthdate: string;
    hobby: string[];
}

interface ColumnMapping {
    name: keyof DataItem;
    type: "text" | "number" | "date" | "array";
    editable: boolean;
}

function generateRandomBirthdate() {
    const year = Math.floor(Math.random() * (2002 - 1970 + 1)) + 1970;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1; // Assuming all months have 28 days for simplicity
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

function generateRandomHobbies() {
    const hobbies = ["Reading", "Hiking", "Painting", "Traveling", "Photography", "Swimming", "Cooking", "Gardening"];
    const numHobbies = Math.floor(Math.random() * 4) + 1; // Randomly choose 1 to 4 hobbies
    const randomHobbies = [];
    for (let i = 0; i < numHobbies; i++) {
        const randomIndex = Math.floor(Math.random() * hobbies.length);
        randomHobbies.push(hobbies[randomIndex]);
    }
    return randomHobbies;
}


const columnMappings: ColumnMapping[] = [
    { name: 'name', type: 'text', editable: true },
    { name: 'address', type: 'text', editable: true },
    { name: 'email', type: 'text', editable: true },
    { name: 'birthdate', type: 'date', editable: true },
    { name: 'hobby', type: 'array', editable: false }
];


export default function TableUI() {
    const [data, setData] = useState<DataItem[]>([]);
    const [sortAscending, setSortAscending] = useState<boolean>(true);
    const [columnName, setColumnName] = useState<keyof DataItem>('name'); // Default sorting column
    const [searchValue, setSearchValue] = useState<string>(''); // Search input value
    const [editableCell, setEditableCell] = useState<{ rowId: number; column: keyof DataItem } | null>(null);
    const [editedValue, setEditedValue] = useState<string>(''); // Edited cell value
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    const handleLoadMore = () => {
        setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        const generatedData: DataItem[] = Array.from({ length: 50 }, (_, index) => ({
            id: index + 1,
            name: `Person ${index + 1}`,
            address: `${index + 1} Street, City ${index % 5 + 1}, Country`,
            email: `person${index + 1}@example.com`,
            birthdate: generateRandomBirthdate(),
            hobby: generateRandomHobbies()
        }));
        setData(generatedData);
    }, []);




    const toggleSort = (column: keyof DataItem) => {
        if (columnName === column) {
            setSortAscending(!sortAscending);
        } else {
            setColumnName(column);
            setSortAscending(true);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchValue = event.target.value.toLowerCase();
        setSearchValue(newSearchValue);
    };

    const handleCellDoubleClick = (rowId: number, column: keyof DataItem, value: string) => {
        const clickedColumn = columnMappings.find(mapping => mapping.name === column);
        if (clickedColumn && clickedColumn.editable) {
            setEditableCell({ rowId, column });
            setEditedValue(value);
        }
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
        if (!(editableCell && editableCell.rowId === rowId && editableCell.column === column)) {
            // Save the changes and exit edit mode if an editable cell is currently being edited
            if (editableCell) {
                handleSaveEdit();
                setEditableCell(null);
            }
        }
    };

    const filteredData = data.filter(item => {
        return Object.values(item).some(value => {
            if (Array.isArray(value)) {
                return value.some(arrayItem => arrayItem.toLowerCase().includes(searchValue));
            } else if (typeof value === 'string') {
                return value.toLowerCase().includes(searchValue);
            }
            return false;
        });
    });

    const sortedData = filteredData.slice().sort((a, b) => {
        const aValue = a[columnName];
        const bValue = b[columnName];

        if (Array.isArray(aValue) && Array.isArray(bValue)) {
            if (sortAscending) {
                // Compare arrays as strings
                const aString = aValue.join(', ');
                const bString = bValue.join(', ');
                return aString.localeCompare(bString);
            } else {
                // Sort arrays by length in descending order
                return bValue.length - aValue.length;
            }
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
            // Compare numbers directly
            if (sortAscending) {
                return aValue - bValue;
            } else {
                return bValue - aValue;
            }
        } else {
            // Compare both strings and other values as strings
            const aString = typeof aValue === 'string' ? aValue : String(aValue);
            const bString = typeof bValue === 'string' ? bValue : String(bValue);
            if (sortAscending) {
                return aString.localeCompare(bString, undefined, { numeric: true });
            } else {
                return bString.localeCompare(aString, undefined, { numeric: true });
            }
        }
    });

    const displayedData = sortedData.slice(0, currentPage * itemsPerPage);

    return (
        <div className="p-4 rounded-lg shadow-sm bg-slate-50">
            <div className="flex justify-end">
                <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search"
                    className="h-8 px-2 bg-white border-none rounded-lg shadow outline-none w-96"
                    name="searchTable"
                />
            </div>
            <table className="w-full overflow-hidden rounded-lg">
                <thead>
                    <tr>
                        {columnMappings.map((column) => (
                            <th key={column.name} className="p-2 border text-start bg-slate-100">
                                <button
                                    className="px-2 py-1 capitalize duration-200 ease-in rounded-lg text-slate-500 hover:bg-slate-200"
                                    onClick={() => toggleSort(column.name)}
                                >
                                    {column.name} {columnName === column.name && sortAscending ? '▲' : '▼'}
                                </button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {displayedData.length !== 0 ? (
                        displayedData.map((item) => (
                            <tr key={item.id}>
                                {columnMappings.map((column) => (
                                    <td
                                        key={column.name}
                                        className={`border hover:bg-slate-100 h-14 `}
                                        onDoubleClick={() => handleCellDoubleClick(item.id, column.name, String(item[column.name]))}
                                        onClick={() => handleCellClick(item.id, column.name, String(item[column.name]))}
                                    >
                                        {column.editable && editableCell && editableCell.rowId === item.id && editableCell.column === column.name ? (
                                            <input
                                                type={column.type === 'date' ? 'date' : 'text'}
                                                value={editedValue}
                                                onChange={handleEditChange}
                                                onBlur={handleSaveEdit}
                                                className={`w-full h-full px-4 bg-white rounded-lg shadow-lg outline-none ${column.type === 'date' ? 'cursor-pointer' : ''}`}
                                                disabled={column.type === 'array' || !column.editable}
                                            />
                                        ) : column.type === 'array' ? (
                                            <div className="flex flex-wrap gap-2 px-2">
                                                {(item[column.name] as string[]).map((value: string, index: number) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 rounded-lg bg-slate-200"
                                                    >
                                                        {value}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="px-4">{item[column.name]}</div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columnMappings.length} className="p-4 text-center border">
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {displayedData.length < sortedData.length && (
                <div className="flex justify-center mt-4">
                    <button
                        className="px-4 py-2 font-bold duration-200 ease-in rounded-md text-slate-400 hover:bg-slate-100"
                        onClick={handleLoadMore}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};