import { inject } from 'aurelia-framework';
import Fixtures from './fixtures';
import { TotalUpdate, LoginStatus } from './messages';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Candidate, Donation, User } from './models';
import AsyncHttpClient from './async-http-client';


@inject(Fixtures, EventAggregator, AsyncHttpClient)
export class DonationService {
  ea: EventAggregator;
  ac: AsyncHttpClient;
  donations: Array<Donation> = [];
  methods: Array<string> = [];
  candidates: Array<Candidate> = [];
  users: Map<string, User> = new Map();
  total = 0;

  constructor(data, ea, ac) {
    this.methods = data.methods;
    this.ea = ea;
    this.ac = ac;
    // this.getDonations();
  }

  donate(amount: number, method: string, candidate: Candidate) {
    const donation = {
      amount: amount,
      method: method,
    };
    this.ac
      .post('/api/candidates/' + candidate._id + '/donations', donation)
      .then(res => {
        let returnedDonation = res.content as Donation;
        returnedDonation.candidate = candidate;
        this.donations.push(returnedDonation);
        console.log(
          `${amount} donated to ${candidate.firstName} ${
            candidate.lastName
            } : ${method}`,
        );

        this.total = this.total + amount;
        console.log('Total so far ' + this.total);
        this.ea.publish(new TotalUpdate(this.total));
      });
  }

  addCandidate(firstName: string, lastName: string, office: string) {
    const candidate = {
      firstName: firstName,
      lastName: lastName,
      office: office,
    };
    this.ac.post('/api/candidates', candidate).then(res => {
      this.candidates.push(res.content);
    });
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
      this.getUsers();
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

  getCandidates() {
    this.ac.get('/api/candidates').then(res => {
      this.candidates = res.content;
    });
  }

  // getDonations() {
  //   this.ac.get('/api/donations').then(res => {
  //     this.donations = res.content;
  //   });
  //   for (let donation of this.donations) {
  //     this.total =+ donation.amount;
  //   }
  //   // this.ea.publish(new TotalUpdate(this.total));
  // }


  getUsers() {
    this.ac.get('/api/users').then(res => {
      const users = res.content as Array<User>;
      users.forEach(user => {
        this.users.set(user.email, user);
      });
    });
  }

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }
}
