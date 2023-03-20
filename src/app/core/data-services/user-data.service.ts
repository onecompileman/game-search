import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    private mockExistingEmails: string[] = [
        'stephen.vinuya@gmail.com',
        'naruto.uzumaki@gmail.com'
    ];

    checkEmailExist(emailAddress: string): Observable<any> {
        const isExists = this.mockExistingEmails.includes(emailAddress);
        return of({
            isExists
        });
    }
}