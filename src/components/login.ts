import { inject } from 'aurelia-framework';
import { DonationService } from '../services/donation-service';

@inject(DonationService)
export class Login {
  donationService: DonationService;
  email = 'marge@simpson.com';
  password = 'secret';

  constructor(ds: DonationService) {
    this.donationService = ds;
  }

  login(e) {
    console.log(`Trying to log in ${this.email}`);
    this.donationService.login(this.email, this.password);
  }
}
