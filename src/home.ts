import { RouterConfiguration, Router } from 'aurelia-router';
import {TweetService} from "./services/tweet-service";
import {inject} from 'aurelia-framework';

@inject(TweetService)
export class Home {
  router: Router;
  tweetService: TweetService;

  constructor(ts: TweetService) {
    this.tweetService = ts;
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      { route: ['', 'dashboard'], name: 'dashboard', moduleId: 'components/dashboard/dashboard', nav: true, title: 'Dashboard' },
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
      { route: 'logout', name: 'logout', moduleId: 'components/logout/logout', nav: true, title: 'Logout' }
    ]);
    this.router = router;
  }

  viewUser(userId) {
    if (userId === this.tweetService.currentUser._id) {
      location.assign('#/');
    } else {
      location.assign('#/viewUser/' + userId);
    }
  }
}
