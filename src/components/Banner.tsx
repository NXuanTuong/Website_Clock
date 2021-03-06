import React from 'react'

type Props = {}

const Banner = (props: Props) => {
  return (
    <div>
        <div className="w-full p-7 m-auto bg-[#f0f0f2]">
        <div className="flex -m-4 justify-between items-center">
            <div className="relative w-full p-32 m-h-[2%]">
            <div className="overflow-hidden">
                <h1 className="mb-9 font-bold text-7xl font-['Josefin Sans','sans-serif'] mt-0 text-[#0b1c39] not-italic">Select Your New Perfect Style</h1>   
                <p className="mb-12 leading-5 font-normal text-[#212025] text-base">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat is aute irure.</p>     
                <div className="hover:bg-red-500 cursor-pointer delay-150 duration-200 ease-in-out font-['Josefin Sans','sans-serif'] py-4 px-7 text-white bg-[#4a4a4b] rounded-md font-lg uppercase leading-0 inline-block boder-0 relative tracking-wide">
                <a className="transition-colors delay-300 ease-linear">Shop Now</a>
                </div>                    
            </div>
            </div>
            <div className="relative w-full p-5 m-h-[2%] block">
            <div className="relative overflow-hidden">
                <img src="https://preview.colorlib.com/theme/timezone/assets/img/hero/xwatch.png.pagespeed.ic.LlRtijfV2T.webp" className="scale-110 m-auto align-middle border-none" />
            </div>
            </div>
        </div>                
        </div>

    </div>
  )
}

export default Banner