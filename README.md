## Icons

@radix-ui/react-icons

## http

fluxo da request
axios.interceptors -> hook/function

## TODO: Permissões

3 tipos de páginas

1. para guest and auth
2. para auth e redirecionar se for guest
3. para guest e redirecionar se for auth

## useAuth

middleware determina se a page é para guest ou auth e fornece funções para gerenciar logins

## Formulários

react form hook + zod

## Tables

Exemplo:

- Table para category:

  - 1 . Um component de container (pattern: Container - Presentation)
    - Responsabilidade:
      - Iniciar variáveis com dados da url (sorting e page)
      - Ir na API para pegar os dados para montar a tabela
        - Usar as variáveis da url query string
  - 2 . Um component para montar a tabela com os dados que recebe do component 1

    - Montar as colunas
    - criar uma table :: useTableTanStack({columns, apiResponse})
    - Retornar:

    ```jsx
    <div>
      <TanStackTable table={table} />
      <Pagination table={table} />
    </div>
    ```

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
