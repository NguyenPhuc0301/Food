import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(url +"/api/order/place",orderData,{headers:{token}});
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }

    else{
      alert("Lỗi")
    }
    
}
    const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value }));
  };


  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }

    
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Thông tin người nhận</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="Họ, tên đệm" />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Tên" />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Địa chỉ email" />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Số nhà, nơi cư trú" />

        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="Thành phố, tỉnh" />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="Quận, huyện" />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Phường, xã" />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Đường, ngõ, ngách" />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder="Số điện thoại" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Giỏ hàng</h2>
          <div>
            <div className="cart-total-details">
              <p>Tổng các món</p>
              <p>{getTotalCartAmount()}K.VND</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí Ship</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}K.VND</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Tổng Cộng</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}K.VND</b>
            </div>
          </div>
          <button type='submit'>TIẾP TỤC ĐỂ THANH TOÁN</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;