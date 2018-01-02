import {Follow, User} from "../../services/models";
import {EventAggregator} from "aurelia-event-aggregator";
import {TweetService} from "../../services/tweet-service";
import {CurrentUser, Followers, Followings} from "../../services/messages";
import {inject} from "aurelia-framework";

@inject(TweetService, EventAggregator)
export class Profile {
  ea: EventAggregator;
  tweetService: TweetService;
  followings: Array<Follow>

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.ea.subscribe(Followings, event => {
      this.followings = event.followings;
    })
  }

  viewUser(userId) {
    location.assign('#/viewUser/' + userId);
  }
}
