import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { TransferService } from 'src/app/services/transfer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class  MoneyTransferComponent implements OnInit {
  transferForm: FormGroup;
  rutForm: FormGroup;
  users = [];
  account;
  loading = false;
  submitted = false;
  submittedRut = false;
  returnUrl: string;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private transferService: TransferService,
    private userService: UserService,
    private router : Router
  ) { }

  async ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    this.getUsers(currentUser);
    await this.getAccount(currentUser.id);
    this.rutForm = this.formBuilder.group({
      rut: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9) ]],
    });
    this.transferForm = this.formBuilder.group({
      origin: [currentUser.id, Validators.required],
      receiver: ['', Validators.required],
      amount: ['', [Validators.required, Validators.max(this.account?.amount), Validators.min(1)]]
    });
  }

  private async getUsers(currentUser) {
    let resp: any = await this.userService.getAll();
    this.users = resp.transfers.filter((x) => x._id != currentUser.id);
  }
  private async getAccount(userId) {
    this.account = await this.userService.getAccount(userId);
  } 

  async searchAccount() {
    this.submittedRut = true;
    let user:any = await this.userService.getUserByRut(this.rutForm.value.rut);
    this.transferForm.patchValue({receiver:user._id})
  }
  get f() { return this.transferForm.controls; }
  get fr() { return this.rutForm.controls; }

  async onSubmit() {
    this.submitted = true;
    if (this.transferForm.invalid) return;
    this.loading = true;
    let resp = await this.transferService.deposit(this.transferForm.value);
    if (resp.error) {
      this.error = resp.error;
      this.loading = false;
    } else {
      this.router.navigate(['/']);
    }

  }

}
