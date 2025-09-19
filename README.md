# Prueba QA Automation Front - Playwright  

**Autor:** Sandro Huamán Mendoza - SOAINT  

Repositorio del proyecto de **automatización de pruebas QA del Frontend** de SauceDemo, utilizando **Playwright** con **Cucumber** y siguiendo el patrón de diseño **Page Object Model (POM)**.  

## 📁 Estructura del Proyecto

```
SOAINTFrontQA-main/
├── node_modules/                           # Carpeta que contiene todas las dependencias instaladas del proyecto
├── screenshots/                            # Capturas de pantalla generadas automáticamente tras la ejecución de pruebas
├── src/
│   └── test/
│       ├── features/                       # Archivos Gherkin (.feature) con los escenarios de prueba
│       │   ├── login.feature               # Escenarios de prueba relacionados con el login
│       │   └── shoppingCart.feature        # Escenarios de prueba del carrito de compras
│       ├── pageObjects/                    # Clases que representan páginas y métodos reutilizables (POM)
│       │   ├── appPage.ts                  # Funciones y elementos genéricos para toda la app
│       │   └── loginPage.ts                # Funciones y elementos específicos de la página de login
│       ├── steps/                          # Implementación de los pasos definidos en los features
│       │   ├── login_step.ts
│       │   └── shoppingCart_step.ts
│       └── utiles/                         # Archivos de soporte como hooks, fixtures, etc
│           ├── hooks.ts                    # Hooks de Cucumber (before, after) para preparar o limpiar pruebas
│           └── pageFixture.ts              # Objeto compartido para el contexto y la página de Playwright
├── .env                                    # Variables de entorno para configurar diferentes ambientes
├── .gitignore                              # Lista de archivos y carpetas que no se suben a Git
├── cucumber-report.html                    # Reporte visual en HTML de la ejecución de pruebas
├── cucumber.json                           # Resultados de pruebas en formato JSON
├── package.json                            # Configuración del proyecto, scripts y dependencias
├── package-lock.json                       # Versiones exactas de las dependencias instaladas
├── playwright.config.ts                    # Configuración personalizada de Playwright
├── README.md                               # Documentación del proyecto
└── tsconfig.json                           # Configuración del compilador TypeScript
```

## 🔹 Descripción de Carpetas y Archivos

- **`.env`**: Contiene variables globales del proyecto, como el entorno (`qa` o `dev`).  
- **`screenshots/`**: Capturas de pantalla automáticas durante la ejecución de pruebas.  
- **`src/test/features/`**: Archivos `.feature` redactados en **Gherkin** con los escenarios de prueba.  
- **`src/test/pageObjects/`**: Clases que representan páginas del frontend, con elementos y métodos reutilizables en los steps.  
- **`src/test/steps/`**: Archivos `.steps.ts` con la implementación de los pasos de cada escenario de prueba.  
- **`src/test/utiles/hooks.ts`**: Hooks de Cucumber para ejecutar acciones antes o después de cada escenario.  
- **`src/test/utiles/pageFixture.ts`**: Objeto `fixture` para compartir instancias de Playwright entre diferentes partes del proyecto.  

## 🚀 Inicialización del Proyecto

Para ejecutar en tu ordenador el siguiente proyecto, sigue los siguientes pasos:

1. **Clonar el Repositorio**

Clona este repositorio en tu máquina local usando el siguiente comando:

```bash
   git clone https://github.com/SandroING30/SoaintFrontQA.git
```

2. **Instalar Dependencias**

Una vez clonado el repositorio, abre el proyecto en **Visual Studio Code (VS Code)** y abre una nueva terminal dentro de la carpeta del proyecto. Luego ejecuta:

```bash
    npm install
```

3. **Configuración del navegador**
En el archivo `hooks.ts` se define el navegador que se va a utilizar, este navegador se va a configurar de acuerdo a sus necesidades:

    ```ts
    Before(async function(){
        browser = await chromium.launch({
            headless: false, 
            //channel: 'msedge' <==DESCOMENTAR ESTA LÍNEA DE CÓDIGO SI SE DESEA USAR EDGE O CAMBIAR OTRO CHANEEL
        });
        context = await browser.newContext()
        page = await context.newPage()
        pageFixture.page = await page;
        page.setViewportSize({
            width: 1500, 
            height: 700,
        });
    })
    ```
    
Adicionalmente, en `playwright.config.ts` puedes definir los navegadores disponibles para las pruebas.

4. **Ejecutar Proyecto**

Para ejecutar todos los escenarios de prueba, usa la terminal y escribe:

```bash
    npm run test   
```

Si quieres ejecutar un escenario específico, utiliza:

```bash
    npx cucumber-js --tags="@Scenario01"   
```

6. **Reporte HTML**

El reporte se genera automáticamente gracias al hook After definido en `hooks.ts`. Al finalizar la ejecución, se actualiza el archivo `cucumber-report.html`, incluyendo capturas de pantalla que sirven como evidencia de la ejecución de los tests.
