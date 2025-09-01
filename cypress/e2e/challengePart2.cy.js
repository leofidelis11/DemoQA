import '@4tw/cypress-drag-drop'

Cypress.on('uncaught:exception', (err, runnable) => {
        return false
        });

describe('Challenge part 2', () => {
  it('Fill form', () => {
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

  it.skip('Open new window', () => {
    cy.visit('/')

    cy.contains('h5', 'Alerts, Frame & Windows').click();
    cy.get('li[id="item-0"]').contains('span', 'Browser Windows').click();

    cy.window().then((win) => {
      cy.spy(win, 'open').as('open')
    })

    cy.get('#windowButton').click({ force: true });

    cy.get('@open')
      .should('have.been.calledWith', '/sample', '_blank')
      .its('firstCall.returnValue')
      .then((childWindow) => {
        expect(childWindow.document.body.h1.innerText).to.include('This is')
      })
      .wait(1000)
      .invoke('close')
  });

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

    cy.get('#edit-record-4').click();
    cy.get('#age').type(25);
    cy.get('#submit').click();

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
    cy.get('#resetButton', { timeout: 10000 }).should('be.visible').click({ force: true });
    cy.get('div[role="progressbar"]', { timeout: 5000 }).should('have.attr', 'aria-valuenow', '0');
  });

  it('Sortable', () => {
    cy.visit('/')

    cy.contains('h5', 'Interactions').click();
    cy.get('li[id="item-0"]').contains('span', 'Sortable').click();

    cy.get('.vertical-list-container').children().contains('One').as('one');
    cy.get('.vertical-list-container').children().contains('Two').as('two');
    cy.get('@one').drag('@two', { force: true });

    cy.get('.vertical-list-container').children().first().should('have.text', 'Two');

    cy.get('@two').drag('@one', { force: true });
    cy.get('.vertical-list-container').children().first().should('have.text', 'One');
  });
});