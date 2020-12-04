import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rut: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9) ]],
      name: ['', Validators.required],
    });
  }

  get f() { return this.registerForm.controls; }

  async onSubmit() {

      this.submitted = true;
      if (this.registerForm.invalid) return;
      this.loading = true;
      let resp = await this.authenticationService.register(this.registerForm.value);
      if (resp.error) {
        this.error = resp.error;
        this.loading = false;
      } else {
        this.router.navigate(['/login']);
      }
      
  }


}
