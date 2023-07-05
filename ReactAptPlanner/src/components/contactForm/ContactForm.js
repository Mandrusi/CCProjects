import React from "react";

export const ContactForm = ({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  handleSubmit
}) => {


  const phoneHandler = (event) => {
    const phoneInput = event.target.value;
    // Remove any non-digit characters from the input
    const cleanedPhone = phoneInput.replace(/\D/g, "");
    // Format the phone number with dashes
    const formattedPhone = cleanedPhone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    setPhone(formattedPhone);
  };
  const emailHandler = (event) => {
    setEmail(event.target.value)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name" >Name</label>
      <input value={name} id="name" type="text" onChange={(e) => { setName(e.target.value) }} />

      <label htmlFor="phone" >Phone</label>
      <input value={phone} id="phone" type="phone" onChange={phoneHandler} pattern="\d{3}-\d{3}-\d{4}" />

      <label htmlFor="email" >Email</label>
      <input value={email} id="email" type="email" onChange={emailHandler} />

      <button > Submit </button>
    </form>
  );
};