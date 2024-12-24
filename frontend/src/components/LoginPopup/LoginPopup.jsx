import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext)

    const [currState, setCurrState] = useState("Đăng Nhập");
    const [data, setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event) => {
      const name = event.target.name
      const value = event.target.value
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (currState==="Đăng Nhập") {
          newUrl += "/api/user/login"
        }
        else {
          newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data);

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
          setShowLogin(false)
        }
        else {
          alert(response.data.message)
        }
    }


  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==="Đăng Nhập"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Tên của bạn' required />}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email của bạn' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Mật khẩu' required />
        </div>
        <button type='submit'>{currState==="Đăng Ký"?"Tạo tài khoản":"Đăng Nhập"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>Tôi đồng ý với các điều khoản và điều kiện</p>
        </div>
        {currState==="Đăng Nhập"
        ?<p>Tạo tài khoản mới?<span onClick={()=>setCurrState("Đăng Ký")}>Ở đây</span></p>
        :<p>Đã có tài khoản?<span onClick={()=>setCurrState("Đăng Nhập")}>Đăng nhập</span></p>
        }
    
 
      </form>
    </div>
  )
}

export default LoginPopup
