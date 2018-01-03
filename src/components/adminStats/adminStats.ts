import { inject } from 'aurelia-framework';
import { TweetService } from '../../services/tweet-service';
import { Tweet } from '../../services/models';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LastestTweetList, LatestFollowList, LatestUserList} from "../../services/messages";

@inject(TweetService, EventAggregator)
export class AdminStats {
  tweetService: TweetService;
  ea: EventAggregator;
  numUsers = '';
  numTweets = '';
  numFollows = '';

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

  attached() {
    this.tweetService.getAllUsers();
    this.tweetService.getAllTweets();
    this.tweetService.getAllFollows();
  }
}
