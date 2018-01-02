import { inject } from 'aurelia-framework';
import { TweetService } from '../services/tweet-service';
import { User} from '../services/models';

@inject(TweetService)
export class UpdateSettings {
  tweetService: TweetService;
  user: User;

  constructor(ts: TweetService) {
    this.tweetService = ts;
    this.user = ts.currentUser;
  }

  updateAccount() {
    this.tweetService.updateUser(this.user);
  }
}
