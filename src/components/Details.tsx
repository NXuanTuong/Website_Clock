import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { read } from '../api/product'
import { ProductType } from '../Types/Product'

type Props = {}

const Details = (props: Props) => {
  const [number, setNumber] = useState('')
  console.log(setNumber);
  const {id} = useParams()

  const [products, setProducts] = useState<ProductType>()
  useEffect(() => {
    const getProductId = async () => {
      const {data} = await read(id)
      setProducts(data)
    }
    getProductId()
  }, [])
  let cart = []

  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  const addCart = (product) => {
    const existProduct = cart.find((item) => { console.log(item);
          return item._id == product._id 
    });
    const newItem = {...product, quantity: number ? +number : 1, total: product.price * number}
    if(!existProduct) {
      cart.push(newItem)
    } else {
      console.log(existProduct); 
      existProduct.quantity += newItem.quantity; 
      existProduct.total = +existProduct.price
    }
    localStorage.setItem("cart", JSON.stringify(cart))
  }
  
  return (
    <div>
          <div className="bg-[#eff5f8] block">
            <ul className="text-center p-5">
              <li className="inline-block"><a className="px-1 py-3 text-lg font-medium text-[#8d979d]" href="/product">Shop</a></li> 
              <li className="inline-block"><span className="px-1 text-lg font-medium text-[#8d979d] py-3">&gt;</span></li>
              <li className="inline-block"><a className="px-1 text-lg font-medium text-black py-3">Product Detail</a></li>
            </ul>
          </div>
          <div className="max-w-7xl w-full p-6 m-auto mt-20">
            
            <div className="grid grid-cols-2 gap-10">
              <div>
                <img src={products?.img} className="object-cover h-full w-full rounded-xl max-w-full" />
                <div className="flex justify-between border border-grey-800 rounded-xl px-2 py-3 mt-2">
                  <img src="https://picsum.photos/150/150" className="object-cover hover:opacity-90 cursor-pointer rounded" />
                  <img src="https://picsum.photos/150/150" className="object-cover hover:opacity-90 cursor-pointer rounded" />
                  <img src="https://picsum.photos/150/150" className="object-cover hover:opacity-90 cursor-pointer rounded" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl w-96 font-semibold">{products?.name}</p>
                  </div>
                  <div>
                    <div className="px-3">
                      <p className="text-red-500 text-base"><del>$ {products?.price}</del></p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">$ {products?.price}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex ">
                  <div className="flex">
                    <div>
                      <span>3.9</span>
                    </div>
                    <div className="px-3">
                      <p> <span className="text-yellow-500"><i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /> </span> <span className="text-gray-300"><i className="bi bi-star-fill" /></span></p>
                    </div>
                  </div>
                  <div className="px-9">
                    <span className="text-base text-[#6456d5] font-semibold"><i className="bi bi-eye-fill" /> See all 512 reviews</span>
                  </div>
                </div>
                <div className="mt-5">
                  <span className="text-xl font-semibold">S??? l?????ng: </span>
                </div>
                <div className="mt-2 text-center">
                  <input type="number" onChange={event => setNumber(event.target.value)} min={1} defaultValue={1} className="border w-40 p-2 border-[#6456d5] rounded-xl outline-none" />
                </div>

                <div className="mt-10 px-2 py-3 text-center bg-[#6456d5] cursor-pointer text-white rounded-lg w-full">
                  <button onClick={() => addCart(products)} id="btnAddtoCart" className="text-lg">Add to cart</button>
                </div>
                <div className="mt-10">
                  <p className="text-base font-semibold mb-4">Description</p>
                  <p className="text-base text-gray-500 mb-3">Time Zone ???????c s???n xu???t kh??p k??n t??? kh??u thi???t k??? t???i H??n Qu???c, nh???p kh???u m??y c???a Nh???t ?????n l???p r??p t???i Trung Qu???c. T???o n??n m???t m???c gi?? ph??n kh??c ph??? th??ng ph?? h???p v?? c???nh tranh nh???t. X??y d???ng n??n m???t ???????? ch?????? v???ng m???nh trong l??ng gi???i tr??? y??u th???i trang.</p>
                  <p className="text-base text-gray-500 mb-3">Time Zone th????ng hi???u H??n qu???c, c??ng ngh??? Nh???t B???n v???i m??y to??n b??? khung m??y ?????ng h??? ???????c nh???t nh???p kh???u 100% t??? Citizen. Thi???t k??? t???i Korea b???i chuy??n gia th???i trang h??ng ?????u H??n Qu???c, ti??u chu???n qu???c t???, b???o h??nh qu???c t??? v?? ch??? ????? h???u m??i t???t nh???t.</p>
                </div>
                <div className="w-full h-0.5 mt-10 mb-10 bg-gray-200" />
                <div>
                  <p className="text-base font-semibold mb-4">Product Specifications</p>
                  <ul className="flex mb-3 items-center">
                    <li className="w-2 h-2 rounded-full bg-gray-200" />
                    <li className="px-3"><span className="font-semibold">Th????ng hi???u:</span> TIME ZONE</li>
                  </ul>
                  <ul className="flex mb-3 items-center">
                    <li className="w-2 h-2 rounded-full bg-gray-200" />
                    <li className="px-3"><span className="font-semibold">Ch???t li???u d??y:</span> D??y Th??p ?????c</li>
                  </ul>
                  <ul className="flex mb-3 items-center">
                    <li className="w-2 h-2 rounded-full bg-gray-200" />
                    <li className="px-3"><span className="font-semibold">Ch???t li???u m???t k??nh:</span> M???t k??nh saphire ch???ng tr???y x?????c.</li>
                  </ul>
                  <ul className="flex mb-3 items-center">
                    <li className="w-2 h-2 rounded-full bg-gray-200" />
                    <li className="px-3"><span className="font-semibold">???????ng k??nh m???t:</span> size 42 mm</li>
                  </ul>
                </div>
                <div>
                  <div className="grid grid-cols-2 mt-20 gap-5">
                    <div className="text-center border border-gray-400 bg-[#f9fafc] rounded-xl py-5">
                      <div className="text-2xl">
                        <i className="bi bi-globe" />
                      </div>
                      <div>
                        <p className="font-semibold">International Delivery</p>
                        <p className="text-gray-400 font-semibold">Get your order in 2 days</p>
                      </div>
                    </div>
                    <div>
                      <div className="text-center border border-gray-400 rounded-xl py-5 bg-[#f9fafc]">
                        <div className="text-2xl">
                          <i className="bi bi-box-seam" />
                        </div>
                        <div>
                          <p className="font-semibold">Well Preserved</p>
                          <p className="text-gray-400 font-semibold">Limit chemical exposure</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-80">
              <div>
                <h1 className="font-semibold text-xl">Recent Reviews</h1>
                <div className="w-full h-0.5 mt-7 mb-7 bg-gray-200" />
                <div className="grid grid-cols-3 gap-10">
                  <div>
                    <p className="mb-3 font-semibold">Nguy???n Xu??n T?????ng</p>
                    <p className="text-gray-500">May 16, 2022</p>
                  </div>
                  <div>
                    <div className="flex">
                      <div className="px-3">
                        <p> <span className="text-yellow-500"><i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /></span></p>
                      </div>
                      <div>
                        <span className="px-3">5</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold mb-3">T??i ???? nh???n h??ng</p>
                    <p className="text-gray-500">S???n ph???m r???t ?????p v?? ch???t l?????ng . Ph?? h???p cho m???i l???a tu???i , th??? hi???n ???????c phong c??ch c??ng nh?? t??n vinh v??? b??? ngo??i.</p>
                  </div>
                </div>
                <div className="w-full h-0.5 mt-7 mb-7 bg-gray-200" />
                <div className="grid grid-cols-3 gap-10">
                  <div>
                    <p className="mb-3 font-semibold">Nguy???n Xu??n T?????ng</p>
                    <p className="text-gray-500">May 16, 2022</p>
                  </div>
                  <div>
                    <div className="flex">
                      <div className="px-3">
                        <p> <span className="text-yellow-500"><i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /></span></p>
                      </div>
                      <div>
                        <span className="px-3">5</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold mb-3">T??i ???? nh???n h??ng</p>
                    <p className="text-gray-500">S???n ph???m r???t ?????p v?? ch???t l?????ng . Ph?? h???p cho m???i l???a tu???i , th??? hi???n ???????c phong c??ch c??ng nh?? t??n vinh v??? b??? ngo??i.</p>
                  </div>
                </div>
                <div className="w-full h-0.5 mt-7 mb-7 bg-gray-200" />
                <div className="grid grid-cols-3 gap-10">
                  <div>
                    <p className="mb-3 font-semibold">Nguy???n Xu??n T?????ng</p>
                    <p className="text-gray-500">May 16, 2022</p>
                  </div>
                  <div>
                    <div className="flex">
                      <div className="px-3">
                        <p> <span className="text-yellow-500"><i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /></span></p>
                      </div>
                      <div>
                        <span className="px-3">5</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold mb-3">T??i ???? nh???n h??ng</p>
                    <p className="text-gray-500">S???n ph???m r???t ?????p v?? ch???t l?????ng . Ph?? h???p cho m???i l???a tu???i , th??? hi???n ???????c phong c??ch c??ng nh?? t??n vinh v??? b??? ngo??i.</p>
                  </div>
                </div>
                <div className="w-full h-0.5 mt-7 mb-7 bg-gray-200" />
                <div className="grid grid-cols-3 gap-10">
                  <div>
                    <p className="mb-3 font-semibold">Nguy???n Xu??n T?????ng</p>
                    <p className="text-gray-500">May 16, 2022</p>
                  </div>
                  <div>
                    <div className="flex">
                      <div className="px-3">
                        <p> <span className="text-yellow-500"><i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /> <i className="bi bi-star-fill" /> </span> <span className="text-gray-300"><i className="bi bi-star-fill" /></span></p>
                      </div>
                      <div>
                        <span className="px-3">4</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold mb-3">T??i ???? nh???n h??ng</p>
                    <p className="text-gray-500">S???n ph???m r???t ?????p v?? ch???t l?????ng . Ph?? h???p cho m???i l???a tu???i , th??? hi???n ???????c phong c??ch c??ng nh?? t??n vinh v??? b??? ngo??i.</p>
                  </div>
                </div>
                <div className="w-full h-0.5 mt-7 mb-7 bg-gray-200" />
              </div>
              <div className="mt-20">
                <h2 className="font-semibold text-xl mb-7">Customers also purchased</h2>
                <div>
                  <div>
                    <div className="grid grid-cols-4 mb-5 gap-10">
                      <div className="px-3 py-7 rounded-lg shadow hover:shadow-lg product_item">
                        <div className="relative overflow-hidden">
                          <img src="https://picsum.photos/200/300" className="object-cover w-full max-w-full h-64" />
                          <span className="absolute top-[5%] px-5 rounded-2xl text-white bg-red-300 py-1 border -left-[5%]"><p>20%</p></span>
                          <span className="text-black icon_heart cursor-pointer absolute text-2xl -top-[2%] right-[9px] hover:text-red-500"><i className="bi bi-heart" /></span>
                          <div className="absolute top-[47%] -left-[5%] mx-5 feedback_item_product">
                            <ul>
                              <li className="text-yellow-300 cursor-pointer"><i className="bi bi-star-fill" /></li>
                              <li className="text-yellow-300 cursor-pointer"><i className="bi bi-star-fill" /></li>
                              <li className="text-yellow-300 cursor-pointer"><i className="bi bi-star-fill" /></li>
                              <li className="text-yellow-300 cursor-pointer"><i className="bi bi-star-fill" /></li>
                              <li className="cursor-pointer"><i className="bi bi-star" /></li>
                            </ul>
                          </div>
                          <div className="hover:bg-red-500 btn_add_cart cursor-pointer top-[80%] left-[20%] delay-150 duration-200 ease-in-out py-1 px-3 rounded-md text-red-500 hover:text-white border border-red-400 font-semibold uppercase absolute">
                            <a>Add to Cart <span><i className="fas fa-shopping-cart" /></span></a>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base mb-2 font-semibold text-center overflow-ellipsis w-75 whitespace-nowrap overflow-hidden"><a>Nguyen Xuan Tuong</a></h3>
                          <div className="flex justify-center items-center">
                            <del className="text-red-300">$ 150.000</del>
                            <p className="px-2 font-semibold text-lg">$100.000</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-3 py-7 shadow rounded-lg hover:shadow-lg product_item">
                        <div className="relative overflow-hidden">
                          <img src="https://picsum.photos/200/300" className="object-cover w-full max-w-full h-64" />
                          <span className="absolute top-[5%] px-5 rounded-2xl text-white bg-red-300 py-1 border -left-[5%]"><p>20%</p></span>
                          <span className="text-black icon_heart cursor-pointer absolute text-2xl -top-[2%] right-[9px] hover:text-red-500"><i className="bi bi-heart" /></span>
                          <div className="absolute top-[47%] -left-[5%] mx-5 feedback_item_product">
                            <ul>
                              <li className="text-yellow-300 cursor-pointer"><i className="bi bi-star-fill" /></li>
                              <li className="text-yellow-300 cursor-pointer"><i className="bi bi-star-fill" /></li>
                              <li className="text-yellow-300 cursor-pointer"><i className="bi bi-star-fill" /></li>
                              <li className="text-yellow-300 cursor-pointer"><i className="bi bi-star-fill" /></li>
                              <li className="cursor-pointer"><i className="bi bi-star" /></li>
                            </ul>
                          </div>
                          <div className="hover:bg-red-500 btn_add_cart cursor-pointer top-[80%] left-[20%] delay-150 duration-200 ease-in-out py-1 px-3 rounded-md text-red-500 hover:text-white border border-red-400 font-semibold uppercase absolute">
                            <a>Add to Cart <span><i className="fas fa-shopping-cart" /></span></a>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base mb-2 font-semibold text-center overflow-ellipsis w-75 whitespace-nowrap overflow-hidden"><a>Nguyen Xuan Tuong</a></h3>
                          <div className="flex justify-center items-center">
                            <del className="text-red-300">$ 150.000</del>
                            <p className="px-2 font-semibold text-lg">$100.000</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-3 py-7 shadow rounded-lg hover:shadow-lg product_item">
                        <div className="relative overflow-hidden">
                          <img src="https://picsum.photos/200/300" className="object-cover w-full max-w-full h-64" />
                          <span className="absolute top-[5%] px-5 rounded-2xl text-white bg-red-300 py-1 border -left-[5%]"><p>20%</p></span>
                          <span className="text-black icon_heart cursor-pointer absolute text-2xl -top-[2%] right-[9px] hover:text-red-500"><i className="bi bi-heart" /></span>
                          <div className="absolute top-[47%] -left-[5%] mx-5 feedback_item_product">
                            <ul>
                              <li className="text-yellow-300 cursor-pointer"><i className="bi bi-star-fill" /></li>
                              <li className="text-yellow-300 cursor-pointer"><i className="bi bi-star-fill" /></li>
                              <li className="text-yellow-300 cursor-pointer"><i className="bi bi-star-fill" /></li>
                              <li className="text-yellow-300 cursor-pointer"><i className="bi bi-star-fill" /></li>
                              <li className="cursor-pointer"><i className="bi bi-star" /></li>
                            </ul>
                          </div>
                          <div className="hover:bg-red-500 btn_add_cart cursor-pointer top-[80%] left-[20%] delay-150 duration-200 ease-in-out py-1 px-3 rounded-md text-red-500 hover:text-white border border-red-400 font-semibold uppercase absolute">
                            <a>Add to Cart <span><i className="fas fa-shopping-cart" /></span></a>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base mb-2 font-semibold text-center overflow-ellipsis w-75 whitespace-nowrap overflow-hidden"><a>Nguyen Xuan Tuong</a></h3>
                          <div className="flex justify-center items-center">
                            <del className="text-red-300">$ 150.000</del>
                            <p className="px-2 font-semibold text-lg">$100.000</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-3 py-7 shadow rounded-lg hover:shadow-lg product_item">
                        <div className="relative overflow-hidden">
                          <img src="https://picsum.photos/200/300" className="object-cover w-full max-w-full h-64" />
                          <span className="absolute top-[5%] px-5 rounded-2xl text-white bg-red-300 py-1 border -left-[5%]"><p>20%</p></span>
                          <span className="text-black icon_heart cursor-pointer absolute text-2xl -top-[2%] right-[9px] hover:text-red-500"><i className="bi bi-heart" /></span>
                          <div className="absolute top-[47%] -left-[5%] mx-5 feedback_item_product">
                            <ul>
                              <li className="text-yellow-300 cursor-pointer"><i className="bi bi-star-fill" /></li>
                              <li className="text-yellow-300 cursor-pointer"><i className="bi bi-star-fill" /></li>
                              <li className="text-yellow-300 cursor-pointer"><i className="bi bi-star-fill" /></li>
                              <li className="text-yellow-300 cursor-pointer"><i className="bi bi-star-fill" /></li>
                              <li className="cursor-pointer"><i className="bi bi-star" /></li>
                            </ul>
                          </div>
                          <div className="hover:bg-red-500 btn_add_cart cursor-pointer top-[80%] left-[20%] delay-150 duration-200 ease-in-out py-1 px-3 rounded-md text-red-500 hover:text-white border border-red-400 font-semibold uppercase absolute">
                            <a>Add to Cart <span><i className="fas fa-shopping-cart" /></span></a>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base mb-2 font-semibold text-center overflow-ellipsis w-75 whitespace-nowrap overflow-hidden"><a>Nguyen Xuan Tuong</a></h3>
                          <div className="flex justify-center items-center">
                            <del className="text-red-300">$ 150.000</del>
                            <p className="px-2 font-semibold text-lg">$100.000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <ul className="block">
                <li className="inline-block px-4 py-2 border"><a className="text-[#777]" href="#"><i className="fas fa-angle-left" /></a></li>
                <li className="inline-block px-4 py-2 border bg-red-300"><a className="text-[#000]" href="#">1</a></li>
                <li className="inline-block px-4 py-2 border"><a className="text-[#777]" href="#">2</a></li>
                <li className="inline-block px-4 py-2 border"><a className="text-[#777]" href="#">3</a></li>
                <li className="inline-block px-4 py-2 border"><a className="text-[#777]" href="#"><i className="fas fa-angle-right" /></a></li>
              </ul>
            </div>
          </div>
        </div>
  )
}

export default Details