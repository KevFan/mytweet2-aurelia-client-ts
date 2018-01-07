import {Aurelia, inject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LoginStatus} from './services/messages';
import {TweetService} from './services/tweet-service';

/**
 * App Routing - set routes for the app
 */
@inject(Aurelia, EventAggregator, TweetService)
export class App {
  router: Router;
  ts: TweetService;
  au: Aurelia;

  /**
   * Constructor for app - set routing to admin or user view on login status update
   */
  constructor(au: Aurelia, ea: EventAggregator, ts: TweetService) {
    this.ts = ts;
    this.au = au;
    ea.subscribe(LoginStatus, msg => {
      this.router.navigate('/', { replace: true, trigger: false });
      this.router.reset();
      if (msg.status === true) {
        if (msg.message === 'isAdmin') {
          au.setRoot('admin');
        } else {
          au.setRoot('home');
        }
      } else {
        au.setRoot('app');
      }
    });
  }

  /**
   * App routing map before user has logged in
   */
  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'login'],
        name: 'login',
        moduleId: 'components/login/login',
        nav: true,
        title: 'Login',
      },
      {
        route: 'signup',
        name: 'signup',
        moduleId: 'components/signup/signup',
        nav: true,
        title: 'Signup',
      },
    ]);
    this.router = router;
  }

  //
  // attached() {
  //   if (this.ts.isAuthenticated()) {
  //     this.au.setRoot('home').then(() => {
  //       this.router.navigateToRoute('dashboard');
  //     });
  //   }
  // }
}
