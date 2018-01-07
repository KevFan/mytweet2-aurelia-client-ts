import {TweetService} from "../../services/tweet-service";
import {EventAggregator} from "aurelia-event-aggregator";
import {inject} from "aurelia-framework";
import {User} from "../../services/models";
import {LatestUserList} from "../../services/messages";
import * as $ from 'jquery';

@inject(TweetService, EventAggregator)

/**
 * List User Component
 */
export class ListUser {
  tweetService: TweetService;
  // users: Array<User>;
  ea: EventAggregator;
  empty: boolean;

  /**
   * Constructor for list user component
   */
  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    // this.ea.subscribe(LatestUserList, event => {
    //   this.empty = event.empty;
    //   this.users = event.users;
    // })
  }

  /**
   * Delete User function
   * @param {string} userId User Id to delete
   */
  deleteUser(userId: string) {
    this.tweetService.deleteAllUserFollowers(userId);
    this.tweetService.deleteAllUserFollowings(userId);
    this.tweetService.deleteAllUserTweets(userId);
    this.tweetService.deleteOneUser(userId);
  }

  /**
   * Edit user function to open modal for specific user
   * @param {User} user
   */
  editUser(user: User) {
    console.log(user);
    $('#editUser' + user._id).modal('show');
  }
}
