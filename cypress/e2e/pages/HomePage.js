import { busData } from "../../support/busReservationData";
import Utilities from "./HelperFunctions ";

class HomePage {
    constructor() {
        this.utilities = new Utilities;
    }
    selectTravelOptions(travel){ 
        switch(travel){   
            case "otel":
                cy.contains('span','Otel').click();  
                break;   
            case "otobüs":
                cy.contains('span','Otobüs').click(); 
                break;     
            default:
                console.log("Geçersiz seyahat seçimi")
                break;      
        }
        cy.allure().step(travel+' işlemi seçildi.'); 
        return this;
    }

    fillHotelLocation(location){
        cy.wait(1000);
        cy.get("[data-testid='hotel-label']").eq(0).type(location);
        cy.wait(1000);
        cy.get("[role='option']").eq(0).click();
        cy.allure().step("Konum bilgisi girildi.");
        return this;
    } 

    fillHotelDateArea(checkinDate,checkoutDate){
        cy.get("[data-testid='hotel-datepicker-input']").click();
        cy.get("[data-day='"+checkinDate+"']").eq(0).click();
        cy.get("[data-day='"+checkoutDate+"']").eq(0).click();
        cy.allure().step("Tarih seçimi yapıldı.");
        return this;
    } 

    fillHotelGuestCountAndSearch(totalNumberOfAdult,totalNumberOfChild){
        cy.get("[data-testid='hotel-popover-button']").click();

        if(totalNumberOfAdult>=2){
            for(let numberOfAdult=2;numberOfAdult<totalNumberOfAdult;numberOfAdult++){
                cy.get("[data-testid='hotel-adult-counter-plus-button']").click();
            }
        }
        else if(totalNumberOfAdult>0 && totalNumberOfAdult<2){
            for(let numberOfAdult=2;numberOfAdult>totalNumberOfAdult;numberOfAdult--){
                cy.get("[data-testid='hotel-adult-counter-minus-button']").click();
            }
        }
        else{
            console.log("Yanlış değer girildi.")
        }
        if(totalNumberOfChild>0){
            for(let NumberOfChild=0;NumberOfChild<totalNumberOfChild;NumberOfChild++){
                cy.get("[data-testid='hotel-child-counter-plus-button']").click();
                cy.get("[data-testid='hotel-child-select-0-"+NumberOfChild+"']").select('3');
            }
        }
        cy.get("[data-testid='hotel-guest-submit-button']").click();
        cy.get("[data-testid='hotel-submit-search-button']").click();
        cy.allure().step("Misafir bilgileri girildi ve arama yapıldı.");
        return this;
    } 

    setDepartureAndArrival(originLocation,destinationLocation){
        cy.get("[name='originLocation']").type(originLocation);
        cy.get("[data-testid='endesign-undefined-autosuggestion-option-item-0']").click();
        cy.get("[name='destinationLocation']").type(destinationLocation);
        cy.get("[data-testid='endesign-undefined-autosuggestion-option-item-0']").click();
        cy.allure().step("kalkış ve varış lokasyonları seçildi.");
        return this;
    }

    fillBusDate(date){
        cy.get("[data-testid='undefined-datepicker-input']").click();
        cy.get("[title='"+date+"']").click();
        cy.wait(1500);
        cy.allure().step("Gidiş tarihi seçildi.");
        return this;
    }

    searchBusAndVerify(date){
        cy.get("[id='bus-search-button']").click();
        this.utilities.waitUntilExists("[class='search-page-sorting-wrapper_styled']");
        
        cy.get('strong').eq(1).invoke('text').then((originLocationResult)=>{
            expect(busData.origin).to.equal(originLocationResult);
        })

        cy.get('strong').eq(2).invoke('text').then((destinationLocationResult)=>{
            expect(busData.destination).to.equal(destinationLocationResult);
        })
        cy.get('span').eq(49).invoke('text').then((departureDateResult)=>{
            expect(departureDateResult).to.equal(date);
        })
        cy.allure().step("Otobüs bileti araması yapıldı ve girilen değerlerle eşleştiği doğrulandı.");
        return this;    
    }  
}
export default HomePage;