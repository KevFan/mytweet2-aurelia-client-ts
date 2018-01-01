import { inject } from 'aurelia-framework';
import { LoginStatus, LastestTweetList } from './messages';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Tweet, User } from './models';
import AsyncHttpClient from './async-http-client';


@inject(EventAggregator, AsyncHttpClient)
export class TweetService {
  ea: EventAggregator;
  ac: AsyncHttpClient;
  tweets: Array<Tweet> = [];

  constructor(ea, ac) {
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

  getAllTweets() {
    this.ac.get('/api/tweets').then(res => {
      console.log(res.content);
      if (res.content) {
        this.tweets = res.content;
        this.ea.publish(new LastestTweetList((res.content.length === 0), res.content));
      }
    });
  }
}
