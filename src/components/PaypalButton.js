// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import axios from 'axios';
// function PaypalButton(props) {
//   const [sdkReady, setSdkReady] = useState(false);

//   const addPaypalSdk = async () => {
//     const result = await axios.get("/api/config/paypal");
//     const clientID = result.data;
//     const script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = 'https://www.paypal.com/sdk/js?client-id=' + clientID;
//     script.async = true;
//     script.onload = () => {
//       setSdkReady(true);
//     }
//     document.body.appendChild(script);
//   }

//   const createOrder = (data, actions) => actions.order.create({
//     purchase_units: [
//       {
//         amount: {
//           currency_code: 'USD',
//           value: props.amount
//         }
//       }
//     ]
//   });

//   const onApprove = (data, actions) => actions.order
//     .capture()
//     .then(details => props.onSuccess(data, details))
//     .catch(err => console.log(err));

//   useEffect(() => {
//     if (!window.paypal) {
//       addPaypalSdk();
//     }
//     return () => {
//       //
//     };
//   }, []);

//   if (!sdkReady) {
//     return <div>Loading...</div>
//   }

//   const Button = window.paypal.Buttons.driver('react', { React, ReactDOM });

//   return <Button {...props} createOrder={(data, actions) => createOrder(data, actions)}
//     onApprove={(data, actions) => onApprove(data, actions)} />
// }

// export default PaypalButton;


import React, { useState } from 'react'

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'

function App() {
	const [name, setName] = useState('')

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
			t.json()
		)

		const options = {
			key: __DEV__ ? 'rzp_test_uGoq5ABJztRAhk' : 'PRODUCTION_KEY',
			width:'100%',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Donation',
			description: 'Thank you for nothing. Please give us some money',
			image: 'http://localhost:1337/logo.svg',
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			prefill: {
				name,
				email: 'apa@ndsfdf.com',
				phone_number: '9899999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

	return (
		<div className="App">
			<header className="App-header">
    <button onClick={displayRazorpay} ><a className="App-link"
					onClick={displayRazorpay}
					target="_blank"
					rel="noopener noreferrer">Pay Now</a></button>

				{/* <a
					className="App-link"
					onClick={displayRazorpay}
					target="_blank"
					rel="noopener noreferrer"
				>
					Pay Now
				</a> */}
			</header>
		</div>
	)
}

export default App
