import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import Fixtures from './fixtures';
import { EventAggregator } from 'aurelia-event-aggregator';
import {CurrentUser, LoginStatus} from './messages';

@inject(HttpClient, Fixtures, EventAggregator)
export default class AsyncHttpClient {
  http: HttpClient;
  ea: EventAggregator;

  constructor(httpClient, fixtures, ea) {
    this.http = httpClient;
    this.http.configure(http => {
      http.withBaseUrl(fixtures.baseUrl);
    });
    this.ea = ea;
  }

  get(url) {
    return this.http.get(url);
  }

  post(url, obj) {
    return this.http.post(url, obj);
  }

  put(url, obj) {
    return this.http.put(url, obj);
  }

  delete(url) {
    return this.http.delete(url);
  }

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

  clearAuthentication() {
    localStorage.mytweet = null;
    this.http.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
  }

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
