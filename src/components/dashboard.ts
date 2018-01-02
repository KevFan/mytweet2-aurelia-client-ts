import {Tweet, User} from "../services/models";
import {EventAggregator} from "aurelia-event-aggregator";
import {TweetService} from "../services/tweet-service";
import {CurrentUser, LastestTweetList} from "../services/messages";
import AsyncHttpClient from "../services/async-http-client";
import {inject} from "aurelia-framework";
import * as $ from 'jquery';

@inject(TweetService, EventAggregator)
export class Dashboard {
  user: User;
  tweetService: TweetService;
  ea: EventAggregator;
  tweets: Array<Tweet>;

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.user = ts.currentUser;
  }

  deleteAllUserTweets(userId) {
    this.tweetService.deleteAllUserTweets(userId);
  }

  attached() {
    this.tweetService.getAllUserTweets(this.user._id);

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
}
