import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { cartItems, food_list, removeFromCart , getTotalCartAmount, url } = useContext(StoreContext)

  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Món</p>
          <p>Tên</p>
          <p>Giá</p>
          <p>Số Lượng</p>
          <p>Tổng</p>
          <p>Xóa</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}K.VND</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}K.VND</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
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
              <p>{getTotalCartAmount()===0?0:2}K.VND</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Tổng Cộng</b>
              <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+2}K.VND</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>TIẾP TỤC ĐỂ THANH TOÁN</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Nếu bạn có mã giảm giá, Nhập nó ở đây</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Mã Giảm Giá' />
              <button>Xác Nhận</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
