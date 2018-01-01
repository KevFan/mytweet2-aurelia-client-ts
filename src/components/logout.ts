import { DonationService } from '../services/tweet-service';
import { inject } from 'aurelia-framework';

@inject(DonationService)
export class Logout {
  donationService: DonationService;

  constructor(donationService: DonationService) {
    this.donationService = donationService;
  }

  logout() {
    console.log('logging out');
    this.donationService.logout();
  }
}
