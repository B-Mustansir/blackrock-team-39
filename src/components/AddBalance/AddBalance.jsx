import { Button } from "flowbite-react";

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
        name: "MentorMee",
        description: "Test Transaction",
        image: "https://media.licdn.com/dms/image/C4D03AQHDUTFD-qDyMQ/profile-displayphoto-shrink_400_400/0/1653281408893?e=1703721600&v=beta&t=5zWJzh_f5LWdGU0e1uGgYbok2LZykl-g5hNBDychafQ",
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

export function AddBalance() {
    return (
      <div className="flex flex-wrap gap-2">
        <Button color="gray" onClick={()=>subscribe(100)}>Gray</Button>
      </div>
    );
}; 

export default AddBalance;