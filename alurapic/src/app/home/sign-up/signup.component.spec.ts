import { ReactiveFormsModule } from '@angular/forms';
import { VMessageModule } from 'src/app/shared/componets/vmessage/vmessage.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';

import { of, throwError } from 'rxjs';

import { LoadingModule } from './../../shared/componets/loading/loading.module';
import { AlertModule } from './../../shared/componets/alert/alert.module';
import { MenuModule } from './../../shared/componets/menu/menu.module';
import { SignUpComponent } from './signup.component';
import { SignUpService } from './signup.service';

describe('O formulário SignUp', () => {

    let component: SignUpComponent;
    let signUpService: SignUpService;
    let userNotTakenValidatorService: UserNotTakenValidatorService;
    let router: Router;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [SignUpComponent],
            providers: [
                SignUpService,
                UserNotTakenValidatorService,
            ],
            imports: [
                HttpClientTestingModule,
                VMessageModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([]),
            ],
        }).compileComponents();

    }));

    beforeEach(() => {

        router = TestBed.get(Router);

        userNotTakenValidatorService = TestBed.get(UserNotTakenValidatorService);

        signUpService = TestBed.get(SignUpService);

        const fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('deve ser instanciado', () => {
        expect(component).toBeTruthy();
    });

    it('deve cadastrar um usuario, teste de sucesso', () => {

        const navigateSpy = spyOn(router, 'navigate');

        spyOn(signUpService, 'signup').and.returnValue(of(null));

        // SET VALORES PARA REALIZAR TESTES NOS FORMGROUPS --- VERIFICAR VALIDAÇÕES
        component.signupForm.get('email').setValue('email@test.com');
        component.signupForm.get('fullName').setValue('Nome Teste');
        component.signupForm.get('userName').setValue('teste');
        component.signupForm.get('password').setValue('123456');

        component.signUp();

        expect(navigateSpy).toHaveBeenCalledWith(['']);
    });

    it('deve realizar o log caso ocorra algum erro, teste de erro', () => {

        spyOn(signUpService, 'signup').and.returnValue(
            throwError('Erro de serviço')
        );

        // SET VALORES PARA REALIZAR TESTES NOS FORMGROUPS
        component.signupForm.get('email').setValue('email@test.com');
        component.signupForm.get('fullName').setValue('Nome Teste');
        component.signupForm.get('userName').setValue('teste');
        component.signupForm.get('password').setValue('123456');

        // const spyLog = spyOn(console, 'error').and.returnValue(of(null));

        component.signUp();

        // expect(spyLog).toHaveBeenCalledWith('Erro de serviço');

    });

});