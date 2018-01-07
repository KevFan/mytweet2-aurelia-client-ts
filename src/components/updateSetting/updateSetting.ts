import {inject} from 'aurelia-framework';
import {TweetService} from '../../services/tweet-service';
import {User} from '../../services/models';
import {EventAggregator} from "aurelia-event-aggregator";
import * as $ from 'jquery';

/**
 * Update Settings Component
 */
@inject(TweetService, EventAggregator)
export class UpdateSettings {
  tweetService: TweetService;
  user: User;
  ea: EventAggregator;
  adminView: boolean;

  /**
   * Constructor for updating settings component
   */
  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.user = ts.currentUser;
    this.ea = ea;
  }

  /**
   * On component activation, user if passed to component, if user has an email, admin is viewing
   * the settings of a user
   * @param user User to update
   */
  activate(user) {
    console.log('activate', user);
    // if the user.email property is truthy
    if (user.email) {
      this.user = user;
      this.adminView = true;
    } else {
      this.adminView = false;
    }
  }

  /**
   * Update account function - for updating user or admin settings
   */
  updateAccount() {
    $('#editUser' + this.user._id).modal('hide');
    if (this.tweetService.isAdmin && !this.adminView) {
      this.tweetService.updateAdmin(this.user);
    } else {
      this.tweetService.updateUser(this.user);
    }
  }
}
