import { inject } from 'aurelia-framework';
import { TweetService } from '../../services/tweet-service';
import { Tweet } from '../../services/models';
import * as $ from 'jquery';

@inject(TweetService)
export class AddTweet {
  tweetService: TweetService;
  tweetText: '';
  picture = '';
  pictureValue = '';

  constructor(ts: TweetService) {
    this.tweetService = ts;
  }

  addTweet() {
    let formData = new FormData();
    if (this.picture) {
      formData.append('picture', this.picture[0]);
    }
    if (this.tweetText) {
      formData.append('tweetText', this.tweetText);
    }
    console.log(this.picture[0]);
    this.tweetService.addTweet(formData);
    this.resetFields();
  }

  resetFields() {
    this.tweetText = '';
    this.picture = '';
    this.pictureValue = '';
    $('#addTweet').modal('hide');
  }
}
