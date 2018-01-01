import { inject } from 'aurelia-framework';
import { DonationService } from '../services/donation-service';
import { Candidate } from '../services/models';

@inject(DonationService)
export class Donate {
  donationService: DonationService;
  amount = '0';

  methods: Array<string> = [];
  selectedMethod = '';

  candidates: Array<Candidate>;
  selectedCandidate: Candidate;

  constructor(ds: DonationService) {
    this.donationService = ds;
    this.methods = ds.methods;
    this.selectedMethod = this.methods[0];
    this.donationService.getCandidates();
    this.candidates = ds.candidates;
    this.selectedCandidate = this.candidates[0];
  }

  makeDonation() {
    this.donationService.donate(
      parseInt(this.amount),
      this.selectedMethod,
      this.selectedCandidate,
    )
  }
}
