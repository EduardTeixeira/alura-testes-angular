import { TokenService } from './../token/token.service';
import { UserService } from './user.service';
import { TestBed } from '@angular/core/testing';

describe('O serviço UserService', () => {

    let service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService]
        });
        service = TestBed.get(UserService);
    })

    it('deve ser instanciado', () => {
        expect(service).toBeTruthy();
    })

    it('deve, através de um token recuperar as informações do usuário', () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTYwNDUwODQwNSwiZXhwIjoxNjA0NTk0ODA1fQ.lFRJxMr8FfzCH_n5S_Q6OBJokYkGhU2oTZCmrv5h7Ao';
        service.setToken(token);
        expect(service.isLogged()).toBeTruthy();
        expect(service.getUserName()).toBe('flavio');
        service.getUser().subscribe(user => {
            expect(user.name).toBe('flavio');
        })
    })

    it('deve limpar as informações no logout', () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTYwNDUwODQwNSwiZXhwIjoxNjA0NTk0ODA1fQ.lFRJxMr8FfzCH_n5S_Q6OBJokYkGhU2oTZCmrv5h7Ao';
        service.setToken(token);
        service.logout();
        expect(service.isLogged()).toBeFalsy();
        expect(service.getUserName()).toBe('');
    })

})