import { inject } from 'aurelia-framework';
import Fixtures from './fixtures';
import { LoginStatus } from './messages';
import { EventAggregator } from 'aurelia-event-aggregator';
import {  User } from './models';
import AsyncHttpClient from './async-http-client';


@inject(Fixtures, EventAggregator, AsyncHttpClient)
export class DonationService {
  ea: EventAggregator;
  ac: AsyncHttpClient;

  constructor(data, ea, ac) {
    this.ea = ea;
    this.ac = ac;
  }


  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    this.ac.post('/api/users', newUser).then(res => {
      console.log(res.content);
    });
  }

  login(email, password) {
    const user = {
      email: email,
      password: password
    };
    this.ac.authenticate('/api/users/authenticate', user);
  }

  logout() {
    this.ac.clearAuthentication();
    this.ea.publish(new LoginStatus(false));
  }

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }
}
