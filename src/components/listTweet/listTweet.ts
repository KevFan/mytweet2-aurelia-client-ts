import { inject } from 'aurelia-framework';
import { TweetService } from '../../services/tweet-service';
import { Tweet } from '../../services/models';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LastestTweetList } from '../../services/messages';

@inject(TweetService, EventAggregator)
export class TimeLine {
  tweetService: TweetService;
  tweets: Array<Tweet>;
  ea: EventAggregator;
  empty: boolean;

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.ea.subscribe(LastestTweetList, event => {
      this.empty = event.empty;
      this.tweets = event.tweets;
    })
  }

  // attached() {
  //   this.tweetService.getAllTweets();
  //   this.ea.subscribe(LastestTweetList, event => {
  //     this.empty = event.empty;
  //     this.tweets = event.tweets;
  //   })
  // }

  deleteTweet(id) {
    this.tweetService.deleteOneTweet(id);
    this.ea.subscribe(LastestTweetList, event => {
      this.empty = event.empty;
      this.tweets = event.tweets;
    })
  }

  isCurrentUser(userId: string) {
    return userId === this.tweetService.currentUser._id;
  }

  viewUser(userId) {
    if (userId === this.tweetService.currentUser._id) {
      location.assign('#/');
    } else {
      location.assign('#/viewUser/' + userId);
    }
  }
}
