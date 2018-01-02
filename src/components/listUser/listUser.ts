import {TweetService} from "../../services/tweet-service";
import {EventAggregator} from "aurelia-event-aggregator";
import {inject} from "aurelia-framework";
import {User} from "../../services/models";
import {LatestUserList} from "../../services/messages";

@inject(TweetService, EventAggregator)

export class ListUser {
  tweetService: TweetService;
  users: Array<User>;
  ea: EventAggregator;
  empty: boolean;

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.ea.subscribe(LatestUserList, event => {
      this.empty = event.empty;
      this.users = event.users;
    })
  }
  
  deleteUser(userId: string) {
    this.tweetService.removeAllUserFollowers(userId);
    this.tweetService.removeAllUserFollowings(userId);
    this.tweetService.deleteAllUserTweets(userId);
    this.tweetService.deleteOneUser(userId);
  }
}
