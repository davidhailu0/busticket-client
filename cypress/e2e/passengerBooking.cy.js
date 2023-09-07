describe('Test Passenger Booking Process', () => {
  beforeEach(()=>{
      cy.request({url:`http://${Cypress.env("NEXT_PUBLIC_APP_SERVER")}:${Cypress.env("NEXT_PUBLIC_APP_PORT")}/api/v1/deleteTestData`,method:"DELETE"})
      cy.request({url:`http://${Cypress.env("NEXT_PUBLIC_APP_SERVER")}:${Cypress.env("NEXT_PUBLIC_APP_PORT")}/api/v1/createTestTrip`,method:"POST"})
  })

  it('Test the Ticket Reserving Process with valid Input without registration', () => {
    cy.clearCookie("token")
    cy.visit(`http://${Cypress.env("host")}:3000`)
    cy.clearLocalStorage("Choose Destination")
    cy.get('#Departure').click();
    cy.get('#Departure-option-0').click();
    cy.get('#Destination').click();
    cy.get('#Destination-option-6').click();
    cy.get('#search').click();
    cy.get('.ButtonContainer > #reserve').click();
    cy.get(':nth-child(5) > :nth-child(1) > :nth-child(1) > .MuiTypography-root').click();
    cy.get(':nth-child(5) > :nth-child(1) > :nth-child(1) > .MuiTypography-root').click();
    cy.get('.seatContainer > :nth-child(3) > :nth-child(1) > :nth-child(1) > .MuiTypography-root').click();
    cy.get('#confirm').click();
    cy.get('#name0').clear('D');
    cy.get('#name0').type('Dawit');
    cy.get('#phone\\ number0').clear('0');
    cy.get('#phone\\ number0').type('0941256385');
    cy.get('#PickupLocation').click();
    cy.get('[data-value="Adisugebeya Dawit Pharmacy"]').click();
    cy.get('#next').click();
    cy.get('#continue').click();
    cy.get('#ok').click();
    cy.get('.bankCard1').click();
  })

  it('Test the Ticket Reserving Process with valid Input with registration', () => {
    cy.visit(`http://${Cypress.env("host")}:3000`)
    cy.clearLocalStorage("Choose Destination")
    cy.get('#Departure').click();
    cy.get('#Departure-option-0').click();
    cy.get('#Destination').click();
    cy.get('#Destination-option-6').click();
    cy.get('#search').click();
    cy.get('.ButtonContainer > #reserve').click();
    cy.get(':nth-child(5) > :nth-child(1) > :nth-child(1) > .MuiTypography-root').click();
    cy.get(':nth-child(5) > :nth-child(1) > :nth-child(1) > .MuiTypography-root').click();
    cy.get('.css-61prz8 > :nth-child(3) > :nth-child(1) > :nth-child(1) > .MuiTypography-root').click();
    cy.get('#confirm').click();
    cy.get('#name0').clear('D');
    cy.get('#name0').type('Dawit');
    cy.get('#phone\\ number0').clear('0');
    cy.get('#phone\\ number0').type('0941256385');
    cy.get('#PickupLocation').click();
    cy.get('[data-value="Adisugebeya Dawit Pharmacy"]').click();
    cy.get('#next').click();
    cy.get("#password").click();
    cy.get("#password").type("12345678");
    cy.get('#signup').click();
    cy.get('.bankCard1').click();
    cy.get('#finish').click();
  })


})