import {Follow} from "../../services/models";
import {EventAggregator} from "aurelia-event-aggregator";
import {TweetService} from "../../services/tweet-service";
import {Followings} from "../../services/messages";
import {inject} from "aurelia-framework";

/**
 * List Following Component
 */
@inject(TweetService, EventAggregator)
export class ListFollowing {
  ea: EventAggregator;
  tweetService: TweetService;
  followings: Array<Follow>;

  /**
   * Constructor for list following component
   */
  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.ea.subscribe(Followings, event => {
      this.followings = event.followings;
    })
  }
}
