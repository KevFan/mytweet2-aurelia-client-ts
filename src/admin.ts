import { RouterConfiguration, Router } from 'aurelia-router';

export class Admin {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      { route: ['', 'dashboard'], name: 'dashboard', moduleId: 'components/dashboard/dashboard', nav: true, title: 'Dashboard' },
      // {
      //   route: 'globalTimeLine',
      //   name: 'globalTimeLine',
      //   moduleId: 'components/globalTimeLine/globalTimeLine',
      //   nav: true,
      //   title: 'Global Timeline',
      // },
      {
        route: 'updateSetting',
        name: 'updateSetting',
        moduleId: 'components/updateSetting/updateSetting',
        nav: true,
        title: 'Settings',
      },
      { route: 'logout', name: 'logout', moduleId: 'components/logout/logout', nav: true, title: 'Logout' }
    ]);
    this.router = router;
  }
}
