Cypress.on('uncaught:exception', (err, runnable) => {
        return false
        });

describe('Challenge part 2', () => {
  it.only('Fill form', () => {
    cy.visit('/')

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
    cy.get('#closeLargeModal').click({ force: true });
  });

  it('Open new window', () => {
    cy.visit('/').then((win) => {
      cy.spy(win, 'open').as('open')
    });

    cy.contains('h5', 'Alerts, Frame & Windows').click();
    cy.get('li[id="item-0"]').contains('span', 'Browser Windows').click();
    
    cy.get('#windowButton').click();
    cy.get('@open')
      .should('have.been.calledWith', '', 'MsgWindow')
      .its('firstCall.returnValue')
      .then((childWindow) => {
        expect(childWindow.document.body.innerText).to.have.text('This is a sample page')
      })
      .wait(1000)
      .invoke('close')
    /*
    //cy.url().should('include', '/sample');
    cy.get('#sampleHeading').should('have.text', 'This is a sample page'); */
  });

  it.only('opens a real window in the current test runner', () => {
  cy.visit('/browser-windows').then((win) => {
    cy.spy(win, 'open').as('open')
  })
  cy.get('#messageWindowButton').click()
  cy.get('@open')
    .should('have.been.calledWith', '', 'MsgWindow')
    .its('firstCall.returnValue')
    .then((childWindow) => {
      expect(childWindow.document.body.innerText).to.include('Knowledge')
    })
    .wait(1000)
    .invoke('close')
})

  it('Web tables', () => {
    cy.visit('/')

    cy.contains('h5', 'Elements').click();
    cy.get('li[id="item-3"]').contains('span', 'Web Tables').click();
    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type('Mickey');
    cy.get('#lastName').type('Mouse');
    cy.get('#userEmail').type('mickeymouse@example.com');
    cy.get('#age').type(34);
    cy.get('#salary').type(2000);
    cy.get('#department').type('Entertainment');
    cy.get('#submit').click();

    cy.get('.rt-tbody').scrollTo('right')
    cy.get('#edit-record-4').click();
    cy.get('#age').type(25);
    cy.get('#submit').click();

    cy.get('.rt-tbody').scrollTo('right')
    cy.get('#delete-record-4').click();
  });

  it('Progress bar', () => {
    cy.visit('/')

    cy.contains('h5', 'Widgets').click();
    cy.get('li[id="item-4"]').contains('span', 'Progress Bar').click();
    cy.get('#startStopButton').click();
    cy.wait(500);
    cy.get('#startStopButton').click();

    cy.get('div[role="progressbar"]').should('have.length.of.at.most', 25);
    cy.get('#startStopButton').click();
    //cy.get('div[role="progressbar"]', { timeout: 50000 }).should('have.attr', 'aria-valuenow', '100');
    cy.get('#resetButton').should('be.visible').click();
    cy.get('div[role="progressbar"]').should('have.attr', 'aria-valuenow', '0');
  });

  it('Sortable', () => {
    cy.visit('/')

    cy.contains('h5', 'Interactions').click();
    cy.get('li[id="item-0"]').contains('span', 'Sortable').click();

    cy.get('.vertical-list-container').children().eq(0).as('one');
    cy.get('.vertical-list-container').children().eq(1).as('two');
    cy.get('@one').drag('@two', { position: 'bottom' });

    cy.get('.vertical-list-container').children().contains('One').as('one');
    cy.get('.vertical-list-container').children().contains('Two').as('two');
    cy.get('@one').drag('@two', { position: 'top' });
  });
});