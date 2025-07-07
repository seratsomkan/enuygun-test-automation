class BusSearchPage{
    
    filterByBusCompany(){
        cy.get("[data-testid='search-page__filter-companies']").click();
        cy.get("[type='checkbox']").eq(7).click();
        cy.get("[type='checkbox']").eq(10).click();
        cy.allure().step("Firma filtrelemesi uygulandı.");
        return this;
    }

    selectSeatNumberAndContinue(){
        cy.get("[data-testid='search-page__select-button-0']").click();
        cy.get("[class='search-page--0118 search-page__journey-detail-dialog-seat hover-active']").eq(6).click();
        cy.get("[id='gender_popper_male']").click();
        cy.get("[class='search-page__journey-detail-dialog-bottom-submit-button']").click();
        cy.get('h6').eq(0).should('be.visible');
        cy.allure().step("Koltuk numarası seçildi ve sefer bilgisi sayfasına erişildi.");
    }
}
export default BusSearchPage;