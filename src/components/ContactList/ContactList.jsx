import React from 'react';

const ContactList = ({ filteredContacts, deleteContact }) => {
  return (
    <>
      <ul>
        {filteredContacts.map(({ id, name, number }) => (
          <li key={id} className="">
            <p className="">
              {name}: {number}
            </p>
            <button
              type="buttone"
              onClick={() => {
                deleteContact(id);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;
