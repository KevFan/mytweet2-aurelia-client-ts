import {Router, RouterConfiguration} from 'aurelia-router';
import {TweetService} from "./services/tweet-service";
import {inject} from 'aurelia-framework';

/**
 * Admin routing
 */
@inject(TweetService)
export class Admin {
  router: Router;
  tweetService: TweetService;

  /**
   * Constructor for admin routing
   */
  constructor(ts: TweetService) {
    this.tweetService = ts;
  }

  /**
   * Configure routing for admin
   */
  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'adminDashboard'], name: 'adminDashboard', moduleId: 'components/adminDashboard/adminDashboard',
        nav: true, title: 'Admin Dashboard'
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
        title: 'Admin User',
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
