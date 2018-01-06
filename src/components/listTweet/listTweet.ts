import {inject} from 'aurelia-framework';
import {TweetService} from '../../services/tweet-service';
import {Tweet} from '../../services/models';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LastestTweetList} from '../../services/messages';

/**
 * TimeLine / List Tweet component
 */
@inject(TweetService, EventAggregator)
export class TimeLine {
  tweetService: TweetService;
  tweets: Array<Tweet>;
  ea: EventAggregator;
  empty: boolean;

  /**
   * Constructor for List Tweet Component
   */
  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.ea.subscribe(LastestTweetList, event => {
      this.empty = event.empty;
      this.tweets = event.tweets;
    })
  }

  /**
   * Delete one tweet by id function
   * @param id Tweet Id
   */
  deleteTweet(id) {
    this.tweetService.deleteOneTweet(id);
  }

  /**
   * Function to determine if userId is current user to show delete tweet icon
   * @param {string} userId
   * @returns {boolean}
   */
  isCurrentUser(userId: string) {
    return userId === this.tweetService.currentUser._id;
  }
}
