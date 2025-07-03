/// <reference types="cypress" />

import BaseLibrary from "../base/BaseLibrary";
import HomePage from "../pages/HomePage";
import HotelSearchPage from "../pages/HotelSearchPage";
import Utilities from "../pages/Utilities";

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Script error') || err.message.includes('cross origin')) {
    return false; 
  }
});

context('Hotel Search Test', () => {
  
  const baseLibrary = new BaseLibrary();
  const homepage = new HomePage();
  const utilities = new Utilities();
  const hotelSearchPage = new HotelSearchPage();

  it('should search hotels by location, apply filters, select accommodation and verify details', () => {
    cy.allure().feature('Hotel Search');
    cy.allure().severity('critical');
    cy.allure().story('Search and filter hotels');
    
    baseLibrary.visit(); 
    homepage.acceptCookies();
    homepage.selectTravelOptions('otel');
    homepage.fillLocationTextBox('Antalya');
    homepage.fillDateArea(15,22);
    homepage.fillGuestCountAndSearch(3,1);
    hotelSearchPage.verifySearchResult();
    hotelSearchPage.filterByPriceAndVerify(60000);
    utilities.scrollThePage('bottom');
    hotelSearchPage.selectAccommodationTypeAndVerify();
    utilities.scrollThePage('top');
    hotelSearchPage.selectHotelAndVerifyDetails();
  })
})
