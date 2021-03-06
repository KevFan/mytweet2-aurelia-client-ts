/**
 * User Model
 */
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
  _id?: string;
}

/**
 * Admin model
 */
export interface Admin {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id?: string;
}

/**
 * Tweet model
 */
export interface Tweet {
  tweetText: string;
  tweetDate?: string;
  tweetUser?: User;
  tweetImage: string;
  marker: {
    id: number;
    coords: {
      latitude: number;
      longitude: number;
    };
  };
  _id?: string;
}

/**
 * Follow Model
 */
export interface Follow {
  follower: User;
  following: User;
  _id?: string;
}
