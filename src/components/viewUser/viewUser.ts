import {inject} from 'aurelia-framework';
import {TweetService} from '../../services/tweet-service';
import {User} from '../../services/models';
import {EventAggregator} from 'aurelia-event-aggregator';
import {UserView} from "../../services/messages";

/**
 * Component for viewing another user
 */
@inject(TweetService, EventAggregator)
export class ViewUser {
  tweetService: TweetService;
  user: User;
  ea: EventAggregator;
  isAdmin: boolean;

  /**
   * Constructor for view user component
   */
  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.isAdmin = this.tweetService.isAdmin;
  }

  /**
   * On activate of component, user id is passed as parameter. Using id get the user and get
   * all associated tweets, followings and followers
   * @param params User ID
   */
  activate(params) {
    console.log(params.id);
    this.tweetService.getUser(params.id);
    this.ea.subscribe(UserView, event => {
      this.user = event.user;
      this.tweetService.getAllUserTweets(this.user._id)
      this.tweetService.getFollowers(this.user._id);
      this.tweetService.getFollowings(this.user._id);
    });
  }

  /**
   * Follow a user
   * @param {string} userId
   */
  follow(userId: string) {
    this.tweetService.follow(userId);
  }

  /**
   * Un-follow a user
   * @param {string} userId
   */
  unFollow(userId: string) {
    this.tweetService.unFollow(userId);
  }
}
