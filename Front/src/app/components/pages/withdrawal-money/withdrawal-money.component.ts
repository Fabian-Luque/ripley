import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { TransferService } from 'src/app/services/transfer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-withdrawal-money',
  templateUrl: './withdrawal-money.component.html',
  styleUrls: ['./withdrawal-money.component.css']
})
export class WithdrawalMoneyComponent implements OnInit {
  withdrawalMoneyForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  account;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private transferService: TransferService,
    private userService: UserService,
    private router : Router
  ) { }

  async ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    await this.getAccount(currentUser.id);
    this.withdrawalMoneyForm = this.formBuilder.group({
      origin: [currentUser.id, Validators.required],
      amount: ['', [Validators.required, Validators.max(this.account?.amount), Validators.min(1)]]
    });
  }

  private async getAccount(userId) {
    this.account = await this.userService.getAccount(userId);
  } 

  get f() { return this.withdrawalMoneyForm.controls; }

  async onSubmit() {
    this.submitted = true;
    if (this.withdrawalMoneyForm.invalid) return;
    this.withdrawalMoneyForm.patchValue({amount:-this.withdrawalMoneyForm.value.amount})
    this.loading = true;
    let resp  = await this.transferService.deposit(this.withdrawalMoneyForm.value);
    if (resp.error) {
      this.error = resp.error;
      this.loading = false;
    } else {
      this.router.navigate(['/']);
    }

  }
}
