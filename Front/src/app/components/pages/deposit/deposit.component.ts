import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { TransferService } from 'src/app/services/transfer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  depositForm: FormGroup;
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
    private router: Router
  ) { }

  async ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    await this.getAccount(currentUser.id);
    this.depositForm = this.formBuilder.group({
      origin: [currentUser.id, Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  private getAccount = async (userId) =>
    this.account = await this.userService.getAccount(userId);
  

  get f() { return this.depositForm.controls; }

  async onSubmit() {
    this.submitted = true;
    if (this.depositForm.invalid) return;
    this.loading = true;
    let resp  = await this.transferService.deposit(this.depositForm.value);
    if (resp.error) {
      this.error = resp.error;
      this.loading = false;
    } else {
      this.router.navigate(['/']);
    }
  }


}
