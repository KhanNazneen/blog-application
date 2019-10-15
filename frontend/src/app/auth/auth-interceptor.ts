import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authSerive: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authSerive.getToken();
        if(authToken !== undefined){
            const authRequest = req.clone({
                headers: req.headers.set('authToken', authToken)
            })
            return next.handle(authRequest);
        }
        return next.handle(req)
    }
}