/// <reference types="cypress" />

describe('PIM de funcionários', () => {
    beforeEach('Acessar site e logar', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        cy.get('#txtUsername').should('be.visible').type('Admin');
        cy.get('#txtPassword').should('be.visible').type('admin123');
        cy.get('input[name="Submit"]').click();
        cy.get('#welcome').should('be.visible');
    });

    it('Validar criação de um funcionário no sistema', () => {
        cy.get('#menu_pim_viewPimModule').should('be.visible').click();
        cy.get('#btnAdd').should('be.visible').click();
        cy.get('#firstName').should('be.visible').type('Solid');
        cy.get('#lastName').type('Snake');
        cy.get('#photofile').selectFile('07.jpg');
        cy.get('#btnSave').click();
        cy.get('#profile-pic > h1').should('be.visible').should('have.text', 'Solid Snake');
    });

    it('Excluir funcionário do sistema por nome', () => {
        cy.get('#menu_pim_viewPimModule').should('be.visible').click();
        cy.wait(250);
        cy.get('#empsearch_employee_name_empName').type('Charlie Carter');
        cy.get('#searchBtn').click();
        cy.wait(250);
        cy.contains('a','Charlie')
        cy.contains('a', 'Carter');
        cy.get('#ohrmList_chkSelectAll').check();
        cy.get('#btnDelete').click();
        cy.get('#dialogDeleteBtn').click();
        cy.contains('td', 'No Records Found').should('have.text', 'No Records Found');
    });

    it('Validar criação de um relatório de funcionários', () => {
        cy.get('#menu_pim_viewPimModule').should('be.visible').click();
        cy.get('#menu_core_viewDefinedPredefinedReports').click({force:true});
        cy.get('#btnAdd').click();
        cy.get('#report_report_name').type('Relatório do dia');
        cy.get('#report_criteria_list').select('job_title');
        cy.get('#btnAddConstraint').click();
        cy.get('#report_job_title').select('26');
        cy.get('#report_display_groups').select('display_group_12');
        cy.get('#btnAddDisplayGroup').click();
        cy.get('#btnSave').click();
        cy.contains('td', 'Relatório do dia').should('have.text', 'Relatório do dia');
    });
});

