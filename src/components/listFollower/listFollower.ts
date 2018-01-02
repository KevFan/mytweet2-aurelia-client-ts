import {Follow, User} from "../../services/models";
import {EventAggregator} from "aurelia-event-aggregator";
import {TweetService} from "../../services/tweet-service";
import {CurrentUser, Followers} from "../../services/messages";
import {inject} from "aurelia-framework";

@inject(TweetService, EventAggregator)
export class ListFollower {
  ea: EventAggregator;
  tweetService: TweetService;
  followers: Array<Follow>

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.ea.subscribe(Followers, event => {
      this.followers = event.followers;
    })
  }

  viewUser(userId) {
    if (userId === this.tweetService.currentUser._id) {
      location.assign('#/');
    } else {
      location.assign('#/viewUser/' + userId);
    }
  }
}
