import { TweetService } from '../services/tweet-service';
import { inject } from 'aurelia-framework';

@inject(TweetService)
export class Logout {
  tweetService: TweetService;

  constructor(tweetService: TweetService) {
    this.tweetService = tweetService;
  }

  logout() {
    console.log('logging out');
    this.tweetService.logout();
  }
}
