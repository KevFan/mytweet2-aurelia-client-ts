import {TweetService} from '../../services/tweet-service';
import {inject} from 'aurelia-framework';

/**
 * Logout Component
 */
@inject(TweetService)
export class Logout {
  tweetService: TweetService;

  /**
   * Constructor for logout component
   * @param {TweetService} tweetService
   */
  constructor(tweetService: TweetService) {
    this.tweetService = tweetService;
  }

  /**
   * Logout function
   */
  logout() {
    console.log('logging out');
    this.tweetService.logout();
  }
}
