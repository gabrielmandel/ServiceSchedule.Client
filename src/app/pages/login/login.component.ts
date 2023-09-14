import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	constructor(
		private router: Router,
		private authService: AuthService
		) { }

	loginForm = new FormGroup({
		username: new FormControl('',Validators.required),
		password: new FormControl('',Validators.required),
	});

	ngOnInit(): void {

	}

	submit() {
		
		if (this.loginForm.valid) {
			let formValue = this.loginForm.getRawValue();

			this.authService.signIn(formValue.username, formValue.password)
							.subscribe(response => 
							{
								console.log(response);
								
								this.router.navigateByUrl('/dashboard');
							}, (e) => {console.log(e)});;
		}
	}
	@Input() error: string | null = '';

	@Output() submitEM = new EventEmitter();
}
