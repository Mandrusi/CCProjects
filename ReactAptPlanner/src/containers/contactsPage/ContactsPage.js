import React, { useState } from "react";

import { ContactForm } from "../../components/contactForm/ContactForm";
import { TileList } from "../../components/tileList/TileList";

export const ContactsPage = (props) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();
    const filterContacts = props.onContacts.filter(oneContact => oneContact.name === name)

    if (filterContacts.length === 0) {
      props.onAddContact(name, phone, email)
      setName("")
      setPhone("")
      setEmail("")
    }
    else {
      console.log('duplicate name');
    }

  };


  return (
    <div>
      <section>
        <h2>Add Contact</h2>
        <ContactForm
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          handleSubmit={handleSubmit} />
      </section>
      <hr />
      <section>
        <h2>Contacts</h2>
        <TileList contacts={props.onContacts} />
      </section>
    </div>
  );
};