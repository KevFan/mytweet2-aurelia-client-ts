import {User} from "../services/models";
import {EventAggregator} from "aurelia-event-aggregator";
import {TweetService} from "../services/tweet-service";
import {CurrentUser} from "../services/messages";
import {inject} from "aurelia-framework";

@inject(TweetService, EventAggregator)
export class Profile {
  user: User;
  ea: EventAggregator;
  tweetService: TweetService;
  picture;
  isCurrentUser: boolean;

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
  }

  attached() {
    if (this.tweetService.viewUser) {
      this.user = this.tweetService.viewUser;
      this.isCurrentUser = false;
    } else {
      this.isCurrentUser = true;
      this.user = this.tweetService.currentUser;
    }
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
