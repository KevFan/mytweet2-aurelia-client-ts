import { RouterConfiguration, Router } from 'aurelia-router';

export class Home {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      { route: 'dashboard', name: 'dashboard', moduleId: 'components/dashboard', nav: true, title: 'Dashboard' },
      { route: ['', 'home'], name: 'donate', moduleId: 'components/donate', nav: true, title: 'Donate' },
      { route: 'report', name: 'report', moduleId: 'components/report', nav: true, title: 'Report' },
      { route: 'candidates', name: 'candidates', moduleId: 'components/candidates', nav: true, title: 'Candidates' },
      { route: 'stats', name: 'stats', moduleId: 'components/stats', nav: true, title: 'Stats' },
      { route: 'logout', name: 'logout', moduleId: 'components/logout', nav: true, title: 'Logout' }
    ]);
    this.router = router;
  }
}
