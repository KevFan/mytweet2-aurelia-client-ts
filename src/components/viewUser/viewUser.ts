import {inject} from 'aurelia-framework';
import {TweetService} from '../../services/tweet-service';
import {User} from '../../services/models';
import {EventAggregator} from 'aurelia-event-aggregator';
import {UserView} from "../../services/messages";

@inject(TweetService, EventAggregator)
export class ViewUser {
  tweetService: TweetService;
  user: User;
  ea: EventAggregator;

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
  }

  activate(params) {
    console.log(params.id);
    this.tweetService.getUser(params.id);
    this.ea.subscribe(UserView, event => {
      this.user = event.user;
      this.tweetService.getAllUserTweets(this.user._id)
      this.tweetService.getFollowers(this.user._id);
    });
  }
}
