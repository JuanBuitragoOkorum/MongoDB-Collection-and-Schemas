import React from 'react';
import { Form } from './FormExample';
import { ContactList } from './FormExample2'
import { Wallet } from './wallets';



export const App = () => (
  <div>
    <Wallet />
    <div className='title'>
      <h1 >Meteor Wallet by</h1>
      <img className='photoJuan' src="https://avatars.githubusercontent.com/u/114958703?v=4" alt="Girl in a jacket" width="70" height="70" />
    </div>
    <Form />
    <hr />
    <ContactList />

  </div>
);
