import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { listCate } from '../../../api/category'
import { read } from '../../../api/product'
import { CategoryType } from '../../../Types/Category'
import { ProductType } from '../../../Types/Product'

type ProductEditProps = {
    onUpdate: (product: ProductType) => void
}

type Inputs = {
    name: string,
    price: number,
    desc: string,
    img: string,
    category: string
}

const ProductEdit = (props: ProductEditProps) => {
    const [categories, setCategories] = useState<CategoryType[]>([])
    const { register, handleSubmit, formState:{errors}, reset} = useForm<Inputs>()
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const getProduct = async () => {
            const {data} = await read(id)
            console.log(data);
            reset(data)
        }
        getProduct()

        const getCategoryPro = async () => {
            const {data} = await listCate()
            setCategories(data)
        }
        getCategoryPro()
    }, [])

    const onSubmit : SubmitHandler<Inputs> = (datainput) => {
        props.onUpdate(datainput)

        navigate("/admin/products")
    } 
  return (
    <div>
        <div className="bg-gray-50 h-full w-full ">
        <div id="main-content" className="p-5 mt-5 relative overflow-y-auto lg:ml-64">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Name<span className="text-red-400">*</span></label>
                    <input {...register("name", {required: true})} placeholder="Enter your name" type="text" className="mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    {errors.name && <span>Bắt buộc phải nhập trường này!</span>}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Price<span className="text-red-400">*</span></label>
                    <input {...register("price")} type="number"   placeholder="Enter your price" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block p-3 w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image<span className="text-red-400">*</span></label>
                    <input {...register("img")} type="text" placeholder="Enter your img" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-3 block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Desc<span className="text-red-400">*</span></label>
                    <input {...register("desc")} type="text"   placeholder="Enter your desc" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-3 block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Category<span className="text-red-400">*</span></label>
                    <select
                                {...register("category", { required: true })}
                                className="selected-cate form-select appearance-none block 
                                            w-full
                                            px-3
                                            py-[4px]
                                            text-base
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding bg-no-repeat
                                            border border-solid border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label="Default select example">
                                {categories.map((item) => {
                                    return <option className="" value={item._id}>{item.name}</option>
                                })}
                            </select>
                    </div>
                </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Save
                </button>
                </div>
            </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default ProductEdit