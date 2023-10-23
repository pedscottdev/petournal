import React from 'react'
import Image from 'next/image'
import bgImage from '/src/img/bg-image.png'

function Signup() {
  return (
    <div className='flex w-full h-screen'>
      
      {/* Background */}
      <div className='hidden lg:flex h-full w-1/2 bg-violet-300 justify-center items-center'>
        {/* <div className='w-60 h-60 bg-gradient-to-tr from-violet-500 to-violet-800 rounded-full'> */}
          <Image 
            src={bgImage} 
            alt="background-image" 
            layout='fixed' 
          />
        {/* </div> */}
      </div>

      {/* Form */}
      <div className='flex items-center justify-center bg-white w-full lg:w-1/2 px-10'>
        <div>
          <h1 className='text-4xl font-bold'> Đăng ký</h1>
          <p className='text-lg mt-3.5'>Tạo tài khoản nhanh chóng và dễ dàng.</p>

          {/* Input Field */}
          <div className='mt-8'>
            <div className='grid grid-cols-2 gap-3'>
              <input
                className='w-full border-2 outline-none border-gray-100 rounded-md p-2.5'
                placeholder='Họ'
              />
              <input
                className='w-full border-2 outline-none border-gray-100 rounded-md p-2.5'
                placeholder='Tên'
              />
            </div>

            <div className='mt-4'>
              <input
                className='w-full border-2 outline-none border-gray-100 rounded-md p-2.5'
                placeholder='Email'
              />
            </div>

            <div className='mt-4'>
              <input
                className='w-full border-2 outline-none border-gray-100 rounded-md p-2.5'
                placeholder='Mật khẩu'
                type='password'
              />
            </div>

            <div className='mt-4'>
              <input
                className='w-full border-2 outline-none border-gray-100 rounded-md p-2.5'
                placeholder='Nhập lại mật khẩu'
                type='password'
              />
            </div>

            <div className='mt-4'>
              <input
                id="lisenced"
                type='checkbox'
              />
              <label className='ml-2  text-base'>Tôi đồng ý với các điều khoản và điều kiện</label>
            </div>
            
            {/* Buttons */}
            <div className='mt-8 flex flex-col gap-y-4'>
              <button className='active:scale-[.98] active:duration-75 transition-all py-2.5 rounded-xl text-white bg-violet-500 text-lg font-bold'>Đăng ký</button>
              
            </div>

            <div className='mt-8 flex justify-center items-center'>
              <button className='text-violet-500 textbase font-medium ml-2'>Chuyển đến trang đăng nhập</button>
            </div>

          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Signup