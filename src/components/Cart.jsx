import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/cart.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useState } from "react";
import { json, useNavigate } from "react-router";
import Form from "./Form";

const Cart = () => {
  const [username, setusername] = useState("");
  const [useremail, setuseremail] = useState("");
  const [useraddress, setuseraddress] = useState("");
  const [userphone, setuserphone] = useState("");
  const [userer, setuseterr] = useState(false);
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    name: "",

    email: "",

    password: "",

    isLogin: false,
  });

  const [userdata, setuserdata] = useState({
    name: "",

    email: "",

    phone: "",

    address: "",

    isLogin: false,
  });

  function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/; // regular expression to match 10-digit phone numbers
    
    if (phoneNumber.match(phoneRegex)) {
      return true; // phone number is valid
    } else {
      return false; // phone number is invalid
    }
  }

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  function handlePhoneNumberChange(event) {
    const inputPhoneNumber = event.target.value;
    setPhoneNumber(inputPhoneNumber);

    if (validatePhoneNumber(inputPhoneNumber)) {
      setIsValidPhoneNumber(true);
    } else {
      setIsValidPhoneNumber(false);
    }
  }

  
  

  const signUpForm = () => {
    let loginData = localStorage.getItem("userform");
    if(username.length || useremail.length || userphone.length || useraddress.length < 1) {
      alert("all fields are required");
    }

    fetch("http://localhost:3333/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    }).then((result) => {
      console.warn("result", result);
    });
    toast.success("User Details sent to the http://localhost:3333/posts api");

    if (loginData == null) {
      loginData = [];

      loginData.push(login);

      localStorage.setItem("userform", JSON.stringify(loginData));
    } else {
      let data = JSON.parse(loginData);

      data.push(login);

      localStorage.setItem("userform", JSON.stringify(data));
    }

    localStorage.setItem("user", JSON.stringify(userdata));
  };

  const { cartItems, subTotal, tax, shipping, total } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const isloggedin = JSON.parse(localStorage.getItem("isloggedin"));
  console.log(isloggedin);
  const paymenthandle = () => {
    if (!isloggedin) {
      toast.error("Please Login");
    }
    if (isloggedin) {
      toast.success("Payment Successful");
    }
  };

  const increment = (id) => {
    dispatch({
      type: "addToCart",
      payload: { id },
    });
    dispatch({ type: "calculatePrice" });
  };
  const decrement = (id) => {
    dispatch({
      type: "decrement",
      payload: id,
    });

    dispatch({ type: "calculatePrice" });
  };
  const deleteHandler = (id) => {
    dispatch({
      type: "deleteFromCart",
      payload: id,
    });
    dispatch({ type: "calculatePrice" });
  };

  function handleRemoveAll() {
    dispatch({
      type: "removeAll",
    });
  }

  return (
    <div className="cart">
      <main>
        {cartItems?.length > 0 ? (
          cartItems.map((i) => (
            <CartItem
              imgSrc={i.imgSrc}
              name={i.name}
              price={i.price}
              qty={i.quantity}
              id={i.id}
              key={i.id}
              decrement={decrement}
              increment={increment}
              deleteHandler={deleteHandler}
            />
          ))
        ) : (
          <h1 className="empty">Your Cart is Empty</h1>
        )}
        <Link to="/" className="logolink">
          {cartItems?.length > 0 ? (
            ""
          ) : (
            <button type="button" className="shopnow" onClick={handleRemoveAll}>
              Book Now
            </button>
          )}
        </Link>
      </main>

      <aside className="amounts">
        <h2>Total Amount: ${subTotal ? Math.trunc(subTotal) : 0}</h2>
        {cartItems?.length > 0 ? (
          <button type="button" className="Removeall" onClick={handleRemoveAll}>
            Remove All
          </button>
        ) : (
          ""
        )}
        {cartItems?.length > 0 ? (
          <button type="button" className="paybtn" onClick={paymenthandle}>
            Proceed to Pay
          </button>
        ) : (
          ""
        )}
      </aside>

      <Form/>
    </div>
  );
};

const CartItem = ({
  imgSrc,
  name,
  price,
  qty,
  decrement,
  increment,
  deleteHandler,
  id,
}) => (
  <div>
    <div className="Products">
      <img className="productimgcart" src={imgSrc} alt="Item" />
      <article className="nameandprice">
        <h3>{name}</h3>
        <p>${price}</p>
      </article>

      <div className="quantitybtn">
        <button className="dec" onClick={() => decrement(id)}>
          -
        </button>
        <p>{qty}</p>
        <button className="inc" onClick={() => increment(id)}>
          +
        </button>
      </div>

      <button className="removeitem" onClick={() => deleteHandler(id)}>
        Remove Item
      </button>
    </div>
    
  </div>
);

export default Cart;
