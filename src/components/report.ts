import { inject } from 'aurelia-framework';
import { DonationService } from '../services/donation-service';
import { Donation } from '../services/models';

@inject(DonationService)
export class Report {
  donationService: DonationService;
  donations: Array<Donation>;

  constructor(ds) {
    this.donationService = ds;
    this.donations = this.donationService.donations;
  }
}
