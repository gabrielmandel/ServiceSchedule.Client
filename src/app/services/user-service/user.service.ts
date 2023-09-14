import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

	constructor(private http: HttpClient) { }

	set user(value: User) {
		this._user.next(value);
	}

	set userSession(session: string) {
		localStorage.setItem('userSession', JSON.stringify(session));
	}

	get userSession(): string {
		return localStorage.getItem('userSession') ?? '';
	}

	get user$(): Observable<User> {
		return this._user.asObservable();
	}

	get(): Observable<User> {
		return JSON.parse(this.userSession).usuario;
	}
}

export class User {}