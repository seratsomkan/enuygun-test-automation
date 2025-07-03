
class BaseLibrary {

    visit(){
        cy.visit('https://www.enuygun.com/'); 
        cy.allure().step('Sayfaya erişildi.'); 
    }
}

export default BaseLibrary;