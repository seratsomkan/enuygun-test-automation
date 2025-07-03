class HotelSearchPage {

    constructor() {
        this.accommodationTypeButtonText = '';
        this.filterPriceText = '';
    }
    
    verifySearchResult(){
        cy.get("[data-testid='hotel-result-title']").invoke('text').then(searchResultTitle => { 
            cy.get("[data-testid='endesign-hotel-autosuggestion-input']").invoke('val').then(searchedCity => {
                expect(searchResultTitle).to.include(searchedCity);
            })
        })
        cy.allure().step("Arama sonucunun, aranan lokasyon ile eşleştiği doğrulandı.");
    }

    filterByPriceAndVerify(maxPrice){
        cy.get("[data-testid='hotel-search-filter-filter-0-range-max-input-label").type(maxPrice);
        cy.get("[data-testid='hotel-search-filter-filter-0-range-double-input-button']").click();

        cy.get("[class='sc-5b41bdd3-1 bLYQYk']").invoke('text').then((filterPriceText) => {
            this.filterPriceText = filterPriceText;
            const filterPrice = parseInt(filterPriceText.replace(/[^\d]/g, ''), 10);
            expect(filterPrice).to.equal(maxPrice);
        })
        cy.allure().step("Fiyat filtrelemesi yapıldı ve yapılan filterinin göründüğü doğrulandı.");
        return this;
    } 
    selectAccommodationTypeAndVerify(){
        cy.get("[data-testid='hotel-search-filter-filter-max-undefined-min-undefined-text']").eq(0)
          .invoke('text')
          .then((accommodationTypeButtonText) =>{
            this.accommodationTypeButtonText = accommodationTypeButtonText;

            cy.get("[data-testid='hotel-search-filter-filter-max-undefined-min-undefined-text']").eq(0)
              .click();

            cy.get("[class='sc-5b41bdd3-1 bLYQYk']").eq(0)
            .invoke('text')
            .then((accommodationTypeFilterText)=>{
                expect(accommodationTypeFilterText).to.equal(accommodationTypeButtonText);
            })
        })
        cy.allure().step("Konaklama Türü filtrelemesi yapıldı ve filterinin göründüğü doğrulandı.");
        return this;
    }
    
    selectHotelAndVerifyDetails(){
        cy.get("[class='sc-b3ae6679-9 bFIEgK']", { timeout: 10000 })
        .should('be.visible')
        .eq(0)
        .invoke('removeAttr','target')  
        .click();

        cy.get("[data-testid='offer-concept-description']").eq(0).invoke('text').then((roomInformation)=>{
            expect(roomInformation).to.equal(this.accommodationTypeButtonText);
        })

        cy.get("[data-testid='offer-price']").eq(0).invoke('text').then((hotelRoomPrice)=>{
            expect(parseInt(hotelRoomPrice.replace(/[^\d]/g, ''),10)).to.be.lte(parseInt(this.filterPriceText.replace(/[^\d]/g, ''), 10));
        })
        cy.allure().step("Seçilen otelin oda fiyatı ve konaklama türü, filtreye uygun olduğu doğrulandı");
        return this;
    }
}
export default HotelSearchPage;

