import React from "react";

export const Tile = (props) => {
  return (
    <div className="tile-container">
      <p className="tile-title">{props.name}</p>
      {Object.entries(props.description).map(([key, value]) => {
        if (key !== "name") {
          if (key === "contact") {
            return (
              <div key={Math.floor(Math.random() * 1000)}>
                <p>
                  contact: {value.name}
                </p>
                {Object.entries(value).map(([contactKey, contactValue]) => {
                  if (contactKey !== "name") {
                    return (
                      <p key={Math.floor(Math.random() * 1000)}>
                        {contactKey}: {contactValue}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            );
          } else {
            return (
              <p key={Math.floor(Math.random() * 1000)}>
                <strong>{key}:</strong> {value}
              </p>
            );
          }
        }
        return null;
      })}
    </div>
  );
};
