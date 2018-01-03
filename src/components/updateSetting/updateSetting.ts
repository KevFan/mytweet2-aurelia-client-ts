import { inject } from 'aurelia-framework';
import { TweetService } from '../../services/tweet-service';
import { User} from '../../services/models';
import {EventAggregator} from "aurelia-event-aggregator";
import * as $ from 'jquery';

@inject(TweetService, EventAggregator)
export class UpdateSettings {
  tweetService: TweetService;
  user: User;
  ea: EventAggregator;
  adminView: boolean;

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.user = ts.currentUser;
    this.ea = ea;
  }

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

  updateAccount() {
    $('#editUser'+this.user._id).modal('hide');
    if(this.tweetService.isAdmin && !this.adminView) {
      this.tweetService.updateAdmin(this.user);
    } else {
      this.tweetService.updateUser(this.user);
    }
  }
}
