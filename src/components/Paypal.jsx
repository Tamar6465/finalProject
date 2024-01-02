// import React, { useEffect } from 'react';
// import paypal from 'paypal-rest-sdk';

// paypal.configure({
//   mode: 'sandbox', // אם אתה משתמש ב- Sandbox
//   client_id: 'YOUR_SANDBOX_CLIENT_ID',
//   client_secret: 'YOUR_SANDBOX_CLIENT_SECRET',
// });

// const Paypal = () => {
//   const createPayment = async () => {
//     const create_payment_json = {
//       intent: 'sale',
//       payer: {
//         payment_method: 'paypal',
//       },
//       redirect_urls: {
//         return_url: 'http://localhost:3000/success',
//         cancel_url: 'http://localhost:3000/cancel',
//       },
//       transactions: [
//         {
//           item_list: {
//             items: [
//               {
//                 name: 'item',
//                 sku: 'item',
//                 price: '1.00',
//                 currency: 'USD',
//                 quantity: 1,
//               },
//             ],
//           },
//           amount: {
//             currency: 'USD',
//             total: '1.00',
//           },
//           description: 'This is the payment description.',
//         },
//       ],
//     };

//     try {
//       const payment = await new Promise((resolve, reject) => {
//         paypal.payment.create(create_payment_json, function (error, payment) {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(payment);
//           }
//         });
//       });

//       console.log('Create Payment Response');
//       console.log(payment);

//       const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;
//       window.location.replace(approvalUrl); // Redirect to PayPal for approval
//     } catch (error) {
//       console.error('Error creating payment:', error);
//     }
//   };

//   useEffect(() => {
//     createPayment();
//   }, []); // Run once on component mount

//   return (
//     <div>
//       <p>Redirecting to PayPal...</p>
//     </div>
//   );
// };

// export default Paypal;

