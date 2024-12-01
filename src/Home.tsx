import React from 'react';
import './App.css';
import icon from './icon.svg'
import CustomerList from './customerList';
import CreateCustomer from './modalCreateForm';
import { ICustomer } from './schemas/ICustomer';

function Home() {

  return (
    <>
    <div>
        <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
                <img src={icon}></img>
                <p className='text-[#181B22] text-[28px] leading-[18px] font-semibold'>Quản lý khách hàng</p>
            </div>
            <div className='flex gap-2 items-center'>
                <div className='text-[#181B22] text-right text-sm leading-4 font-semibold'>
                    <p>Mrs Conan</p>
                    <p>Nhân viên kinh doanh</p>
                </div>
                <img src='avatar.png'></img>
            </div>
        </div>
        <div className='flex justify-between'>
            <div>
            </div>
            <div className='flex gap-2 items-center'>
                <button className=''>Thêm khách hàng</button>
            </div>
        </div>
        <div>
            <CustomerList/>
        </div>
        <div>
            <CreateCustomer isOpen={true} onClose={function (): void {
                      throw new Error('Function not implemented.');
                  } } onSave={function (customer: ICustomer): void {
                      throw new Error('Function not implemented.');
                  } }/>
        </div>
    </div>
    </>
  );
}

export default Home;