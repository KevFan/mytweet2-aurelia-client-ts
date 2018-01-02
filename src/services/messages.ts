import {Follow, Tweet, User} from "./models";

export class LoginStatus {
  status: boolean;
  message: string;
  constructor(status: boolean, message:string = '') {
    this.status = status;
    this.message = message;
  }
}

export class LastestTweetList {
  empty: boolean;
  tweets: Array<Tweet>;

  constructor(empty: boolean, tweets: Array<Tweet>) {
    this.empty = empty;
    this.tweets = tweets;
  }
}

export class CurrentUser {
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}

export class UserView {
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}

export class Followers {
  followers: Array<Follow>;

  constructor(followers: Array<Follow>) {
    this.followers = followers;
  }
}


export class Followings {
  followings: Array<Follow>;

  constructor(followings: Array<Follow>) {
    this.followings = followings;
  }
}
