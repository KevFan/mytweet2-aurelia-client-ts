import { inject } from 'aurelia-framework';
import { TotalUpdate } from '../services/messages';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DonationService } from '../services/donation-service';

@inject(EventAggregator, DonationService)
export class Stats {
  donationService: DonationService;
  total = 0;

  constructor(ea: EventAggregator, ds: DonationService) {
    this.donationService = ds;
    // this.donationService.getDonations();
    ea.subscribe(TotalUpdate, msg => {
      this.total = msg.total;
    });
  }

  attached() {
    this.total = this.donationService.total;
  }
}
