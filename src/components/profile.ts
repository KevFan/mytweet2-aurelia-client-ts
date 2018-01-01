import {User} from "../services/models";
import {EventAggregator} from "aurelia-event-aggregator";
import {TweetService} from "../services/tweet-service";
import {CurrentUser} from "../services/messages";

export class Profile {
  user: User;
  ea: EventAggregator;
  tweetService: TweetService;

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.user = JSON.parse(localStorage.mytweet).user;
  }
}
