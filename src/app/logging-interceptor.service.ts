import { HttpHandler, HttpInterceptor, HttpRequest, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor{
    public intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("outgoing request");
        console.log(req.url);
        
        return next.handle(req).pipe(tap(event => {
            if (event.type === HttpEventType.Response ) {
                console.log("Incoming Request");
                console.log(event.body);
                
            }
        }));
    }
}