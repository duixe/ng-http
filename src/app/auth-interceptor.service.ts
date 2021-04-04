import { tap } from 'rxjs/operators';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEventType } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
    public intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("request is on its way");
        console.log(req.url);

        // you can only modify the req going out
        const modifiedRequest = req.clone({ 
            headers: req.headers.append('New_header', 'Test123')
        });
        // interacting with the request
        // return next.handle(modifiedRequest);

        // response interceptors - interacting with the reponse
        return next.handle(modifiedRequest).pipe(tap(event => {
            console.log(event);
            if (event.type === HttpEventType.Response) {
                console.log(event.body);
                
            }
        }));
    }
}