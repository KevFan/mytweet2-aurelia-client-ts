import { inject } from 'aurelia-framework';
import { TweetService } from '../../services/tweet-service';
import { User} from '../../services/models';
import {EventAggregator} from "aurelia-event-aggregator";
import {LoginStatus} from "../../services/messages";

@inject(TweetService, EventAggregator)
export class UpdateSettings {
  tweetService: TweetService;
  user: User;
  ea: EventAggregator;

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.user = ts.currentUser;
    this.ea = ea;
  }

  updateAccount() {
    if(this.tweetService.isAdmin) {
      this.tweetService.updateAdmin(this.user);
    } else {
      this.tweetService.updateUser(this.user);
    }
  }
}
