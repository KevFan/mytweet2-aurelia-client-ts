import {inject} from 'aurelia-framework';
import {TweetService} from '../../services/tweet-service';
import * as $ from 'jquery';

/**
 * Sign up component
 */
@inject(TweetService)
export class Signup {
  tweetService: TweetService;

  firstName = '';
  lastName = '';
  email = '';
  password = '';

  /**
   * Constructor for sign up component
   */
  constructor(ts: TweetService) {
    this.tweetService = ts;
  }

  /**
   * Register function, if current user if adding new user (should be admin) hide the modal,
   * otherwise login the signed up user
   */
  register() {
    this.tweetService.register(this.firstName, this.lastName, this.email, this.password);
    $('#addUser').modal('hide');
    this.resetFields();
  }

  resetFields() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }
}
