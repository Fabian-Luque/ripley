import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { TransferService } from "src/app/services/transfer.service";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  transfers;
  account;
  constructor(
    private transferService : TransferService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
  ) { }

  async ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    this.getTransfers(currentUser.id);
    this.getAccount(currentUser.id);
  }

  private async getTransfers(userId): Promise<void> {
    this.transfers = await this.transferService.getTranfersUser(userId);
  }

  private async getAccount(userId) {
    this.account = await this.userService.getAccount(userId);
  } 

}
