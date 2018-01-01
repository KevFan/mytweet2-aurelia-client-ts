import {User} from "../services/models";
import {EventAggregator} from "aurelia-event-aggregator";
import {TweetService} from "../services/tweet-service";
import {CurrentUser, LastestTweetList} from "../services/messages";
import AsyncHttpClient from "../services/async-http-client";
import {inject} from "aurelia-framework";

@inject(TweetService, EventAggregator)
export class Dashboard {
  user: User;
  tweetService: TweetService;
  ea: EventAggregator;

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.user = ts.currentUser;
  }

  deleteAllUserTweets(userId) {
    this.tweetService.deleteAllUserTweets(userId);
  }
}
