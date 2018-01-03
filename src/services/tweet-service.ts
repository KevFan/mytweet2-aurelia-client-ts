import {inject} from 'aurelia-framework';
import {
  CurrentUser, Followers, Followings, LastestTweetList, LatestUserList, LoginStatus,
  UserView
} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Tweet, User} from './models';
import AsyncHttpClient from './async-http-client';

@inject(EventAggregator, AsyncHttpClient)
export class TweetService {
  ea: EventAggregator;
  ac: AsyncHttpClient;
  tweets: Array<Tweet> = [];
  users: Array<User> = [];
  currentUser: User;
  viewUser: User;
  isAdmin: boolean;

  constructor(ea, ac) {
    this.ea = ea;
    this.ac = ac;
    this.ea.subscribe(LastestTweetList, event => {
      this.tweets = event.tweets;
    });
    this.ea.subscribe(LatestUserList, event => {
      this.users = event.users;
    });
    this.ea.subscribe(LoginStatus, event => {
      this.isAdmin = (event.message === 'isAdmin') ;
    });
  }

  register(firstName: string, lastName: string, email: string, password: string,) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    this.ac.post('/api/users', newUser).then(res => {
      console.log(res.content);
      this.users.push(res.content);
      this.ea.publish(new LatestUserList(false, this.users));
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
    this.currentUser = null;
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
      console.log('Deleted tweet: ' + id, res);
      let removedTweetList = this.tweets.filter(tweet => {
        return tweet._id !== id;
      });
      this.ea.publish(new LastestTweetList((removedTweetList.length === 0), removedTweetList));
    })
  }

  deleteAllUserTweets(userid) {
    this.ac.delete('/api/tweets/users/' + userid).then(res => {
      this.getAllUserTweets(this.currentUser._id);
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
      if (!this.isAdmin) {
        this.currentUser = res.content;
      }
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
      this.viewUser = res.content;
      this.ea.publish(new UserView(res.content));
    })
  }

  getFollowers(userId: string) {
    this.ac.get('/api/follow/followers/' + userId).then(res => {
      this.ea.publish(new Followers(res.content));
    })
  }


  getFollowings(userId: string) {
    this.ac.get('/api/follow/following/' + userId).then(res => {
      this.ea.publish(new Followings(res.content));
    })
  }

  follow(userId: string) {
    this.ac.post('/api/follow', {following: userId}).then(res => {
      console.log('New follow: ', res.content);
      this.getFollowers(userId);
    })
  }

  unFollow(userId: string) {
    this.ac.delete('/api/follow/' + userId).then(res => {
      this.getFollowers(userId);
    })
  }

  getAllUsers() {
    this.ac.get('/api/users').then(res => {
      this.ea.publish(new LatestUserList((res.content.length === 0), res.content));
    })
  }

  deleteOneUser(userId: string) {
    this.ac.delete('/api/users/' + userId).then(res => {
      this.getAllUsers();
    })
  }

  deleteAllUserFollowers(userId: string) {
    this.ac.delete('/api/follow/followers/' + userId).then(res => {
      console.log('Removed all user followers');
    })
  }

  deleteAllUserFollowings(userId: string) {
    this.ac.delete('/api/follow/following/' + userId).then(res => {
      console.log('Removed all user followings');
    })
  }

  deleteAllUser() {
    this.ac.delete('/api/users').then(res => {
      console.log('Removed all users');
      this.getAllUsers();
    })
  }

  deleteAllFollows() {
    this.ac.delete('/api/follow').then(res => {
      console.log('Removed all follows')
    })
  }

  deleteAllTweets() {
    this.ac.delete('/api/tweets').then(res => {
      console.log('Removed all tweets');
    })
  }

  updateAdmin(admin) {
    this.ac.put('/api/admins/' + admin._id, admin).then(res => {
      console.log('Update admin: ', res.content);
      this.currentUser = res.content;
    })
  }
}
