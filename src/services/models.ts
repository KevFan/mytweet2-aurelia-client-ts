export interface Candidate {
  firstName: string;
  lastName: string;
  office: string;
  _id?: string;
}

export interface Donation {
  amount: number;
  method: string;
  candidate: Candidate;
  _id?: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id?: string;
}
