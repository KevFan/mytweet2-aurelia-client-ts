import {Tweet} from "./models";

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
