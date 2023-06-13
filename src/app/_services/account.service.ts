import { Injectable, IterableDiffers } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../_models/login.response';
import { ApiResponse } from '../_models/api.response';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    public userRole: BehaviorSubject<boolean>

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
        this.userRole = new BehaviorSubject<boolean>(false)
    }

    public get userValue() {
        return this.userSubject.value;
    }

    public get isWorker(){
        return this.userRole.asObservable()
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponse>(`${environment.apiUrl}/api/Authenticate/login`, { email, password })
            .pipe(
                map(response => {
                    // Salva os dados do usuario no localStorage do navegador para manter a sessão ativa mesmo após refresh da pagina
                    if (response.success) {
                        localStorage.setItem("access-token", response.data?.token!);
                        this.userSubject.next({ ...this.userSubject, token: response.data?.token });
                        this.getUserData().subscribe(res => {
                            localStorage.setItem("user", JSON.stringify(this.userValue));
                            this.userRole.next(this.userValue?.roles?.includes("Admin") || this.userValue?.roles?.includes("restockers") ? true : false);
                        });
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
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    /**
     * @description Faz chamada da api para criar um novo usuario
     * @param user 
     * @returns retorna dados padrão da api (success; message; data)
     */
    register(user: User) {
        return this.http.post<ApiResponse<string>>(`${environment.apiUrl}/User/register`, user).pipe(
            map(res => {
                return res;
            })
        );
    }

    registerClient(user: User) {
        return this.http.post<ApiResponse<User>>(`${environment.apiUrl}/register`, user).pipe(
            map(res => {
                return res;
            })
        )
    }

    /**
     * @returns Retorna todos os usuario presentes no banco de dados
     */
    getAll() {
        return this.http.get<ApiResponse<User[]>>(`${environment.apiUrl}/User/getUsers`).pipe(
            map(res => {
                return res.data;
            })
        )
    }

    /**
     * @description busca chama a api para buscar usuario passado o id
     * @param id 
     * @returns retorna os dados do usuario que a api mandou
     */
    getById(id: string) {
        return this.http.get<ApiResponse<User>>(`${environment.apiUrl}/User/getUser?ID=${id}`).pipe(
            map(res => {
                return res.data;
            })
        );
    }

    /**
     * @description realiza a chamada da api para atualização dos dados do usuário
     * @param params 
     * @returns dados padrão da api (success; message; data)
     */
    update(params: any) {
        return this.http.post<ApiResponse<string>>(`${environment.apiUrl}/update`, params).pipe(
            map(res => res)
        )
    }

    userUpdate(params: any){
        return this.http.post<ApiResponse<string>>(`${environment.apiUrl}/update`, params).pipe(
            map(res => res)
        )
    }

    /**
     * @description Setta o grupo em que o usuario pertence
     */
    getRole() {
        this.userValue?.roles?.includes("admin") ? localStorage.setItem('isAdmin', "true") : localStorage.setItem('isAdmin', "false");
    }

    activateUser(params: any) {
        return this.http.post<ApiResponse<string>>(`${environment.apiUrl}/api/authenticate/active`, params).pipe(
            map(res => res)
        )
    }

    deactivateUser(params: any) {
        return this.http.post<ApiResponse<string>>(`${environment.apiUrl}/api/authenticate/deactive`, params).pipe(
            map(res => res)
        )
    }

    getUserData() {
        return this.http.get<ApiResponse<User>>(`${environment.apiUrl}/User/getUserInfo`).pipe(
            map(res => {
                if (res.success) {
                    this.userSubject.next({
                        ...this.userValue,
                        nome: res.data.nome,
                        id: res.data.id,
                        userName: res.data.userName,
                        cpf: res.data.cpf,
                        masculino: res.data.masculino,
                        dataNascimento: res.data.dataNascimento,
                        email: res.data.email,
                        lockoutEnabled: res.data.lockoutEnabled,
                        address: res.data.address,
                        roles: res.data.roles,
                    });
                }
                return res.data;
            })
        )
    }
}
