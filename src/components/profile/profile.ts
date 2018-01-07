import {User} from "../../services/models";
import {EventAggregator} from "aurelia-event-aggregator";
import {TweetService} from "../../services/tweet-service";
import {CurrentUser, UserView} from "../../services/messages";
import {inject} from "aurelia-framework";

/**
 * User profile component
 */
@inject(TweetService, EventAggregator)
export class Profile {
  user: User;
  ea: EventAggregator;
  tweetService: TweetService;
  picture;
  isCurrentUser: boolean;

  /**
   * Constructor for profile component
   * @param {TweetService} ts
   * @param {EventAggregator} ea
   */
  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.user = ts.currentUser;
    this.ea.subscribe(UserView, event => {
      this.user = event.user;
      this.isCurrentUser = false;
    });
  }

  /**
   * On attached, if viewing another user, set user to view user otherwise set to current user
   */
  attached() {
    if (this.tweetService.viewUser) {
      this.isCurrentUser = false;
    } else {
      this.isCurrentUser = true;
    }
  }

  /**
   * Update profile picture function
   * @param {string} userId User id
   */
  updateProfilePicture(userId: string) {
    let formData = new FormData();
    formData.append('image', this.picture[0]);
    this.tweetService.updateProfilePicture(userId, formData);
    this.updateUserAndTweets();
  }

  /**
   * Delete profile picture function
   * @param {string} userId User Id
   */
  deleteProfilePicture(userId: string) {
    this.tweetService.deleteProfilePicture(userId);
    this.updateUserAndTweets();
  }

  /**
   * On delete or update of profile picture, get all user tweets for see change in tweets also
   */
  updateUserAndTweets() {
    this.ea.subscribe(CurrentUser, event => {
      this.user = event.user;
      this.tweetService.getAllUserTweets(this.user._id);
    })
  }
}
