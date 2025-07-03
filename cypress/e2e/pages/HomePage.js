class HomePage {
    acceptCookies(){
        cy.get('[id="onetrust-accept-btn-handler"]').click();
        cy.allure().step('Çerezler kabul edildi'); 
        return this;
    }

    selectTravelOptions(travel){ 
        switch(travel){
            case "uçak bileti":
                cy.contains('span','Uçak bileti').click(); 
                break;    
            case "otel":
                cy.contains('span','Otel').click();  
                break;   
            default:
                console.log("Geçersiz seyahat seçimi")
                break;      
        }
        cy.allure().step(travel+' işlemi seçildi.'); 
        return this;
    }

    fillLocationTextBox(location){
        cy.wait(1000);
        cy.get("[data-testid='hotel-label']").eq(0).type(location);
        cy.wait(1000);
        cy.get("[role='option']").eq(0).click();
        cy.allure().step("Konum bilgisi girildi.");
        return this;
    } 

    fillDateArea(checkinDate,checkoutDate){
        cy.get("[data-testid='hotel-datepicker-input']").click();
        cy.get("[data-day='"+checkinDate+"']").eq(0).click();
        cy.get("[data-day='"+checkoutDate+"']").eq(0).click();
        cy.allure().step("Tarih seçimi yapıldı.");
        return this;
    } 

    fillGuestCountAndSearch(totalNumberOfAdult,totalNumberOfChild){
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
}
export default HomePage;