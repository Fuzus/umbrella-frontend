import { Injectable, IterableDiffers } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User, UserRole } from '../_models/user';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../_models/login.response';
import { UserResponse } from '../_models/user.response';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    users: User[] = []

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponse>(`${environment.apiUrl}/api/Authenticate/login`, { email, password })
            .pipe(
                map(response => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    if (response.success) {
                        localStorage.setItem("access-token", response.data?.token!);
                        this.userSubject.next({ ...this.userSubject, token: response.data?.token })
                        this.getRole()
                        return true;
                    }
                    //this.userSubject.next(user);
                    return false;
                }),
                catchError((err, httpErrorResponse) => {
                    //Caso a requisição retorne 401 ou qualquer outro erro, o retorno do login é false
                    return of(false);
                })
            );
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('access-token');
        this.userSubject.next(null);
        //this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    getAll() {
        return this.http.get<UserResponse>(`${environment.apiUrl}/getUsers`).pipe(
            map(res => {
                return res.data;
            })
        )
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue?.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }

    getRole() {
        this.isAdmin().subscribe(
            res => {
                if (res) {
                    console.log("isAdmin");
                    this.userSubject.next({ ...this.userValue, role: UserRole.ADMIN });
                }
            });
        
        this.isRestocker().subscribe(
            res => {
                if(res) {
                    console.log("isRestocker");
                    this.userSubject.next({ ...this.userValue, role:UserRole.RESTOCKER });
                }
            }
        )
    }

    isAdmin() {
        return this.http.get<Response>(`${environment.apiUrl}/api/home/admin`)
            .pipe(
                map(response => {
                    if (response.status == 200 || response.status == 204) {
                        console.log("teste")
                        return true;
                    }
                    console.log("testes faail")
                    return false;
                }),
                catchError((err, httpErrorResponse) => {
                    if(err.status == 200) {
                        return of(true);
                    }
                    return of(false);
                })
            );
    }

    isRestocker() {
        return this.http.get<Response>(`${environment.apiUrl}/api/home/restockers`)
            .pipe(
                map(response => {
                    if (response.status == 200 || response.status == 204) {
                        console.log("testes auth")
                        return true;
                    }
                    return false;
                }),
                catchError((err, httpErrorResponse) => {
                    if(err.status == 200) {
                        return of(true);
                    }
                    return of(false);
                })
            );
    }
}
