import React from 'react';
import { Form } from './FormExample';
import { ContactList } from './FormExample2'
import { Wallet } from './wallets';



export const App = () => (
  <div>
    <div className='title'>
      <img className='photoLogo' src="https://seeklogo.com/images/M/meteor-logo-513B96BFB2-seeklogo.com.png" alt="Girl in a jacket" width="55" height="55" />
      <h1 className='titlePpal'>Meteor Wallet</h1>
      <h2 className='madeBy'>Made by</h2>
      <img className='photoJuan' src="https://avatars.githubusercontent.com/u/114958703?v=4" alt="Girl in a jacket" width="80" height="80" />
    </div>

    <Wallet />

    <Form />

    <ContactList />

  </div>
);
