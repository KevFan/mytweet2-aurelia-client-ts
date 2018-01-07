import {Follow, Tweet, User} from "../../services/models";
import {EventAggregator} from "aurelia-event-aggregator";
import {TweetService} from "../../services/tweet-service";
import {inject} from "aurelia-framework";
import {LatestUserList} from "../../services/messages";

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
  users: Array<User>;
  filter: '';
  originalUserList: Array<User>;

  /**
   * Constructor for admin component
   */
  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.user = ts.currentUser;
    this.ea.subscribe(LatestUserList, event => {
      this.users = event.users;
      this.originalUserList = event.users;
    })
  }

  /**
   * On attached of component - get all users + set JQuery function to all different modal selection
   */
  attached() {
    this.tweetService.getAllUsers();
    this.filter = '';
  }

  /**
   * Delete all user function
   */
  deleteAllUsers() {
    this.tweetService.deleteAllFollows();
    this.tweetService.deleteAllTweets();
    this.tweetService.deleteAllUser();
  }

  /**
   * Use to filter user list for searching
   * @param {string} filterText
   */
  filterUser(filterText: string) {
    this.users = this.originalUserList.filter(user => {
      return user.firstName.toLowerCase().indexOf(filterText) != -1 || user.lastName.toLowerCase().indexOf(filterText) != -1
        || user.email.toLowerCase().indexOf(filterText) != -1;
    });
  }
}
