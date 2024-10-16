
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login-form', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError')
      },
      failOnStatusCode: false
    });
  });

  it('should display the login form', () => {
    cy.get('@consoleError').then((consoleError) => {
      if (consoleError.called) {
        cy.log('Console error was called. There might be an issue with the page load.');
      }
    });

    cy.contains('Sign in', { timeout: 10000 }).should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button').contains('Sign in').should('be.visible');
  });

  it('should navigate to forgot password page', () => {
    cy.contains('Forgot Password?').click();
    cy.url().should('include', '/forgot-password');
  });

  it('should navigate to registration page', () => {
    cy.contains('Register here').click();
    cy.url().should('include', '/registration-form'); 
  });

  // it('should show error for empty fields', () => {
  //   cy.get('button').contains('Sign in').click();
    
  //   // Check for any error message related to empty fields
  //   cy.get('.Toastify__toast-body, .error-message, [role="alert"]')
  //     .should('be.visible')
  //     .and('contain.text', 'email')
  //     .and('contain.text', 'password');
  // });

  it('should attempt login with valid credentials', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');

    // Intercept the API call
    cy.intercept('POST', 'http://localhost:3000/api/users/login', {
      statusCode: 200,
      body: { message: 'Login successful' }
    }).as('loginRequest');

    cy.get('button').contains('Sign in').click();

    // Wait for the request to complete
    cy.wait('@loginRequest');

    // Check for success toast
    cy.get('.Toastify__toast-body, .success-message, [role="alert"]')
      .should('be.visible')
      .and('contain.text', 'Login successful');

    // Check for navigation
    cy.url().should('include', '/home', { timeout: 10000 });
  });

  it('should handle OTP flow', () => {
    cy.get('input[name="email"]').type('otp@example.com');
    cy.get('input[name="password"]').type('password123');

    // Intercept the API call
    cy.intercept('POST', 'http://localhost:3000/api/users/login', {
      statusCode: 200,
      body: { message: 'OTP sent to your email' }
    }).as('loginRequest');

    cy.get('button').contains('Sign in').click();

    // Wait for the request to complete
    cy.wait('@loginRequest');

    // Check for OTP sent toast
    cy.get('.Toastify__toast-body, .success-message, [role="alert"]')
      .should('be.visible')
      .and('contain.text', 'OTP sent');

    // Check for navigation to OTP page
    cy.url().should('include', '/otp', { timeout: 10000 });
  });

  it('should handle login failure', () => {
    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');

    // Intercept the API call
    cy.intercept('POST', 'http://localhost:3000/api/users/login', {
      statusCode: 401,
      body: { message: 'Login failed' }
    }).as('loginRequest');

    cy.get('button').contains('Sign in').click();

    // Wait for the request to complete
    cy.wait('@loginRequest');

    // Check for error toast
    cy.get('.Toastify__toast-body, .error-message, [role="alert"]')
      .should('be.visible')
      .and('contain.text', 'Login failed');
  });
});