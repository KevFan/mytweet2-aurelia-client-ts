import {inject} from 'aurelia-framework';
import {TweetService} from '../../services/tweet-service';
import {Tweet, User} from '../../services/models';
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
  filter: '';
  originalTweetList: Array<Tweet>;

  /**
   * Constructor for global time line component
   */
  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.isAdmin = this.tweetService.isAdmin;
    this.ea.subscribe(LastestTweetList, event => {
      this.tweets = event.tweets;
      this.originalTweetList = event.tweets;
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

  /**
   * Filter displayed tweets based on entered filter text
   * @param {string} filterText
   */
  filterTweets(filterText: string) {
    this.tweets = this.originalTweetList.filter(tweet => {
      return tweet.tweetText.toLowerCase().indexOf(filterText) != -1 || tweet.tweetDate.toLowerCase().indexOf(filterText) != -1
        || tweet.tweetUser.firstName.toLowerCase().indexOf(filterText) != -1 || tweet.tweetUser.lastName.toLowerCase().indexOf(filterText) != -1;
    });
  }
}
