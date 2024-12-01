import axios from "axios";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ICustomer } from "./schemas/ICustomer";
import api from "./api";
import Select from "react-select";

const CreateCustomer: React.FC <{
    isOpen: boolean;
    onClose: () => void;
    onSave: (customer: ICustomer) => void;
}> = ({isOpen, onClose, onSave}) => {
    const { control, register, handleSubmit, reset } = useForm<Omit<ICustomer, "id">>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async (data: Omit<ICustomer, "id">) => {
        try {
            const response = await api.post("/customers", JSON.stringify(data))
            const newCustomer: ICustomer = await response.data;
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

    return (
        <>
            <div className="bg-yellow-300">
                <h2>Tạo khách hàng</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-10">
                <div className="grid grid-cols-3 gap-x-20 gap-y-5">
                    <div className="flex flex-col">
                        <label>Họ tên khách hàng</label>
                        <input id="full_name" type="text" name="full-name" className="bg-gray-600"></input>
                    </div>
                    <div>
                        <label>Giới tính</label>
                        <input id="gender" type="radio" name="gender" value="nam"/>Nam
                        <input id="gender" type="radio" name="gender" value="nữ"/>Nữ
                        <input id="gender" type="radio" name="gender" value="khác"/>Khác
                    </div>
                    <div className="flex flex-col">
                        <label>Ngày sinh</label>
                        <input id="date_of_birth" type="date" name="date_of_birth"/>
                    </div>
                    <div className="flex flex-col">
                        <label>Nguồn khách hàng</label>
                        <select id="source">
                            <option value="" disabled selected>
                                Chọn nguồn
                            </option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label>Trạng thái</label>
                        <select id="status">
                            <option value="" disabled selected>
                                Chọn trạng thái
                            </option>
                        </select>
                    </div>
                </div>
                <div>
                    <h2>Thông tin liên hệ</h2>
                    <div className="grid grid-cols-3 gap-x-20 gap-y-5">
                        <div>
                            <label>Số điện thoại</label>
                            <input id="phone_number" type="text" name="phone_number" className="bg-gray-600"></input>
                        </div>
                        <div>
                            <label>Email</label>
                            <input id="email" type="text" name="email" className="bg-gray-600"></input>
                        </div>
                        <div>
                            <label>Mạng xã hội</label>
                            <select id="source">
                                <option value="" disabled selected>
                                    Chọn mạng xã hội
                                </option>
                            </select>
                        </div>
                        <div>
                            <label>Sản phẩm quan tâm</label>
                            <Controller
                            name="service"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                {...field}
                                isMulti
                                
                                placeholder="Select categories"
                                />
                            )}
                            />
                        </div>
                        <div>
                            <label>Ghi chú</label>
                            <input id="notes" type="text" name="notes" className="bg-gray-600"></input>
                        </div>
                        <div>
                            <label>Ngày sinh</label>
                            <input id="date_of_birth" type="date" name="date_of_birth"/>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateCustomer