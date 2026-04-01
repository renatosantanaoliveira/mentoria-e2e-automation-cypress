# E2E Automation - Cypress

Template de automação de testes end-to-end com Cypress, suporte a múltiplos ambientes e relatórios Allure.

## Stack

- **[Cypress](https://www.cypress.io/)** `^15` — framework de testes E2E
- **[allure-cypress](https://allurereport.org/docs/cypress/)** — integração com Allure Report
- **[allure-commandline](https://www.npmjs.com/package/allure-commandline)** — geração e visualização dos relatórios
- **Node.js** `>=18`

## Pré-requisitos

- Node.js 18 ou superior
- Java 8+ instalado (exigido pelo Allure CLI para gerar relatórios)

## Instalação

```bash
git clone https://github.com/renatosantanaoliveira/mentoria-e2e-automation-cypress.git
cd mentoria-e2e-automation-cypress
npm install
```

## Configuração de variáveis de ambiente

Copie o arquivo de exemplo e preencha com os valores do seu ambiente:

```bash
cp cypress.env.json.example cypress.env.json
```

> `cypress.env.json` está no `.gitignore` e **nunca deve ser commitado**.

As variáveis disponíveis estão documentadas no próprio `cypress.env.json.example`.

## Ambientes

O projeto suporta três ambientes configurados em `config/`:

| Arquivo | Ambiente | Ativação |
|---|---|---|
| `config/dev.js` | Desenvolvimento | `CYPRESS_ENV=dev` |
| `config/qa.js` | Qualidade (padrão) | `CYPRESS_ENV=qa` ou omitir |
| `config/prd.js` | Produção | `CYPRESS_ENV=prd` |

Cada arquivo define `baseUrl` e as variáveis `env` do respectivo ambiente. Quando `CYPRESS_ENV` não é informado, o ambiente **QA** é utilizado.

## Executando os testes

### Modo interativo (Cypress UI)

```bash
npm run cy:open           # QA (padrão)
npm run cy:open:dev
npm run cy:open:qa
npm run cy:open:prd
```

### Modo headless (CI)

```bash
npm run cy:run            # QA (padrão)
npm run cy:run:dev
npm run cy:run:qa
npm run cy:run:prd
```

### Com relatório Allure

```bash
npm run test              # executa testes (QA) + gera e abre o relatório
npm run test:dev
npm run test:qa
npm run test:prd
```

### Relatório separado

```bash
npm run allure:generate   # gera o HTML a partir dos resultados
npm run allure:open       # abre o relatório no browser
```

## Estrutura do projeto

```
├── config/
│   ├── dev.js              # variáveis do ambiente de desenvolvimento
│   ├── qa.js               # variáveis do ambiente de qualidade
│   └── prd.js              # variáveis do ambiente de produção
├── cypress/
│   ├── e2e/
│   │   ├── example.login.cy.js    # exemplos de login via UI (formulário)
│   │   └── example.session.cy.js  # exemplo de login com cache via cy.session()
│   ├── fixtures/           # dados estáticos para os testes
│   └── support/
│       ├── commands.js     # custom commands (cy.login, cy.loginWithSession)
│       └── e2e.js          # ponto de entrada do support (importa commands e Allure)
├── cypress.config.js       # configuração principal do Cypress
├── cypress.env.json.example
└── package.json
```

## Custom commands

### `cy.login(username?, password?)`

Login direto via UI — executa o fluxo de formulário a cada chamada. Adequado para autenticação por formulário sem persistência de sessão.

```js
cy.login()                         // usa AUTH0_USER_EMAIL e AUTH0_USER_PASSWORD do config
cy.login('other_user')             // sobrescreve o usuário
cy.login('other_user', 'senha')    // sobrescreve usuário e senha
```

### `cy.loginWithSession(username?, password?)`

Login com cache de sessão via `cy.session()`. O Cypress executa o setup apenas uma vez e reutiliza o estado cacheado (cookies, localStorage, sessionStorage) nos testes seguintes.

Requer que a autenticação persista estado no browser — compatível com **Auth0, OAuth2 e JWT**. Não funciona com apps que armazenam sessão apenas em memória.

```js
cy.loginWithSession()              // usa AUTH0_USER_EMAIL e AUTH0_USER_PASSWORD do config
cy.loginWithSession('user@email.com')
```

> Para adaptar ao mecanismo de autenticação do seu app, edite o bloco `validate()` em `cypress/support/commands.js`.

## Relatórios

Os relatórios são gerados com Allure. Após a execução dos testes, os arquivos brutos ficam em `allure-results/` e o HTML final em `allure-report/`. Ambas as pastas estão no `.gitignore`.

```bash
npm run cy:run            # gera allure-results/
npm run allure:generate   # processa e gera allure-report/
npm run allure:open       # abre no browser
```

## Segurança

- Nunca commite `cypress.env.json` — ele contém credenciais reais
- Secrets de CI devem ser injetados como variáveis de ambiente e referenciados nos arquivos `config/*.js`
- Os arquivos `config/*.js` devem conter apenas valores não-sensíveis (URLs, escopos); credenciais ficam no `cypress.env.json` local ou nas variáveis do CI
