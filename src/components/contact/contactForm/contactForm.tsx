// "use client";
// import React, { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { useRef } from "react";
// import emailjs from "@emailjs/browser";

// function ContactForm() {
//     useEffect(() => {
//         AOS.init({
//           // Global settings:
//           disable: false,
//           startEvent: 'DOMContentLoaded',
//           initClassName: 'aos-init',
//           animatedClassName: 'aos-animate',
//           useClassNames: false,
//           disableMutationObserver: false,
//           debounceDelay: 50,
//           throttleDelay: 99,
//           // ... (other configuration settings)
//         });
//       }, []);


//       const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs
//       .sendForm(
//         "service_0lhyspu",
//         "template_zfsrlnc",
//         form.current,
//         "daFdzriOxxzSUwK_d"
//       )
//       .then(
//         (result) => {
//           console.log(result.text);
//         },
//         (error) => {
//           console.log(error.text);
//         }
//       );
//   };

//     return (
//         <div className='pt-[70px]'>
            
//             <div className='xl:w-[40vw] flex ml-[auto] mr-[auto] rounded-[15px]'>
//             <div className='xl:w-[40vw] border-2 flex ml-[auto] mr-[auto] justify-center rounded-[15px] bg-white py-[20px]'>
                
//                 <form ref={form} onSubmit={sendEmail}>
//                 <div className='text-center text-[40px] py-[20px]' >Contact Us</div>
//                     <div className='pt-[20px]'>
//                     <label>First Name</label><br/>
//                     <input type="text" name='first_name' className='border-2 rounded-[10px] mt-[5px] xl:w-[300px] py-[7px] bg-gray-100 p-4 focus:outline-none'/>
//                     </div>
//                     <div className='pt-[20px]'>
//                     <label>Last Name</label><br/>
//                     <input type="text" name='last_name' className='border-2 rounded-[10px] mt-[5px] xl:w-[300px] py-[7px] bg-gray-100 p-4 focus:outline-none'/>
//                     </div>
//                     <div className='pt-[20px]'>
//                     <label>Email</label><br/>
//                     <input type="text" name='from_email' className='border-2 rounded-[10px] mt-[5px] xl:w-[300px] py-[7px]  bg-gray-100 p-4 focus:outline-none'/>
//                     </div>
//                     <div className='pt-[20px]'>
//                     <label>Phone</label><br/>
//                     <input type="text" name='phone' className='border-2 rounded-[10px] mt-[5px] xl:w-[300px] py-[7px]  bg-gray-100 p-4 focus:outline-none'/>
//                     </div>
//                     <div className='pt-[20px]'>
//                     <label>Message</label><br/>
//                     <textarea name='message' className='border-2 rounded-[10px] mt-[5px] xl:w-[300px] py-[7px]  bg-gray-100 p-4 focus:outline-none '/>
//                     </div>
//                     <input type='submit' value="send" className='text-center border-2 bg-red flex mx-[auto] mt-[20px] px-[35px] py-[10px] text-[25px] mt-[50px] mb-[20px] rounded-[15px] bg-gray-100 hover:bg-gray-200 border-[3px]'/>

//                 </form>
//             </div>
//             </div>
//         </div>
//     );
// }

// export default ContactForm;



import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

function ContactForm() {
  useEffect(() => {
    AOS.init({
      // Global settings:
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      // ... (other configuration settings)
    });
  }, []);

  const form = useRef();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const firstName = form.current.first_name.value;
    const lastName = form.current.last_name.value;
    const email = form.current.from_email.value;
    const phone = form.current.phone.value;
    const message = form.current.message.value;

    const newErrors = {};

    if (!firstName) {
      newErrors.first_name = 'First name is required';
    }

    if (!lastName) {
      newErrors.last_name = 'Last name is required';
    }

    if (!email) {
      newErrors.from_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.from_email = 'Email is invalid';
    }

    if (!phone) {
      newErrors.phone = 'Phone is required';
    }

    if (!message) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (validateForm()) {
      emailjs
        .sendForm(
          'service_0lhyspu',
          'template_zfsrlnc',
          form.current,
          'daFdzriOxxzSUwK_d'
        )
        .then(
          (result) => {
            console.log(result.text);
            toast.success('Message sent successfully.');
          },
          (error) => {
            console.log(error.text);
            toast.error('Message is not sent successfully.');
          }
        );
    }
  };

  return (
    <div className='pt-[70px]'>
      <div className='xl:w-[40vw] flex ml-[auto] mr-[auto] rounded-[15px]'>
        <div className='xl:w-[40vw] border-2 flex ml-[auto] mr-[auto] justify-center rounded-[15px] bg-white py-[20px]'>
          <form ref={form} onSubmit={sendEmail}>
            <div className='text-center text-[40px] py-[20px]'>Contact Us</div>
            <div className='pt-[20px]'>
              <label>First Name</label>
              <br />
              <input
                type='text'
                name='first_name'
                className={`border-2 rounded-[10px] mt-[5px] xl:w-[300px] py-[7px] bg-gray-100 p-4 focus:outline-none ${
                  errors.first_name ? 'border-red-500' : ''
                }`}
              />
              {errors.first_name && (
                <p className='text-red-500 text-sm'>{errors.first_name}</p>
              )}
            </div>
            <div className='pt-[20px]'>
              <label>Last Name</label>
              <br />
              <input
                type='text'
                name='last_name'
                className={`border-2 rounded-[10px] mt-[5px] xl:w-[300px] py-[7px] bg-gray-100 p-4 focus:outline-none ${
                  errors.last_name ? 'border-red-500' : ''
                }`}
              />
              {errors.last_name && (
                <p className='text-red-500 text-sm'>{errors.last_name}</p>
              )}
            </div>
            <div className='pt-[20px]'>
              <label>Email</label>
              <br />
              <input
                type='text'
                name='from_email'
                className={`border-2 rounded-[10px] mt-[5px] xl:w-[300px] py-[7px] bg-gray-100 p-4 focus:outline-none ${
                  errors.from_email ? 'border-red-500' : ''
                }`}
              />
              {errors.from_email && (
                <p className='text-red-500 text-sm'>{errors.from_email}</p>
              )}
            </div>
            <div className='pt-[20px]'>
              <label>Phone</label>
              <br />
              <input
                type='text'
                name='phone'
                className={`border-2 rounded-[10px] mt-[5px] xl:w-[300px] py-[7px] bg-gray-100 p-4 focus:outline-none ${
                  errors.phone ? 'border-red-500' : ''
                }`}
              />
              {errors.phone && (
                <p className='text-red-500 text-sm'>{errors.phone}</p>
              )}
            </div>
            <div className='pt-[20px]'>
              <label>Message</label>
              <br />
              <textarea
                name='message'
                className={`border-2 rounded-[10px] mt-[5px] xl:w-[300px] py-[7px] bg-gray-100 p-4 focus:outline-none ${
                  errors.message ? 'border-red-500' : ''
                }`}
              />
              {errors.message && (
                <p className='text-red-500 text-sm'>{errors.message}</p>
              )}
            </div>
            <input
              type='submit'
              value='Send'
              className='text-center border-2 bg-red flex mx-[auto] mt-[20px] px-[35px] py-[10px] text-[25px] mt-[50px] mb-[20px] rounded-[15px] bg-gray-100 hover:bg-gray-200 border-[3px]'
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
