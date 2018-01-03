import {Tweet} from "../../services/models";
import {EventAggregator} from "aurelia-event-aggregator";
import {TweetService} from "../../services/tweet-service";
import {inject} from "aurelia-framework";
import {LastestTweetList} from "../../services/messages";

@inject(TweetService, EventAggregator)
export class GoogleMaps {
  tweetService: TweetService;
  ea: EventAggregator;
  tweets: Array<Tweet>;
  myMarkers = [];

  constructor(ts: TweetService, ea: EventAggregator) {
    this.tweetService = ts;
    this.ea = ea;
    this.ea.subscribe(LastestTweetList, event => {
      this.tweets = event.tweets;
      for (let tweet of this.tweets) {
        if (tweet.marker.coords.longitude !==  0 && tweet.marker.coords.latitude !== 0) {
          this.myMarkers.push({
            latitude: tweet.marker.coords.latitude,
            longitude: tweet.marker.coords.longitude,
            infoWindow: {
              content: '<p>' + tweet.tweetUser.firstName  + ' ' + tweet.tweetUser.lastName + '</p><p>' +
              tweet.tweetDate.toString() + '</p><p>' + tweet.tweetText + '</p>'
            }
          })
        }
      }
      console.log(this.myMarkers);
    })
  }

  myLoadedCallback(map, $event) {
    console.log('map has loaded');
  }
}
