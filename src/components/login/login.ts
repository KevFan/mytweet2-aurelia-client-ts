import {inject} from 'aurelia-framework';
import {TweetService} from '../../services/tweet-service';

/**
 * Login Component
 */
@inject(TweetService)
export class Login {
  tweetService: TweetService;
  email = '';
  password = '';

  /**
   * Constructor for login component
   */
  constructor(ts: TweetService) {
    this.tweetService = ts;
  }

  /**
   * Login function
   * @param e Event
   */
  login(e) {
    console.log(`Trying to log in ${this.email}`);
    this.tweetService.login(this.email, this.password);
  }
}
