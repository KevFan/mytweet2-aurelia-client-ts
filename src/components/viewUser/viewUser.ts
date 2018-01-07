import {inject} from 'aurelia-framework';
import {TweetService} from '../../services/tweet-service';
import {Follow, User} from '../../services/models';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Followers, UserView} from "../../services/messages";

/**
 * Component for viewing another user
 */
@inject(TweetService, EventAggregator)
export class ViewUser {
  tweetService: TweetService;
  user: User;
  ea: EventAggregator;
  isAdmin: boolean;
  followers: Array<Follow>;
  alreadyFollowing = false;

  /**
   * Constructor for view user component
   */
  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.isAdmin = this.tweetService.isAdmin;
    this.ea.subscribe(Followers, event => {
      this.followers = event.followers;
      for (let follow of this.followers) {
        if (follow.follower._id == this.tweetService.currentUser._id) {
          this.alreadyFollowing = true;
          break;
        }
      }
    })
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
    this.alreadyFollowing = true;
  }

  /**
   * Un-follow a user
   * @param {string} userId
   */
  unFollow(userId: string) {
    this.tweetService.unFollow(userId);
    this.alreadyFollowing = false;
  }
}
