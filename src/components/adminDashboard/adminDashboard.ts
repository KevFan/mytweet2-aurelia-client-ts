import {Follow, Tweet, User} from "../../services/models";
import {EventAggregator} from "aurelia-event-aggregator";
import {TweetService} from "../../services/tweet-service";
import {inject} from "aurelia-framework";
import * as $ from 'jquery';

/**
 * Admin Dashboard Component
 */
@inject(TweetService, EventAggregator)
export class AdminDashboard {
  user: User;
  tweetService: TweetService;
  ea: EventAggregator;
  tweets: Array<Tweet>;
  followers: Array<Follow>;

  /**
   * Constructor for admin component
   */
  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.user = ts.currentUser;
  }

  /**
   * On attached of component - get all users + set JQuery function to all different modal selection
   */
  attached() {
    this.tweetService.getAllUsers();
    $(document).ready(function () {
      $('.item').on('click', function () {
        // using the attribute data-modal to identify for what modal the button references
        let modal = $(this).attr('data-modal');
        // creating the individual event attached to click over button
        $('#' + modal + '.modal').modal(
          'show'
        );
      });
    });
  }

  /**
   * Delete all user function
   */
  deleteAllUsers() {
    this.tweetService.deleteAllFollows();
    this.tweetService.deleteAllTweets();
    this.tweetService.deleteAllUser();
  }
}
