import {User} from "../../services/models";
import {EventAggregator} from "aurelia-event-aggregator";
import {TweetService} from "../../services/tweet-service";
import {inject} from "aurelia-framework";
import * as $ from 'jquery';

/**
 * User Dashboard Component
 */
@inject(TweetService, EventAggregator)
export class Dashboard {
  user: User;
  tweetService: TweetService;
  ea: EventAggregator;

  /**
   * Constructor for dashboard component
   */
  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.user = ts.currentUser;
  }

  /**
   * Delete all user tweets
   * @param userId User ID
   */
  deleteAllUserTweets(userId) {
    this.tweetService.deleteAllUserTweets(userId);
  }

  /**
   * Component attached set view user to null, get current user followers, followings and merged
   * user and following tweets
   */
  attached() {
    this.tweetService.viewUser = null;
    this.tweetService.getFollowers(this.user._id);
    this.tweetService.getFollowings(this.user._id);
    this.tweetService.getAllUserFollowingTweets();

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
}
