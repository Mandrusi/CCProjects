import React, { useState, useEffect } from "react";

import { AppointmentForm } from "../../components/appointmentForm/AppointmentForm";
import { TileList } from "../../components/tileList/TileList";

export const AppointmentsPage = (props) => {
  const [name, setName] = useState("")
  const [contacts, setContacts] = useState([])
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [chosenContact, setChosenContact] = useState("")

  useEffect(() => {
    setContacts(props.onContacts)
  }, [props.onContacts])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length !== 0) {
      props.onAddAppointment(name, chosenContact, date, time)
      setName("")
      setDate("")
      setTime("")
      setChosenContact("")

    }
    else {
      console.log('name field is empty');
    }

  };

  return (
    <div>
      <section>
        <h2>Add Appointment</h2>
        <AppointmentForm
          contacts={contacts}
          name={name}
          setName={setName}
          setContacts={setContacts}
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          handleSubmit={handleSubmit}
          chosenContact={chosenContact}
          setChosenContact={setChosenContact}
        />
      </section>
      <hr />
      <section>
        <h2>Appointments</h2>

        <TileList appointments={props.onAppointments} />
      </section>
    </div>
  );
};