import {TweetService} from "../../services/tweet-service";
import {inject} from "aurelia-framework";

@inject(TweetService)
export class Dashboard {
  tweetService: TweetService;

  constructor(ts: TweetService) {
    this.tweetService = ts;
  }

  deleteAllUserTweets(userId) {
    this.tweetService.deleteAllUserTweets(userId);
  }
}
