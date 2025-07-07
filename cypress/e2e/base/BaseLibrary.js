
class BaseLibrary {
    visit(){
        cy.visit('https://www.enuygun.com/'); 
        cy.allure().step('Sayfaya erişildi.'); 
    }
    acceptCookies(){
        cy.get('[id="onetrust-accept-btn-handler"]').click();
        cy.allure().step('Çerezler kabul edildi'); 
        return this;
    }
}

export default BaseLibrary;