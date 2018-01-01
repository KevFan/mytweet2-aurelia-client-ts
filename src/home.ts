import { RouterConfiguration, Router } from 'aurelia-router';

export class Home {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      { route: ['', 'dashboard'], name: 'dashboard', moduleId: 'components/dashboard', nav: true, title: 'Dashboard' },
      {
        route: 'listTweet',
        name: 'listTweet',
        moduleId: 'components/listTweet',
        nav: true,
        title: 'Global Timeline',
      },
      { route: 'logout', name: 'logout', moduleId: 'components/logout', nav: true, title: 'Logout' }
    ]);
    this.router = router;
  }
}
