import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';

import { of } from 'rxjs';

import { LoadingModule } from './../../shared/componets/loading/loading.module';
import { AlertModule } from './../../shared/componets/alert/alert.module';
import { MenuModule } from './../../shared/componets/menu/menu.module';
import { HeaderComponent } from './header.component';
import { UserService } from '../user/user.service';

describe('O componente Header', () => {

    let component: HeaderComponent;
    let userService: UserService;
    let router: Router;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            providers: [UserService],
            imports: [
                RouterTestingModule.withRoutes([]),
                MenuModule,
                AlertModule,
                LoadingModule,
            ],
        }).compileComponents();

    }));

    beforeEach(() => {

        router = TestBed.get(Router);

        userService = TestBed.get(UserService);

        spyOn(userService, 'getUser').and.returnValue(
            of({
                email: 'email@test.com',
                name: 'Name Teste',
                id: 12,
            })
        );

        const fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('deve ser instanciado', () => {
        expect(component).toBeTruthy();
    });

    it('deve realizar o logout', () => {
        const spy = spyOn(userService, 'logout').and.returnValue(null);
        const navigateSpy = spyOn(router, 'navigate');
        component.logout();
        expect(spy).toHaveBeenCalled();
        expect(navigateSpy).toHaveBeenCalledWith(['']);
    });

});