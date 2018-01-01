import { inject } from 'aurelia-framework';
import { DonationService } from '../services/donation-service';

@inject(DonationService)
export class Candidate {
  donationService: DonationService;
  firstName = '';
  lastName = '';
  office = '';

  constructor(ds: DonationService) {
    this.donationService = ds;
  }

  addCandidate() {
    this.donationService.addCandidate(
      this.firstName,
      this.lastName,
      this.office,
    );
  }
}
