class Utilities {

    scrollThePage(value){
        if(value == 'bottom'){
            cy.scrollTo('bottom', { duration: 1000 }); 
        }
        else if (value == 'top') {
            cy.scrollTo('top', { duration: 1000 }); 
        } else {
            console.log("Yanlış seçim.");
        }
    }
}
export default Utilities;