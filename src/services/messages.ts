import {Tweet, User} from "./models";

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
