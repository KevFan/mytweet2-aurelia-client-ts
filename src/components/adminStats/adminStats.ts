import {inject} from 'aurelia-framework';
import {TweetService} from '../../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LastestTweetList, LatestFollowList, LatestUserList} from "../../services/messages";

/**
 * Admin Stats Component
 */
@inject(TweetService, EventAggregator)
export class AdminStats {
  tweetService: TweetService;
  ea: EventAggregator;
  numUsers = '';
  numTweets = '';
  numFollows = '';

  /**
   * Constructor for component
   */
  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.ea.subscribe(LastestTweetList, event => {
      this.numTweets = event.tweets.length;
    });
    this.ea.subscribe(LatestUserList, event => {
      this.numUsers = event.users.length;
    });
    this.ea.subscribe(LatestFollowList, event => {
      this.numFollows = event.follows.length;
    });
  }

  /**
   * On component attached, get all users, tweets, and follows
   */
  attached() {
    this.tweetService.getAllUsers();
    this.tweetService.getAllTweets();
    this.tweetService.getAllFollows();
  }
}
