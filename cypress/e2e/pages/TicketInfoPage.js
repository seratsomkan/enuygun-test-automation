class TicketInformationPage{
    verifyTripDetails(origin,destination,companyName,date,time,seat){
        cy.get("[class='text']").eq(0).invoke('text').then((recordedDeparture)=>{
            expect(recordedDeparture).to.equal(origin);
        })
        
        cy.get("[class='text']").eq(1).invoke('text').then((recordeddestination)=>{
            expect(recordeddestination).to.equal(destination);
        })

        cy.get("[class='text']").eq(2).invoke('text').then((recordedCompanyName)=>{
            expect(recordedCompanyName).to.equal(companyName);
        })

        cy.get("[class='text']").eq(3).invoke('text').then((recordedDate)=>{
            expect(recordedDate).to.include(date);
        })

        cy.get("[class='text']").eq(4).invoke('text').then((recordedTime)=>{
            expect(time).to.equal(recordedTime);
        })

        cy.get("[class='text']").eq(5).should('be.visible');

        cy.get("[data-source='seat']").invoke('text').then((recordedSeat)=>{
            expect(recordedSeat).to.equal(seat);
        })
        cy.allure().step("Sefer bilgilerinin doğruluğu sorgulandı.");
    }

    fillContactInformation(mail,phone){
        cy.get("[name='contact_email']").type(mail);
        cy.get("[name='contact_phone_number']").type(phone);
        cy.allure().step("İletişim bilgileri için data girildi.");
    }

    fillPassengerInformation(firstname,lastname,TurkishIDNumber){
        cy.get("[id='passenger0_firstname']").type(firstname);
        cy.get("[id='passenger0_lastname']").type(lastname);
        cy.get("[id='publicId_0']").type(TurkishIDNumber);
        cy.allure().step("Yolcu bilgileri için data girildi.");
    }
}
export default TicketInformationPage;