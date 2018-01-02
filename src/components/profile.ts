import {User} from "../services/models";
import {EventAggregator} from "aurelia-event-aggregator";
import {TweetService} from "../services/tweet-service";
import {CurrentUser, LastestTweetList} from "../services/messages";
import AsyncHttpClient from "../services/async-http-client";
import {inject} from "aurelia-framework";

@inject(TweetService, EventAggregator)
export class Profile {
  user: User;
  ea: EventAggregator;
  tweetService: TweetService;
  picture;

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.user = ts.currentUser;
  }

  updateProfilePicture(userId: string) {
    let formData = new FormData();
    formData.append('image', this.picture[0]);
    this.tweetService.updateProfilePicture(userId, formData);
    this.updateUserAndTweets();
  }

  deleteProfilePicture(userId: string) {
    this.tweetService.deleteProfilePicture(userId);
    this.updateUserAndTweets();
  }

  updateUserAndTweets() {
    this.ea.subscribe(CurrentUser, event => {
      this.user = event.user;
      this.tweetService.getAllUserTweets(this.user._id);
    })
  }
}
