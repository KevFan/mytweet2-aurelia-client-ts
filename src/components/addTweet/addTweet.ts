import {inject} from 'aurelia-framework';
import {TweetService} from '../../services/tweet-service';
import * as $ from 'jquery';

/**
 * Add Tweet component
 */
@inject(TweetService)
export class AddTweet {
  tweetService: TweetService;
  tweetText: '';
  picture = '';
  pictureValue = '';

  /**
   * Constructor for add tweet component
   */
  constructor(ts: TweetService) {
    this.tweetService = ts;
  }

  /**
   * Add tweet function - forms data for tweet image and tweet text
   */
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

  /**
   * Close modal and reset form values
   */
  resetFields() {
    this.tweetText = '';
    this.picture = '';
    this.pictureValue = '';
    $('#addTweet').modal('hide');
  }
}
