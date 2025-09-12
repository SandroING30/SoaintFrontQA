Feature: HU-1 Login y validación de Compra SauceDemo

  @Scenario03
  Scenario: ES-003 Agregar un producto al carrito
    Given el usuario ha iniciado sesión correctamente en SauceDemo
    And debe ser redirigido a la página de productos
    When hace clic en el botón Add to cart de un producto
    Then el ícono del carrito debe mostrar la cantidad de productos actualizada

  @Scenario04
  Scenario: ES-004 Visualizar productos en el carrito
    Given el usuario ha iniciado sesión correctamente en SauceDemo
    And debe ser redirigido a la página de productos
    And hace clic en el botón Add to cart de un producto
    When hace clic en el ícono del carrito
    Then debe visualizar el producto seleccionado con su nombre, descripción y precio

  @Scenario05
  Scenario: ES-005 Completar proceso de compra exitoso
    Given el usuario ha iniciado sesión correctamente en SauceDemo
    And debe ser redirigido a la página de productos
    And hace clic en el botón Add to cart de un producto
    And hace clic en el ícono del carrito
    When hace clic en el botón Checkout
    And completa el formulario con su información personal
    And hace clic en el botón Continue
    And hace clic en el botón Finish
    Then debe mostrarse un mensaje de confirmación Thank you for your order!
