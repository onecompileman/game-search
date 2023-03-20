import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { UserDataService } from './../../core/data-services/user-data.service';
export function CheckEmailExists(
    userDataService: UserDataService,
    debounce: number = 400
) {
    return (control: FormControl) => {
        return timer(debounce).pipe(
            switchMap(() => userDataService.checkEmailExist(control.value)),
            pluck('isExists'),
            map((isExists: boolean) => isExists ? { emailExists: true} : null) 
        )
    }
}