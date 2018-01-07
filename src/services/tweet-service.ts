import {inject} from 'aurelia-framework';
import {
  CurrentUser, Followers, Followings, LastestTweetList, LatestFollowList, LatestUserList, LoginStatus,
  UserView
} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Tweet, User} from './models';
import AsyncHttpClient from './async-http-client';

/**
 * Tweet Service to contain all calls to api
 */
@inject(EventAggregator, AsyncHttpClient)
export class TweetService {
  ea: EventAggregator;
  ac: AsyncHttpClient;
  tweets: Array<Tweet> = [];
  users: Array<User> = [];
  currentUser: User;
  viewUser: User;
  isAdmin: boolean;

  /**
   * Constructor for tweet service
   */
  constructor(ea: EventAggregator, ac: AsyncHttpClient) {
    this.ea = ea;
    this.ac = ac;
    this.ea.subscribe(LastestTweetList, event => {
      this.tweets = event.tweets;
    });
    this.ea.subscribe(LatestUserList, event => {
      this.users = event.users;
    });
    this.ea.subscribe(LoginStatus, event => {
      this.isAdmin = (event.message === 'isAdmin');
    });
  }

  /**
   * Register new user
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   * @param {string} password
   */
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
      if (!this.isAdmin) {
        this.login(email, password);
      }
    });
  }

  /**
   * Login a user/admin
   * @param email
   * @param password
   */
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

  /**
   * Logout user/admin
   */
  logout() {
    this.currentUser = null;
    this.ac.clearAuthentication();
    this.ea.publish(new LoginStatus(false));
  }

  /**
   * Return if user from previous session has logged out
   * @returns {boolean}
   */
  isAuthenticated() {
    return this.ac.isAuthenticated();
  }

  /**
   * Get all tweets
   */
  getAllTweets() {
    this.ac.get('/api/tweets').then(res => {
      console.log(res.content);
      if (res.content) {
        this.ea.publish(new LastestTweetList((res.content.length === 0), res.content));
      }
    });
  }

  /**
   * Update profile picture of user
   * @param {string} userId
   * @param {FormData} formData containing picture
   */
  updateProfilePicture(userId: string, formData: FormData) {
    this.ac.put('/api/profilePicture/' + userId, formData).then(res => {
      this.ea.publish(new CurrentUser(res.content));
    })
  }

  /**
   * Delete User profile picture
   * @param {string} userId
   */
  deleteProfilePicture(userId: string) {
    this.ac.delete('/api/profilePicture/' + userId).then(res => {
      this.ea.publish(new CurrentUser(res.content));
    })
  }

  /**
   * Delete single tweet by id
   * @param id Tweet id
   */
  deleteOneTweet(id) {
    this.ac.delete('/api/tweets/' + id).then(res => {
      console.log('Deleted tweet: ' + id, res);
      let removedTweetList = this.tweets.filter(tweet => {
        return tweet._id !== id;
      });
      this.ea.publish(new LastestTweetList((removedTweetList.length === 0), removedTweetList));
    })
  }

  /**
   * Delete all user tweets by user id
   * @param userid Id of user
   */
  deleteAllUserTweets(userid) {
    this.ac.delete('/api/tweets/users/' + userid).then(res => {
      if (this.isAdmin) {
        this.getAllTweets();
      } else {
        this.getAllUserTweets(this.currentUser._id);
      }
    })
  }

  /**
   * Add tweet
   * @param {FormData} formData containing tweet text and image if any
   */
  addTweet(formData: FormData) {
    this.ac.post('/api/tweets', formData).then(res => {
      console.log(res);
      this.tweets.push(res.content);
      this.ea.publish(new LastestTweetList(false, this.tweets));
    });
  }

  /**
   * Update user
   * @param {User} user with updated info
   */
  updateUser(user: User) {
    this.ac.put('/api/users/' + user._id, user).then(res => {
      console.log(res.content);
      if (!this.isAdmin) {
        this.currentUser = res.content;
      }
    });
  }

  /**
   * Get all user tweets
   * @param {string} userId User id to get all tweets of
   */
  getAllUserTweets(userId: string) {
    this.ac.get('/api/tweets/users/' + userId).then(res => {
      this.tweets = res.content;
      this.ea.publish(new LastestTweetList((res.content.length === 0), this.tweets));
    })
  }

  /**
   * Get user by user id
   * @param {string} userId
   */
  getUser(userId: string) {
    this.ac.get('/api/users/' + userId).then(res => {
      this.viewUser = res.content;
      this.ea.publish(new UserView(res.content));
    })
  }

  /**
   * Get followers by user id
   * @param {string} userId
   */
  getFollowers(userId: string) {
    this.ac.get('/api/follow/followers/' + userId).then(res => {
      this.ea.publish(new Followers(res.content));
    })
  }

  /**
   * Get following by user id
   * @param {string} userId
   */
  getFollowings(userId: string) {
    this.ac.get('/api/follow/following/' + userId).then(res => {
      this.ea.publish(new Followings(res.content));
    })
  }

  /**
   * Follow another user
   * @param {string} userId User id to follow
   */
  follow(userId: string) {
    this.ac.post('/api/follow', {following: userId}).then(res => {
      console.log('New follow: ', res.content);
      this.getFollowers(userId);
    })
  }

  /**
   * Un-follow another user
   * @param {string} userId User Id to un-follow
   */
  unFollow(userId: string) {
    this.ac.delete('/api/follow/' + userId).then(res => {
      this.getFollowers(userId);
    })
  }

  /**
   * Get all users
   */
  getAllUsers() {
    this.ac.get('/api/users').then(res => {
      this.ea.publish(new LatestUserList((res.content.length === 0), res.content));
    })
  }

  /**
   * Delete one user by user id
   * @param {string} userId
   */
  deleteOneUser(userId: string) {
    this.ac.delete('/api/users/' + userId).then(res => {
      this.getAllUsers();
    })
  }

  /**
   * Remove all followers by user id
   * @param {string} userId
   */
  deleteAllUserFollowers(userId: string) {
    this.ac.delete('/api/follow/followers/' + userId).then(res => {
      console.log('Removed all user followers');
      this.getAllFollows();
    })
  }

  /**
   * Remove all followings by user id
   * @param {string} userId
   */
  deleteAllUserFollowings(userId: string) {
    this.ac.delete('/api/follow/following/' + userId).then(res => {
      console.log('Removed all user followings');
      this.getAllFollows();
    })
  }

  /**
   * Delete all users
   */
  deleteAllUser() {
    this.ac.delete('/api/users').then(res => {
      console.log('Removed all users');
      this.getAllUsers();
    })
  }

  /**
   * Delete all follows
   */
  deleteAllFollows() {
    this.ac.delete('/api/follow').then(res => {
      console.log('Removed all follows')
    })
  }

  /**
   * Delete all tweets
   */
  deleteAllTweets() {
    this.ac.delete('/api/tweets').then(res => {
      console.log('Removed all tweets');
      this.getAllTweets();
    })
  }

  /**
   * Update an admin
   * @param admin Admin with updated details
   */
  updateAdmin(admin) {
    this.ac.put('/api/admins/' + admin._id, admin).then(res => {
      console.log('Update admin: ', res.content);
      this.currentUser = res.content;
    })
  }

  /**
   * Get all follows
   */
  getAllFollows() {
    this.ac.get('/api/follow').then(res => {
      this.ea.publish(new LatestFollowList(res.content));
    })
  }

  /**
   * Get all user and following tweets
   */
  getAllUserFollowingTweets() {
    this.ac.get('/api/tweets/following').then(res => {
      this.ea.publish(new LastestTweetList((res.content.length === 0), res.content));
      console.log(res.content);
    })
  }
}
