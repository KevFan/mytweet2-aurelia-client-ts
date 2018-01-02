import {Follow, Tweet, User} from "../../services/models";
import {EventAggregator} from "aurelia-event-aggregator";
import {TweetService} from "../../services/tweet-service";
import {CurrentUser, Followers, LastestTweetList} from "../../services/messages";
import AsyncHttpClient from "../../services/async-http-client";
import {inject} from "aurelia-framework";
import * as $ from 'jquery';

@inject(TweetService, EventAggregator)
export class AdminDashboard {
  user: User;
  tweetService: TweetService;
  ea: EventAggregator;
  tweets: Array<Tweet>;
  followers: Array<Follow>

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.user = ts.currentUser;
  }

  attached() {
    this.tweetService.getAllUsers();
    $(document).ready(function () {
      $('.item').on('click', function(){
        // using the attribute data-modal to identify for what modal the button references
        let modal = $(this).attr('data-modal');
        // creating the individual event attached to click over button
        $('#'+modal+'.modal').modal(
          'show'
        );
      });
    });
  }

  deleteAllUsers() {
    this.tweetService.deleteAllUser();
  }
}
