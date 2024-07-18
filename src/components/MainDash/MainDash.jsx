import React, { useState } from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import Chatbot from "../Chatbot/Chatbot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { Button, Badge } from "flowbite-react";
import { HiCheck, HiClock } from "react-icons/hi";

// const Button = ({ children, color = 'default', ...props }) => {
//   const baseClasses = 'flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium focus:outline-none';
//   const colorClasses = {
//     default: '',
//     blue: 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300',
//     gray: 'bg-gray-200 text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300',
//     dark: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-4 focus:ring-gray-300',
//     light: 'bg-white text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300',
//     purple: 'bg-purple-700 text-white hover:bg-purple-800 focus:ring-4 focus:ring-purple-300',
//     success: 'bg-green-700 text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300',
//     failure: 'bg-red-700 text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300',
//     warning: 'bg-yellow-400 text-white hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300',
//   };

//   const classes = `${baseClasses} ${colorClasses[color]}`;

//   return (
//     <button {...props} className={classes}>
//       {children}
//     </button>
//   );
// };

const subscribe = async (amount) => {

  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  let order = await fetch(process.env.REACT_APP_BACKEND_URL + "/checkout", {
    method: "post",
    body: JSON.stringify({ amount }),
    headers: {
      "authorization": `Bearer ${token}`,
      "content-type": "application/json"
    }
  });
  order = await order.json();
  console.log(order);

  //   let user=Cookies.get('user');
  //   console.log(user);
  //   user=JSON.parse(user);

  var options = {
    key: "rzp_test_CF5LZVJStJlbon", // Enter the Key ID generated from the Dashboard
    amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "White Rock",
    description: "Test Transaction",
    image: "https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-flat/256/Rock-Flat-icon.png",
    order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    callback_url: process.env.REACT_APP_BACKEND_URL + "/verifypayment",
    prefill: {
      // name: user.Name,
      // email: user.Email,
      name: "Mustansir",
      email: "mustansirzain2@gmail.com",
      contact: "9000090000"
    },
    notes: {
      address: "Razorpay Corporate Office"
    },
    theme: {
      color: "#3399cc"
    }
  };

  var razor = new window.Razorpay(options);
  razor.open();

}

const MainDash = () => {

  const tokenHoldings = JSON.parse(localStorage.getItem('tokenHoldings'));
  const email = localStorage.getItem('email');
  const balance = localStorage.getItem('balance');

  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      <Table />
      <div className="flex flex-wrap gap-2">
        <div className="flex flex-wrap gap-2 mb-4">
          <Button color="light" outline gradientDuoTone="purpleToBlue" onClick={() => subscribe(100)}>Add funds</Button>
        </div>
        <Badge size="md" icon={HiCheck}>Balance: ₹{balance} &nbsp;</Badge>
      </div>
    </div>
  );
};

export default MainDash;
