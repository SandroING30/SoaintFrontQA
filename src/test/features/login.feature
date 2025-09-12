Feature: HU-1 Login y validación de Compra SauceDemo

  @Scenario01
  Scenario: ES-001 Inicio de sesión exitoso
    Given el usuario se encuentre en la página de login de SauceDemo
    When ingresa un nombre de usuario válido y una contraseña válida
    And hace clic en el botón Login
    Then debe ser redirigido a la página de productos

  @Scenario02
  Scenario: ES-002 Inicio de sesión fallido con credenciales inválidas
    Given el usuario se encuentre en la página de login de SauceDemo
    When ingresa un nombre de usuario inválido o una contraseña inválida
    And hace clic en el botón Login
    Then debe visualizar un mensaje que informe que las credenciales no son válidas
