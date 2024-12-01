import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { IComment, ICustomer } from "./schemas/ICustomer";
import api from "./api";
import Select from "react-select";
import { ColumnDef } from "@tanstack/react-table";

const CreateCustomer: React.FC <{
    isOpen: boolean;
    onClose: () => void;
    onSave: (customer: ICustomer) => void;
}> = ({isOpen, onClose, onSave}) => {
    const { control, register, handleSubmit, reset } = useForm<Omit<ICustomer, "id">>();
    const [error, setError] = useState("");
    const [source, setSource] = useState<any[]>([]);
    const [status, setStatus] = useState<any[]>([]);
    const [socialMedia, setSocialMedia] = useState<any[]>([]);
    const { fields, append, remove } = useFieldArray({
        control,
        name: "comments", // Key for array
    });

    useEffect (() => {
        const fetchSource = async () => {
            try {
                const response = await api.get("/customer-source/")
                console.log(response.data.results)
                setSource(response.data.results)
            } catch (err: any) {
                if (err.response?.status === 401) {
                  setError("Unauthorized. Please log in.");
                } else {
                  setError("Failed to fetch data.");
                }
            }
        }
        const fetchStatus = async () => {
            try {
                const response = await api.get("/customer-status/")
                console.log(response.data)
                setStatus(response.data)
            } catch (err: any) {
                if (err.response?.status === 401) {
                  setError("Unauthorized. Please log in.");
                } else {
                  setError("Failed to fetch data.");
                }
            }
        }
        const fetchSocialMedia = async () => {
            try {
                const response = await api.get("/customer-social/")
                console.log(response.data.results)
                setSocialMedia(response.data.results)
            } catch (err: any) {
                if (err.response?.status === 401) {
                  setError("Unauthorized. Please log in.");
                } else {
                  setError("Failed to fetch data.");
                }
            }
        }
        fetchSource()
        fetchStatus()
        fetchSocialMedia()
    }, [])
    
    const onSubmit = async (data: Omit<ICustomer, "id">) => {
        try {
            const response = await api.post("/customers/", data)
            const newCustomer: ICustomer = await response.data;
            window.location.reload()
            onSave(newCustomer); // Update the customer list
            reset();
            onClose();
        } catch (err: any) {
            if (err.response?.status === 401) {
              setError("Unauthorized. Please log in.");
            } else {
              setError("Failed to fetch data.");
            }
        }
    }

    if (!isOpen) return null;

    const fakeCategories = [
        { id: 1, value: "regular", label: "Regular" },
        { id: 2, value: "premium", label: "Premium" },
        { id: 3, value: "vip", label: "VIP" },
        { id: 4, value: "new", label: "New" },
        { id: 5, value: "inactive", label: "Inactive" },
      ];

    return (
        <div className="max-w-[1300px]">
            <div className="bg-[#BD8306E5] p-5">
                <h2>Tạo khách hàng</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-10">
                <div className="grid grid-cols-3 gap-x-20 gap-y-5 py-5 border-b">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-[#8F8F8F]">Họ tên khách hàng</label>
                        <input id="full_name" type="text" className="border rounded p-2" {...register("full_name", { required: true })}/>
                    </div>
                    <div className="flex gap-1 justify-center items-center">
                        <label className="text-xs text-[#8F8F8F] pr-3">Giới tính</label>
                        <input id="gender" type="radio" {...register("gender", { required: true })} value="Nam"/>Nam
                        <input id="gender" type="radio" {...register("gender", { required: true })} value="Nữ"/>Nữ
                        <input id="gender" type="radio" {...register("gender", { required: true })} value="Khác"/>Khác
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-[#8F8F8F]">Ngày sinh</label>
                        <input id="date_of_birth" type="date" name="date_of_birth" className="border rounded p-2"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-[#8F8F8F]">Nguồn khách hàng</label>
                        <select id="source" className="border rounded p-2" {...register("source", { required: true })}>
                            <option value="" disabled selected>
                                Chọn nguồn
                            </option>
                            {source.map((index) => {
                                return (
                                    <option key={index.id} value={index.id}>
                                        {index.title}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-[#8F8F8F]">Trạng thái</label>
                        <select id="status" className="border rounded p-2" {...register("status", { required: true })}>
                            <option value="" disabled selected>
                                Chọn trạng thái
                            </option> 
                            {status.map((index, num) => {
                                return (
                                    <option key={num} value={num}>
                                        {index.status}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className=" py-5 border-b">
                    <h2 className="pb-2">Thông tin liên hệ</h2>
                    <div className="grid grid-cols-3 gap-x-20 gap-y-5">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-[#8F8F8F]">Số điện thoại</label>
                            <input id="phone_number" type="text" {...register("phone_number", { required: true })} className="border rounded p-2"></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-[#8F8F8F]">Email</label>
                            <input id="email" type="text" name="email" className="border rounded p-2"></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-[#8F8F8F]">Mạng xã hội</label>
                            <select id="source" className="border rounded p-2" {...register("social_media", { required: true })}>
                                <option value="" disabled selected>
                                    Chọn mạng xã hội
                                </option>
                                {socialMedia.map((index) => {
                                return (
                                    <option key={index.id} value={index.id}>
                                        {index.title}
                                    </option>
                                )
                            })}
                            </select>
                        </div>
                        {/* <div className="flex flex-col gap-1">
                            <label className="text-xs text-[#8F8F8F]">Sản phẩm quan tâm</label>
                            <Controller
                            name="service"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                {...field}
                                isMulti
                                options={fakeCategories}
                                placeholder="Chọn sản phẩm"
                                />
                            )}
                            />
                        </div> */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-[#8F8F8F]">Ghi chú</label>
                            <input id="notes" type="text" name="notes" className="border rounded p-2"></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-[#8F8F8F]">Ngày sinh</label>
                            <input id="date_of_birth" type="date" name="date_of_birth" className="border rounded p-2"/>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-2">Comments</h3>
                    <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                        <th className="border border-gray-300 p-2">Time</th>
                        <th className="border border-gray-300 p-2">Title</th>
                        <th className="border border-gray-300 p-2">Status</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((field, index) => (
                        <tr key={field.id}>
                            <td className="border border-gray-300 p-2">
                            <input
                                type="datetime-local"
                                {...register(`comments.${index}.time`, { required: true })}
                                className="w-full px-2 py-1 border rounded"
                            />
                            </td>
                            <td className="border border-gray-300 p-2">
                            <input
                                {...register(`comments.${index}.title`, { required: true })}
                                placeholder="Comment Title"
                                className="w-full px-2 py-1 border rounded"
                            />
                            </td>
                            <td className="border border-gray-300 p-2">
                            <select
                                {...register(`comments.${index}.status_id`, { required: true })}
                                className="w-full px-2 py-1 border rounded"
                            >
                                <option value="">Select Status</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </select>
                            </td>
                            <td className="border border-gray-300 p-2 text-center">
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                            >
                                Remove
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                    <button
                    type="button"
                    onClick={() => append({ time: new Date(), title: "", status_id: 0 })}
                    className="mt-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                    Add Comment
                    </button>
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                    Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateCustomer