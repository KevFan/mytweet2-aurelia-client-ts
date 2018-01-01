import { inject } from 'aurelia-framework';
import { TweetService } from '../services/tweet-service';
import { Tweet } from '../services/models';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LastestTweetList } from '../services/messages';

@inject(TweetService, EventAggregator)
export class TimeLine {
  tweetService: TweetService;
  tweets: Array<Tweet>;
  ea: EventAggregator;
  empty: boolean;

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
  }

  attached() {
    this.tweetService.getAllTweets();
    this.ea.subscribe(LastestTweetList, event => {
      this.empty = event.empty;
      this.tweets = event.tweets;
    })
  }
}
