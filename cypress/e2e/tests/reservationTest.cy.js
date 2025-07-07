/// <reference types="cypress" />

import { busData } from "../../support/busReservationData";
import { hotelSearchData } from "../../support/hotelSearchData";
import BaseLibrary from "../base/BaseLibrary";
import BusSearchPage from "../pages/BusSearchPage";
import HomePage from "../pages/HomePage";
import HotelSearchPage from "../pages/HotelSearchPage";
import Utilities from "../pages/HelperFunctions ";
import TicketInformationPage from "../pages/TicketInfoPage";


Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Script error') || err.message.includes('cross origin')) {
    return false; 
  }
});

const baseLibrary = new BaseLibrary();
const homepage = new HomePage();
const utilities = new Utilities();
const hotelSearchPage = new HotelSearchPage();
const busSearchPage = new BusSearchPage();
const ticketInformationPage = new TicketInformationPage();

context('Hotel Search Tests', () => {
  it('should display filtered hotel results after searching by location and applying filters', () => {
    cy.allure().feature('Hotel Search');
    cy.allure().severity('critical');
    cy.allure().story('Search and filter hotels');
    
    baseLibrary.visit(); 
    baseLibrary.acceptCookies();
    homepage.selectTravelOptions(hotelSearchData.travel);
    homepage.fillHotelLocation(hotelSearchData.hotelLocation);
    homepage.fillHotelDateArea(hotelSearchData.checkinDate,hotelSearchData.checkoutDate);
    homepage.fillHotelGuestCountAndSearch(hotelSearchData.totalNumberOfAdult,hotelSearchData.totalNumberOfChild);
    hotelSearchPage.verifySearchResult();
    hotelSearchPage.filterByPriceAndVerify(hotelSearchData.maxPrice);
    utilities.scrollThePage('bottom');
    hotelSearchPage.selectAccommodationTypeAndVerify();
    utilities.scrollThePage('top');
    hotelSearchPage.selectHotelAndVerifyDetails();
  });
});

context('Bus Ticket Booking Tests', () =>{
  it('should successfully complete bus ticket booking with selected filters and verify trip details', () => {
    cy.allure().feature('Bus Ticket Search');
    cy.allure().severity('critical');
    cy.allure().story('Search bus tickets with filters and verify results');
    
    baseLibrary.visit(); 
    baseLibrary.acceptCookies();
    homepage.selectTravelOptions(busData.travel);
    homepage.setDepartureAndArrival(busData.origin,busData.destination);
    homepage.fillBusDate(busData.departureDate);
    homepage.searchBusAndVerify(busData.departureDateControl);
    busSearchPage.filterByBusCompany();
    utilities.scrollThePage('top');
    busSearchPage.selectSeatNumberAndContinue();
    ticketInformationPage.verifyTripDetails(busData.origin,busData.destination,busData.company,busData.dateOnTicketInformationPage,busData.time,busData.seatNumber)
    ticketInformationPage.fillContactInformation(busData.mail,busData.phone);
    ticketInformationPage.fillPassengerInformation(busData.firstname,busData.lastname,busData.TurkishIDNumber);
   });
});
  

