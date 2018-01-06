import {Follow} from "../../services/models";
import {EventAggregator} from "aurelia-event-aggregator";
import {TweetService} from "../../services/tweet-service";
import {Followers} from "../../services/messages";
import {inject} from "aurelia-framework";

/**
 * List Follower component
 */
@inject(TweetService, EventAggregator)
export class ListFollower {
  ea: EventAggregator;
  tweetService: TweetService;
  followers: Array<Follow>;

  /**
   * Constructor for follower component
   */
  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.ea.subscribe(Followers, event => {
      this.followers = event.followers;
    })
  }
}
