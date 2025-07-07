/// <reference types="cypress" />

import { petDeleteData, petGetData, petPostData, petPutData } from "../../support/petData";

context('Pet Tests',() =>{

    const headersPayload = {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }

    it('GET - /v2/pet/id GetPetInfo', () =>{
        cy.request('GET','https://petstore.swagger.io/v2/pet/'+petGetData.id)
        .then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body.id).to.eq(petGetData.id)
        });
        cy.allure().step("id numarası "+ petGetData.id +": pet sorgulama işlemi başarıyla gerçekleşti.");
    }) 

    it('POST - /v2/pet CreatePet', () => {
        const bodyPayload = {
            "id": petPostData.id,
            "name": petPostData.name,
            "photoUrls": petPostData.photoUrls,
            "tags": petPostData.tags,
            "status":petPostData.status        
        }

        cy.request({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/pet',
            body: bodyPayload,
            headers: headersPayload
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
        cy.allure().step("id numarası "+ petPostData.id +": pet oluşturma işlemi başarıyla gerçekleşti.");  
    })

    it('PUT - /v2/pet UpdatePet', () => {
        const bodyPayload = {
            "id": petPutData.id,
            "name": petPutData.name,
            "photoUrls": petPutData.photoUrls,
            "tags": petPutData.tags,
            "status": petPutData.status 
        }

        cy.request({
            method: 'PUT',
            url: 'https://petstore.swagger.io/v2/pet',
            body: bodyPayload,
            headers: headersPayload
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
        cy.allure().step("id numarası "+ petPutData.id +": pet güncelleme işlemi başarıyla gerçekleşti.");  
    })

    it('DELETE - /v2/pet/id DeletePet', () => {
        cy.request('GET','https://petstore.swagger.io/v2/pet/'+petDeleteData.id)
        .then((response) =>{
            expect(response.status).to.eq(200);
        });
        cy.allure().step("id numarası "+ petDeleteData.id +": pet silme işlemi başarıyla gerçekleşti.");
    })
})