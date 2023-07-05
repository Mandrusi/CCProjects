import React, { useState } from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom"
import Root, { ROUTES } from "./components/root/Root";
import { AppointmentsPage } from "./containers/appointmentsPage/AppointmentsPage";
import { ContactsPage } from "./containers/contactsPage/ContactsPage";

function App() {
  const [contacts, setContacts] = useState([])
  const [appointments, setAppointments] = useState([])

  const addContact = (name, phone, email) => {
    setContacts((prevContacts) => {
      const newContact = {
        name,
        phone,
        email
      }
      return [...prevContacts, newContact]
    })
  }

  const addAppointment = (name, contact, date, time) => {
    setAppointments((prevAppointments) => {
      const newAppointment = {
        name,
        contact,
        date,
        time
      }
      return [...prevAppointments, newAppointment]
    })
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Navigate to={ROUTES.CONTACTS} replace />} />
      <Route path={ROUTES.CONTACTS} element={<ContactsPage onAddContact={addContact} onContacts={contacts} /> /* Add props to ContactsPage */} />
      <Route path={ROUTES.APPOINTMENTS} element={<AppointmentsPage onContacts={contacts} onAddAppointment={addAppointment} onAppointments={appointments} /> /* Add props to AppointmentsPage */} />
    </Route>
  ));

  return (
    <RouterProvider router={router} />
  );
}

export default App;