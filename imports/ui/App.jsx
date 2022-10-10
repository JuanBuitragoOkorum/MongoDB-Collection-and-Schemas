import React from 'react';
import { Form } from './FormExample';
import { ContactList } from './FormExample2'
import { Wallet } from './wallets';



export const App = () => (
  <div>
    <Wallet/>
    <h1 className='title'>Meteor Wallet </h1>
    <Form />
    <hr />
    <ContactList />
  </div>
);
