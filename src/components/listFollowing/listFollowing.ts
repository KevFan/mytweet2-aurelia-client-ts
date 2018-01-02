import {Follow} from "../../services/models";
import {EventAggregator} from "aurelia-event-aggregator";
import {TweetService} from "../../services/tweet-service";
import {Followings} from "../../services/messages";
import {inject} from "aurelia-framework";

@inject(TweetService, EventAggregator)
export class ListFollowing {
  ea: EventAggregator;
  tweetService: TweetService;
  followings: Array<Follow>;

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.ea.subscribe(Followings, event => {
      this.followings = event.followings;
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
