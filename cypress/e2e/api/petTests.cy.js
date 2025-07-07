/// <reference types="cypress" />

import { petData, petDeleteData, petGetData, petPostData, petPutData } from "../../support/petData";

context('Pet Tests',() =>{

    const headersPayload = {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }

    it('GET - /v2/pet/id GetPetInfo', () =>{
        cy.request('GET',petData.baseUrl+petGetData.id)
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
            url: petData.baseUrl,
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
            url: petData.baseUrl,
            body: bodyPayload,
            headers: headersPayload
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
        cy.allure().step("id numarası "+ petPutData.id +": pet güncelleme işlemi başarıyla gerçekleşti.");  
    })

    it('DELETE - /v2/pet/id DeletePet', () => {
        cy.wait(1000);
        cy.request('GET',petData.baseUrl+petDeleteData.id)
        .then((response) =>{
            expect(response.status).to.eq(200);
        });
        cy.allure().step("id numarası "+ petDeleteData.id +": pet silme işlemi başarıyla gerçekleşti.");
    })
})