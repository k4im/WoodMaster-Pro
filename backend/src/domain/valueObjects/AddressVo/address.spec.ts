import { Test, TestingModule } from '@nestjs/testing';
import { Address } from './address.value.object';

describe('Address', () => {
    
      it('Deve criar um endereço com os dados validos', () => {
        const street = 'StreetName';
        const city= 'city';
        const neighborHood = 'Teste';
        const cep = '88525815';
        const country = 'US';
        const state = 'NY';
        const isPrimary = false;

        const address = new Address(street, city, neighborHood, cep, country, state, isPrimary,);
        expect(address).toBeInstanceOf(Address);
        expect(address.StreetName).toEqual(street);
        expect(address.City).toEqual(city);
        expect(address.Neighborhood).toEqual(neighborHood);
        expect(address.ZipCode).toEqual(cep); // Since cleanZipCode just removes '-'
        expect(address.Country).toEqual(country);
        expect(address.State).toEqual(state);
        expect(address.IsPrimary).toEqual(isPrimary);
      });
  
      it('Deve efetuar a limpeza do CEP', () => {
        const cep = '88525815';
        const address = new Address('StreetName', 'City', 'NeighborHood', '88525-815', 'US', 'NY', false, '');
        expect(address.ZipCode).toEqual(cep);
      });
  
      it('Deve retornar uma exception ao realizar a criação do endereço', () => {
        expect(() => new Address('StreetName', 'City', 'NeighborHood', '8855258100', 'US', 'NY', false, ''))
          .toThrow('O CEP informado é invalido.');
      });
    });