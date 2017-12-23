import React from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import BookingSearch from './BookingSearch';

const Router = () => (
  <BrowserRouter>
    <div>
      <Route path="/" component={BookingSearch}/>
      <Route path="/bookings/:id" component={BookingSearch}/>
    </div>
  </BrowserRouter>
)

export default Router;
