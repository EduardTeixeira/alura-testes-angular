import { TokenService } from './token.service';

describe('O serviço TokenService', ()=>{

    it('deve ser instanciado', ()=>{
        const service = new TokenService();
        expect(service).toBeTruthy();
    })

    it('deve guardar um token', ()=>{
        const token = 'testToken';
        const service = new TokenService();
        service.setToken(token);
        expect(service.hasToken()).toBeTruthy();
        expect(service.getToken()).toBe('testToken');
    })

})