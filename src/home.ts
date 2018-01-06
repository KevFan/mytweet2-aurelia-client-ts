import {Router, RouterConfiguration} from 'aurelia-router';
import {TweetService} from "./services/tweet-service";
import {inject} from 'aurelia-framework';

/**
 * Home routing - for when user has logged in
 */
@inject(TweetService)
export class Home {
  router: Router;
  tweetService: TweetService;

  /**
   * Constructor for home component
   */
  constructor(ts: TweetService) {
    this.tweetService = ts;
  }

  /**
   * Home routing map for when user has logged in
   */
  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'dashboard'],
        name: 'dashboard',
        moduleId: 'components/dashboard/dashboard',
        nav: true,
        title: 'Dashboard'
      },
      {
        route: 'globalTimeLine',
        name: 'globalTimeLine',
        moduleId: 'components/globalTimeLine/globalTimeLine',
        nav: true,
        title: 'Global Timeline',
      },
      {
        route: 'updateSetting',
        name: 'updateSetting',
        moduleId: 'components/updateSetting/updateSetting',
        nav: true,
        title: 'Settings',
      },
      {
        route: 'viewUser/:id',
        name: 'viewUser',
        moduleId: 'components/viewUser/viewUser',
        nav: false,
        title: 'View User',
      },
      {route: 'logout', name: 'logout', moduleId: 'components/logout/logout', nav: true, title: 'Logout'}
    ]);
    this.router = router;
  }

  /**
   * Global function for admin views for routing redirection when viewing another user
   * @param userId
   */
  viewUser(userId) {
    if (userId === this.tweetService.currentUser._id) {
      location.assign('#/');
    } else {
      location.assign('#/viewUser/' + userId);
    }
  }
}
