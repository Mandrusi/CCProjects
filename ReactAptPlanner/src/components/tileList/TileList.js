import React from "react";
import { Tile } from '../tile/Tile'

export const TileList = (props) => {

  let propsToMap = props.appointments ? props.appointments : props.contacts
  let propsDescription = []

  if (props.appointments) {
    propsDescription.push(props.appointments)
  }
  else {
    propsDescription.push(props.contacts)
  }



  return (
    <div>
      <ul>
        {
          propsToMap.map((onePropObject) => {
            return (
              <li key={Math.floor(Math.random() * 1000)}>
                <Tile name={onePropObject.name} description={onePropObject} />
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};