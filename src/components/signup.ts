import { inject } from 'aurelia-framework';
import { TweetService } from '../services/tweet-service';

@inject(TweetService)
export class Signup {
  tweetService: TweetService;

  firstName = 'Marge';
  lastName = 'Simpson';
  email = 'marge@simpson.com';
  password = 'secret';

  constructor(ds) {
    this.tweetService = ds;
  }

  register(e) {
    this.tweetService.register(
      this.firstName,
      this.lastName,
      this.email,
      this.password,
    );
    this.tweetService.login(this.email, this.password);
  }
}
