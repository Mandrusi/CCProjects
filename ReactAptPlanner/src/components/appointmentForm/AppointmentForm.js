import React from "react";
import { ContactPicker } from "../contactPicker/ContactPicker";

const getTodayString = () => {
  const [month, day, year] = new Date()
    .toLocaleDateString("en-US")
    .split("/");
  console.log('today string: ' + JSON.stringify(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`));

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

export const AppointmentForm = ({
  contacts,
  setContacts,
  name,
  setName,
  date,
  setDate,
  time,
  setTime,
  handleSubmit,
  chosenContact,
  setChosenContact
}) => {


  const todayStr = getTodayString()
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input value={name} id="name" type="text" onChange={(e) => { setName(e.target.value) }} />

      <label htmlFor="date">Date</label>
      <input min={todayStr} value={date} id="date" type="date" onChange={(e) => { setDate(e.target.value) }} />

      <label htmlFor="time">Time</label>
      <input value={time} id="time" type="time" onChange={(e) => { setTime(e.target.value) }} />

      <ContactPicker value={JSON.stringify(chosenContact)} name={name} contacts={contacts} onHandle={(e) => { setChosenContact(JSON.parse(e.target.value)) }} />
      <button>Submit</button>
    </form>
  );
};