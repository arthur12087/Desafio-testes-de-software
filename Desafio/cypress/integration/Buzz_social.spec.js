/// <reference types="cypress" />

describe('Validar postagens do buzz rede social', () => {

    //função para emular copy and paste, função achada no github: https://github.com/cypress-io/cypress/issues/2386
    function paste({ destinationSelector, pastePayload, pasteType = 'text' }) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
        cy.get(destinationSelector).then($destination => {
            const pasteEvent = Object.assign(new Event('paste', { bubbles: true, cancelable: true }), {
                clipboardData: {
                    getData: (type = pasteType) => pastePayload,
                },
            });
            $destination[0].dispatchEvent(pasteEvent);
        });
    }



    beforeEach('Acessar site e logar', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        cy.get('#txtUsername').should('be.visible').type('Admin');
        cy.get('#txtPassword').should('be.visible').type('admin123');
        cy.get('input[name="Submit"]').click();
        cy.get('#welcome').should('be.visible');
    });

    it('Validar post de mensagem', () => {
        cy.get('#menu_buzz_viewBuzz').should('be.visible').click();
        cy.get('#createPost_content').type('Esta é uma mensagem automatizada');
        cy.get('#postSubmitBtn').click();
        cy.contains('div', 'Esta é uma mensagem automatizada').should('contain', 'Esta é uma mensagem automatizada');
    });

    it('Validar post de imagem', () => {
        cy.get('#menu_buzz_viewBuzz').click();
        cy.get('#images-tab-label').should('be.visible').click();
        cy.get('#phototext').type('Minha foto do chewbacca');
        cy.get('#image-upload-button').selectFile('07.jpg');
        cy.get('#thumb1').should('be.visible');
        cy.get('#imageUploadBtn').click();
        cy.contains('postContent', 'Minha foto do chewbacca').should('contain', 'Minha foto do chewbacca');
    });

    it.only('Validar postagem de um link', () => {
        cy.get('#menu_buzz_viewBuzz').click();
        cy.get('#video-tab-label').should('be.visible').click();
        paste({destinationSelector: '#createVideo_content', pastePayload: 'https://www.youtube.com/watch?v=kbpqZT_56Ns'})
        cy.get('input[value="Save Video"]').should('be.visible').click();
        cy.get('.video-container').should('be.visible');
    });

    it('Comentar, curtir postagem de alguém e compartilhar essa postagem', () => {
        cy.get('#menu_buzz_viewBuzz').click();
        cy.get('#rightBarHeadingMl').click();
        cy.get('#1_3').click({force: true});
        cy.get('#commentBoxnew_txt_popShareId_3').should('be.visible').type('Feliz aniversário');
        cy.get('#postLikeno_3').should('be.visible').click();
        cy.get('#commentBoxNew_popShareId_3').click();
        cy.get('#postShareno_3').click({force: true});
        cy.get('#shareBox_3').type('Feliz aniversário Jasmine');
        cy.get('#btnShare_3_2').should('be.visible').click();
        cy.get('#successBodyShare').should('be.visible').and('contain', 'Successfully Shared');
    });
});