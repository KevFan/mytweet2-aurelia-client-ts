import { inject, Aurelia } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LoginStatus } from './services/messages';
import { DonationService } from './services/donation-service';


@inject(Aurelia, EventAggregator, DonationService)
export class App {
  router: Router;
  ds: DonationService;
  au: Aurelia;

  constructor(au: Aurelia, ea: EventAggregator, ds: DonationService) {
    this.ds = ds;
    this.au = au;
    ea.subscribe(LoginStatus, msg => {
      this.router.navigate('/', { replace: true, trigger: false });
      this.router.reset();
      if (msg.status === true) {
        au.setRoot('home');
      } else {
        au.setRoot('app');
      }
    });
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'login'],
        name: 'login',
        moduleId: 'components/login',
        nav: true,
        title: 'Login',
      },
      {
        route: 'signup',
        name: 'signup',
        moduleId: 'components/signup',
        nav: true,
        title: 'Signup',
      },
    ]);
    this.router = router;
  }

  attached() {
    if (this.ds.isAuthenticated()) {
      this.au.setRoot('home').then(() => {
        this.router.navigateToRoute('dashboard');
      });
    }
  }
}
