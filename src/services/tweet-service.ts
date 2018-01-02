import {inject} from 'aurelia-framework';
import {LoginStatus, LastestTweetList, CurrentUser, UserView} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Tweet, User} from './models';
import AsyncHttpClient from './async-http-client';


@inject(EventAggregator, AsyncHttpClient)
export class TweetService {
  ea: EventAggregator;
  ac: AsyncHttpClient;
  tweets: Array<Tweet> = [];
  currentUser: User;

  constructor(ea, ac) {
    this.ea = ea;
    this.ac = ac;
  }


  register(firstName: string,
           lastName: string,
           email: string,
           password: string,) {
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
    this.ea.subscribe(CurrentUser, event => {
      this.currentUser = event.user;
    })
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

  updateProfilePicture(userId: string, formData: FormData) {
    this.ac.put('/api/profilePicture/' + userId, formData).then(res => {
      this.ea.publish(new CurrentUser(res.content));
    })
  }

  deleteProfilePicture(userId: string) {
    this.ac.delete('/api/profilePicture/' + userId).then(res => {
      this.ea.publish(new CurrentUser(res.content));
    })
  }

  deleteOneTweet(id) {
    this.ac.delete('/api/tweets/' + id).then(res => {
      this.getAllTweets();
    })
  }

  deleteAllUserTweets(userid) {
    this.ac.delete('/api/tweets/users/' + userid).then( res => {
      this.getAllTweets();
    })
  }

  addTweet(formData: FormData) {
    this.ac.post('/api/tweets', formData).then(res => {
      console.log(res);
      this.tweets.push(res.content);
      this.ea.publish(new LastestTweetList(false, this.tweets));
    });
  }

  updateUser(user: User) {
    this.ac.put('/api/users/' + user._id, user).then(res => {
      console.log(res.content);
      this.currentUser = res.content;
    });
  }

  getAllUserTweets(userId: string) {
    this.ac.get('/api/tweets/users/' + userId).then(res => {
      this.tweets = res.content;
      this.ea.publish(new LastestTweetList((res.content.length === 0), this.tweets));
    })
  }

  getUser(userId: string) {
    this.ac.get('/api/users/' + userId).then(res => {
      this.ea.publish(new UserView(res.content));
    })
  }
}
