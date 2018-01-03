import { inject } from 'aurelia-framework';
import { TweetService } from '../../services/tweet-service';
import { Tweet } from '../../services/models';
import { EventAggregator } from 'aurelia-event-aggregator';
import {LastestTweetList} from "../../services/messages";

@inject(TweetService, EventAggregator)
export class GlobalTimeLine {
  tweetService: TweetService;
  tweets: Array<Tweet>;
  ea: EventAggregator;
  isAdmin: boolean;

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.isAdmin = this.tweetService.isAdmin;
    this.ea.subscribe(LastestTweetList, event => {
      this.tweets = event.tweets;
    })
  }

  attached() {
    this.tweetService.getAllTweets();
  }

  deleteAllTweets() {
    this.tweetService.deleteAllTweets();
  }
}
