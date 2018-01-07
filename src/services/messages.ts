import {Follow, Tweet, User} from "./models";

/**
 * Message for event aggregator for login status
 */
export class LoginStatus {
  status: boolean;
  message: string;

  constructor(status: boolean, message: string = '') {
    this.status = status;
    this.message = message;
  }
}

/**
 * Message for event aggregator for latest tweet listing
 */
export class LastestTweetList {
  empty: boolean;
  tweets: Array<Tweet>;

  constructor(empty: boolean, tweets: Array<Tweet>) {
    this.empty = empty;
    this.tweets = tweets;
  }
}

/**
 * Message for event aggregator for current user
 */
export class CurrentUser {
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}

/**
 * Message for event aggregator for viewing another user profile
 */
export class UserView {
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}

/**
 * Message for event aggregator for latest followers listing
 */
export class Followers {
  followers: Array<Follow>;

  constructor(followers: Array<Follow>) {
    this.followers = followers;
  }
}

/**
 * Message for event aggregator for latest following listing
 */
export class Followings {
  followings: Array<Follow>;

  constructor(followings: Array<Follow>) {
    this.followings = followings;
  }
}

/**
 * Message for event aggregator for latest user listing
 */
export class LatestUserList {
  empty: boolean;
  users: Array<User>;

  constructor(empty: boolean, users: Array<User>) {
    this.empty = empty;
    this.users = users;
  }
}

/**
 * Message for event aggregator for latest follow listing
 */
export class LatestFollowList {
  follows: Array<Follow>;

  constructor(follows: Array<Follow>) {
    this.follows = follows;
  }
}
