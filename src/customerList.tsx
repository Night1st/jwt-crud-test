import React, { useEffect, useState } from "react"
import { ICustomer } from "./schemas/ICustomer"
import { ColumnDef, useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import api from "./api";

const CustomerList = () => {
    const columns: ColumnDef<ICustomer>[] = [
        {
            id: "id",
            accessorKey: "id",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: () => <h1>#</h1>,
        },
        {
            id: "customer_code",
            accessorKey: "customer_code",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: () => <h1>Mã KH</h1>,
        },
        {
            id: "full_name",
            accessorKey: "full_name",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: () => <h1>Họ và tên</h1>,
        },
        {
            id: "phone_number",
            accessorKey: "phone_number",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: () => <h1>SĐT</h1>,
        },
        {
            id: "email",
            accessorKey: "email",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: () => <h1>Email</h1>,
        },
        // {
        //     id: "source",
        //     accessorKey: "source",
        //     cell(props) {
        //         return <div>{props.getValue() as string}</div>
        //     },
        //     header: () => <h1>Nguồn</h1>,
        // },
        {
            id: "notes",
            accessorKey: "notes",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: () => <h1>Ghi chú</h1>,
        },
        {
            id: "date_created",
            accessorKey: "date_created",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: () => <h1>Ngày tạo</h1>,
        },
    ]

    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await api.get("/customers")
                console.log(response.data.results)
                setData(response.data.results)
            } catch (err: any) {
                if (err.response?.status === 401) {
                  setError("Unauthorized. Please log in.");
                } else {
                  setError("Failed to fetch data.");
                }
            }
        }
        fetchCustomers()
    }, [])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
              pageIndex: 0, // Start on the first page
              pageSize: 10, // Default rows per page
            },
        },
    })
    return (
        <>
            <div className="p-4 text-[#2D2D2D]">
                <table className="min-w-full border border-[#BDBDBD] text-left">
                    <thead className="bg-[#F2F2F2]">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                            key={header.id}
                            className="border-b px-4 py-2"
                            >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b hover:bg-gray-50">
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-4 py-2">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex items-center justify-between mt-4">
                    <span>
                        <strong>
                            Hiển thị {table.getState().pagination.pageIndex + 1} trên{" "}
                            {table.getPageCount()} hợp đồng
                        </strong>
                    </span>
                    <div>
                    <button onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="px-4 py-2 border rounded bg-gray-100 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-4 py-2 border rounded bg-gray-100 disabled:opacity-50"
                        >
                        Next
                    </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerList