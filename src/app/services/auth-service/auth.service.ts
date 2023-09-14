import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user-service/user.service';
import { Observable, map, throwError, switchMap, of, catchError } from 'rxjs';
import { environment } from 'src/app/environments/envinronment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {


	private _authenticated: boolean = this.accessToken !== undefined;

	constructor(
		private _httpClient: HttpClient,
		private _userService: UserService
	) {
		this._authenticated = this.accessToken !== '';
	}

	set accessToken(token: string) {
		localStorage.setItem('accessToken', token);
	}

	get accessToken(): string {
		return localStorage.getItem('accessToken') ?? '';
	}

	signIn(username: string | null, password: string | null): Observable<any> {
	
		return this._httpClient.post(environment.apiUrl + '/User/Login', { username: username, password: password }).pipe(
			switchMap((response: any) => {
				this.accessToken = response.token;
				this._authenticated = true;
				return of(response);
			})
		);
	}

	signOut(): Observable<any> {
		localStorage.removeItem('accessToken');
		this._authenticated = false;
		return of(true);
	}
}
