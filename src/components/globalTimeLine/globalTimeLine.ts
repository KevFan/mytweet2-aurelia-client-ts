import {inject} from 'aurelia-framework';
import {TweetService} from '../../services/tweet-service';
import {Tweet} from '../../services/models';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LastestTweetList} from "../../services/messages";

/**
 * Global Time Line Component
 */
@inject(TweetService, EventAggregator)
export class GlobalTimeLine {
  tweetService: TweetService;
  tweets: Array<Tweet>;
  ea: EventAggregator;
  isAdmin: boolean;

  /**
   * Constructor for global time line component
   */
  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.isAdmin = this.tweetService.isAdmin;
    this.ea.subscribe(LastestTweetList, event => {
      this.tweets = event.tweets;
    })
  }

  /**
   * On component attached - get all tweets
   */
  attached() {
    this.tweetService.getAllTweets();
  }

  /**
   * Delete all tweets function
   */
  deleteAllTweets() {
    this.tweetService.deleteAllTweets();
  }
}
