import {TweetService} from "../../services/tweet-service";
import {inject} from "aurelia-framework";

/**
 * Component for deleting all user tweets
 */
@inject(TweetService)
export class DeleteAllUserTweet {
  tweetService: TweetService;

  /**
   * Constructor for component
   */
  constructor(ts: TweetService) {
    this.tweetService = ts;
  }

  /**
   * Delete all user tweets function
   * @param userId User Id
   */
  deleteAllUserTweets(userId) {
    this.tweetService.deleteAllUserTweets(userId);
  }
}
