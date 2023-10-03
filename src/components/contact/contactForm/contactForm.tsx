"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useOAuth } from 'react-oauth/google';

function ContactForm() {

  const oauthConfig = {
    clientId: '889456123002-4u7cgnqlboml4gvc0e1vcpt5k0ic1rvj.apps.googleusercontent.com',
    redirectUri: 'https://website.com',
  };
  const { signIn } = useOAuth(oauthConfig);

  const handleOAuthClick = () => {
    // Initiate the OAuth authentication flow when the button is clicked.
    signIn();
  };

  const form = useRef<HTMLFormElement>(null);
  interface Errors {
    first_name?: string;
    last_name?: string;
    from_email?: string;
    phone?: string;
    message?: string;
  }
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = () => {
    const firstName = form.current ? form.current.first_name.value : "";
    const lastName = form.current ? form.current.last_name.value : "";
    const email = form.current ? form.current.from_email.value : "";
    const phone = form.current ? form.current.phone.value : "";
    const message = form.current ? form.current.message.value : "";
    interface NewErrors {
      first_name?: string;
      last_name?: string;
      from_email?: string;
      phone?: string;
      message?: string;
    }

    const newErrors: NewErrors = {};

    if (!firstName) {
      newErrors.first_name = "First name is required";
    }

    if (!lastName) {
      newErrors.last_name = "Last name is required";
    }

    if (!email) {
      newErrors.from_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.from_email = "Email is invalid";
    }

    // if (!phone) {
    //   newErrors.phone = 'Phone is required';
    // }
    if (!phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = "Phone must be a valid number";
    }

    if (!message) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e: any, accessToken: string) => {
    e.preventDefault();

    if (validateForm()) {
      emailjs
        .sendForm(
          "service_73nig4t",
          "template_3hk190p",
          form.current ? form.current : "",
          "vBZs8y73pkIHZq5_R",
          { access_token: accessToken } // Pass the access token here
        )
        .then(
          (result) => {
            console.log(result.text);
            toast.success("Message sent successfully.");
          },
          (error) => {
            console.log(error.text);
            toast.error("Message is not sent successfully.");
          }
        );
    }
  };

  return (
    <div className="pt-[70px]">
      {/* <h1>Coming soon</h1> */}
      <div className="xl:w-[40vw] flex ml-[auto] mr-[auto] rounded-[15px]">
        <div className="xl:w-[40vw] border-2 flex ml-[auto] mr-[auto] justify-center rounded-[15px] bg-white py-[20px]">
          <form ref={form} onSubmit={sendEmail}>
            <div className="text-center text-[40px] py-[20px]">Contact Us</div>
            <div className="pt-[20px]">
              <label>First Name</label>
              <br />
              <input
                type="text"
                name="first_name"
                className={`border-2 rounded-[10px] mt-[5px] xl:w-[300px] py-[7px] bg-gray-100 p-4 focus:outline-none ${
                  errors.first_name ? "border-red-500" : ""
                }`}
              />
              {errors.first_name && (
                <p className="text-sm text-red-500">{errors.first_name}</p>
              )}
            </div>
            <div className="pt-[20px]">
              <label>Last Name</label>
              <br />
              <input
                type="text"
                name="last_name"
                className={`border-2 rounded-[10px] mt-[5px] xl:w-[300px] py-[7px] bg-gray-100 p-4 focus:outline-none ${
                  errors.last_name ? "border-red-500" : ""
                }`}
              />
              {errors.last_name && (
                <p className="text-sm text-red-500">{errors.last_name}</p>
              )}
            </div>
            <div className="pt-[20px]">
              <label>Email</label>
              <br />
              <input
                type="text"
                name="from_email"
                className={`border-2 rounded-[10px] mt-[5px] xl:w-[300px] py-[7px] bg-gray-100 p-4 focus:outline-none ${
                  errors.from_email ? "border-red-500" : ""
                }`}
              />
              {errors.from_email && (
                <p className="text-sm text-red-500">{errors.from_email}</p>
              )}
            </div>
            <div className="pt-[20px]">
              <label>Phone</label>
              <br />
              <input
                type="text"
                name="phone"
                className={`border-2 rounded-[10px] mt-[5px] xl:w-[300px] py-[7px] bg-gray-100 p-4 focus:outline-none ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
            <div className="pt-[20px]">
              <label>Message</label>
              <br />
              <textarea
                name="message"
                className={`border-2 rounded-[10px] mt-[5px] xl:w-[300px] py-[7px] bg-gray-100 p-4 focus:outline-none ${
                  errors.message ? "border-red-500" : ""
                }`}
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message}</p>
              )}
            </div>
            <input
              type="submit"
              value="Send"
              className="text-center bg-red flex mx-[auto] px-[35px] py-[10px] text-[25px] mt-[50px] mb-[20px] rounded-[15px] bg-gray-100 hover:bg-gray-200 border-[3px]"
            />
          </form>
        </div>
      </div>

      <button
        onClick={handleOAuthClick}
        className="text-center bg-blue flex mx-[auto] px-[35px] py-[10px] text-[25px] mt-[20px] mb-[20px] rounded-[15px] bg-gray-100 hover:bg-gray-200 border-[3px]"
      >
        Sign in with Google
      </button>

    </div>
  );
}

export default ContactForm;
