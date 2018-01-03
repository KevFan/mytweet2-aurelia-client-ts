import { inject } from 'aurelia-framework';
import { TweetService } from '../../services/tweet-service';
import * as $ from 'jquery';

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

  register() {
    this.tweetService.register(this.firstName, this.lastName, this.email, this.password);
    if (this.tweetService.currentUser) {
      $('#addUser').modal('hide');
      // this.tweetService.getAllUsers();
    } else {
      this.tweetService.login(this.email, this.password);
    }
  }
}
