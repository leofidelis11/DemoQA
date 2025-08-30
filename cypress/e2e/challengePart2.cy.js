describe('Challenge part 2', () => {
  it('Fill form', () => {
    cy.visit('https://demoqa.com')

    cy.contains('h5', 'Forms').click();
    cy.get('li[id="item-0"]').contains('span', 'Practice Form').click();

    cy.get('#firstName').type('Mickey');
    cy.get('#lastName').type('Mouse');
    cy.get('#userEmail').type('mickeymouse@example.com');
    cy.get('label[for="gender-radio-1"]').contains('Male').click();
    cy.get('#userNumber').type('1234567891');
    //cy.get('#subjectsInput').type('Maths');
    //cy.get('#hobbies-checkbox-1').check();
    cy.get('#uploadPicture').selectFile('sampleFileToUpload.txt');
    //cy.get('#currentAddress').type("Disney's Hollywood Studios - Orlando, Florida USA");
    cy.get('#submit').click();

    cy.get('#example-modal-sizes-title-lg').contains('Thanks').should('be.visible')
    cy.get('#closeLargeModal').click();
  });
});