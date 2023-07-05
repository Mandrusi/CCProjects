import React from "react";

export const ContactPicker = (props) => {

  return (
    <select onChange={props.onHandle} value={props.value} name={props.name}  >
      <option defaultValue="">No Contact Selected</option>
      {props.contacts.map((oneContact) => {

        return <option key={Math.floor(Math.random() * 1000)} value={JSON.stringify(oneContact)}>{oneContact.name}
        </option>
      })}

    </select>
  );
};