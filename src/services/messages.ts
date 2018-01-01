export class TotalUpdate {
  total: number;
  constructor(total: number) {
    this.total = total;
  }
}

export class LoginStatus {
  status: boolean;
  message: string;
  constructor(status: boolean, message:string = '') {
    this.status = status;
    this.message = message;
  }
}
