import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import Fixtures from './fixtures';
import {EventAggregator} from 'aurelia-event-aggregator';
import {CurrentUser, LoginStatus} from './messages';

/**
 * Wrapper for http client
 */
@inject(HttpClient, Fixtures, EventAggregator)
export default class AsyncHttpClient {
  http: HttpClient;
  ea: EventAggregator;

  /**
   * Constructor for AsyncHttpClient
   */
  constructor(httpClient, fixtures, ea) {
    this.http = httpClient;
    this.http.configure(http => {
      http.withBaseUrl(fixtures.baseUrl);
    });
    this.ea = ea;
  }

  /**
   * Get Request
   */
  get(url) {
    return this.http.get(url);
  }
  /**
   * Post Request
   */

  post(url, obj) {
    return this.http.post(url, obj);
  }

  /**
   * Put Request
   */
  put(url, obj) {
    return this.http.put(url, obj);
  }

  /**
   * Delete Request
   */
  delete(url) {
    return this.http.delete(url);
  }

  /**
   * Authenticate request - on success of authentication, construct header with JWT token
   */
  authenticate(url: string, credentials: {email:string, password:string}) {
    this.http
      .post(url, credentials)
      .then(response => {
        const status = response.content;
        if (status.success) {
          localStorage.mytweet = JSON.stringify(response.content);
          this.http.configure(configuration => {
            configuration.withHeader(
              'Authorization',
              'bearer ' + response.content.token,
            );
          });
          let user = response.content.user;
          // try get an admin using the user id
          this.http.get('/api/admins/' + user._id).then(res => {
            // if successfully get a response then the user is an admin
            if (res) {
              this.ea.publish(new LoginStatus(true, 'isAdmin'));
            }
          }).catch(error => {
            // will throw error is no response, user is a user
            this.ea.publish(new LoginStatus(true));
          });
          this.ea.publish(new CurrentUser(response.content.user));
        }
      })
      .catch(error => {
        this.ea.publish(new LoginStatus(false, 'service not available'));
      });
  }

  /**
   * Clear authentication header and local storage of token for when user logs out
   */
  clearAuthentication() {
    localStorage.mytweet = null;
    this.http.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
  }

  /**
   * Return boolean of whether user from previous session has logged out by checking local
   * storage
   * @returns {boolean}
   */
  isAuthenticated() {
    let authenticated = false;
    if (localStorage.mytweet !== 'null') {
      authenticated = true;
      this.http.configure(http => {
        const auth = JSON.parse(localStorage.mytweet);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
    }
    return authenticated;
  }
}
