describe("Testing the Registration Process",()=>{
   
    it("Signing up with valid inputs",()=>{
        cy.request({url:`http://${Cypress.env("NEXT_PUBLIC_APP_SERVER")}:${Cypress.env("NEXT_PUBLIC_APP_PORT")}/api/v1/deleteTestData`,method:"DELETE"})
        cy.visit(`http://${Cypress.env("host")}:3000`)
        cy.get('#loginAppBar').click();
        cy.get('.signupAppbar').click();
        cy.get('#name').clear('D');
        cy.get('#name').type('Dawit');
        cy.get('#phone\\ number').clear('0');
        cy.get('#phone\\ number').type('0920779250');
        cy.get('#password').clear('1');
        cy.get('#password').type('12345678');
        cy.get('#signup').click();
    })

    it("Signing up with Invalid inputs",()=>{
        cy.visit(`http://${Cypress.env("host")}:3000`)
        cy.get('#loginAppBar').click();
        cy.get('.signupAppbar').click();
        cy.get('#name').clear('4');
        cy.get('#name').type('454545454');
        cy.get('#phone\\ number').clear('h');
        cy.get('#phone\\ number').type('hbhbhhbhh');
        cy.get('#signup').click();
    })

    it("Sign In with Valid Inputs",()=>{
        cy.clearCookie("token")
        cy.visit(`http://${Cypress.env("host")}:3000`)
        cy.get('#loginAppBar').click();
        cy.get('#phone\\ number').clear('0');
        cy.get('#phone\\ number').type('0920779250');
        cy.get('#password').clear('1');
        cy.get('#password').type('12345678');
        cy.get('#login').click();
    })

    it("Sign In with Unregistered Inputs",()=>{
        cy.clearCookie("token")
        cy.visit(`http://${Cypress.env("host")}:3000`)
        cy.get('#loginAppBar').click();
        cy.get('#phone\\ number').clear('0');
        cy.get('#phone\\ number').type('0920555555');
        cy.get('#password').clear('1');
        cy.get('#password').type('12345678');
        cy.get('#login').click();
    })

    it("Sign In with Invalid Inputs",()=>{
        cy.visit(`http://${Cypress.env("host")}:3000`)
        cy.get('#loginAppBar').click();
        cy.get('#phone\\ number').clear('v');
        cy.get('#phone\\ number').type('vnvjnvjvn');
        cy.get('#password').clear('n');
        cy.get('#password').type('nnvnnvnv');
        cy.get('#login').click();
    })

})