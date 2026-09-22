# fluxo.

**Produtos no lugar. Tarefas em dia.**

Aplicação web para organizar um catálogo de produtos e acompanhar tarefas em um único espaço. Desenvolvida em React para o projeto `lab-prog-av1`, com interface em português, layout responsivo e integração com uma API REST externa.

## O que você encontra

- **Cadastro e acesso:** criação de conta com nome, e-mail e informações de contato.
- **Produtos:** cadastro, edição e exclusão, com preço, estoque, categoria, marca, características físicas e status ativo/inativo.
- **Resumo do estoque:** total de produtos, unidades disponíveis e valor calculado por preço × quantidade.
- **Tarefas:** criação, exclusão e alternância entre pendente e concluída.
- **Progresso:** contagem de tarefas e percentual de conclusão.
- **Interface:** navegação lateral, formulários em modal, confirmação de exclusão, estados de carregamento, mensagens de erro e sucesso e suporte à preferência por movimento reduzido.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| React 19 | Componentes e estado da interface |
| React Router 7 | Navegação entre páginas |
| Vite 8 | Servidor de desenvolvimento e build |
| Tailwind CSS 4 e CSS próprio | Estilos e responsividade |
| React Icons | Ícones da interface |
| Fetch API | Comunicação com o backend |
| ESLint 10 | Análise estática do código |

## Como rodar

Você precisa de **Node.js 22.13+ na linha 22 ou Node.js 24+**, npm e acesso à API configurada no projeto. O backend é externo e não está incluído neste repositório.

Na pasta do projeto, instale as dependências e inicie o servidor:

```bash
npm ci
npm run dev
```

Abra o endereço exibido no terminal, normalmente **http://localhost:5173**. Se a porta estiver ocupada, o Vite pode selecionar outra.

Para usar a aplicação:

1. Clique em **Comece agora** na tela inicial e crie uma conta.
2. Entre com o mesmo **e-mail e nome** informados no cadastro.
3. Cadastre produtos ou acesse **Tarefas** para organizar suas atividades.

As telas podem abrir sem o backend, mas cadastro, login, consultas e alterações dependem da API. Não há modo offline nem dados de demonstração.

## Comandos

| Comando | Descrição |
| --- | --- |
| `npm ci` | Instala as dependências conforme o `package-lock.json` |
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run lint` | Verifica o código com ESLint |
| `npm run build` | Gera os arquivos de produção em `dist/` |
| `npm run preview` | Serve o build localmente para conferência |

Execute `npm run build` antes de `npm run preview`. O projeto ainda não possui uma suíte de testes automatizados configurada.

## Integração com a API

Os serviços em [`src/services/`](src/services/) usam o prefixo `/api`. Durante o desenvolvimento, o proxy do Vite encaminha essas requisições para o backend definido em [`vite.config.js`](vite.config.js):

```js
server: {
  proxy: {
    "/api": {
      target: "http://177.190.80.28:3005",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
},
```

Por exemplo, uma chamada a `/api/produtos` é encaminhada para `http://177.190.80.28:3005/produtos`.

Para usar outro backend, altere `target` e reinicie o servidor de desenvolvimento. A URL está configurada diretamente nesse arquivo; não há variável de ambiente para ela na implementação atual.

### Endpoints usados pelas telas

Os caminhos abaixo são relativos ao backend, depois da remoção do prefixo `/api`.

| Método | Endpoint | Operação |
| --- | --- | --- |
| `GET` | `/clientes` | Consulta de clientes utilizada no login |
| `POST` | `/clientes` | Cadastro de conta |
| `GET` | `/produtos` | Listagem de produtos |
| `POST` | `/produtos` | Cadastro de produto |
| `PUT` | `/produtos/:id` | Atualização de produto |
| `DELETE` | `/produtos/:id` | Exclusão de produto |
| `GET` | `/tarefas` | Listagem de tarefas |
| `POST` | `/tarefas` | Criação de tarefa |
| `PATCH` | `/tarefas/:id` | Alteração de status |
| `DELETE` | `/tarefas/:id` | Exclusão de tarefa |

As requisições com corpo enviam JSON. O status de tarefa usa os valores `pendente` e `concluida`. As listagens esperam arrays JSON; as exclusões aceitam resposta `204` sem corpo ou uma resposta de sucesso em JSON.

### Como o acesso funciona hoje

O login busca a lista de clientes e compara nome e e-mail no navegador. O cliente selecionado fica salvo na chave `cliente` do `localStorage`; o botão de saída remove esse registro.

Esse fluxo é uma identificação simplificada para o projeto: não utiliza senha, token ou proteção das rotas `/produtos` e `/tarefas`. Os serviços de produtos e tarefas também não enviam um identificador do cliente. Autenticação, autorização e isolamento de dados por usuário precisam ser implementados no backend antes de um uso que exija essas garantias.

## Páginas e organização

| Rota | Página |
| --- | --- |
| `/` | Login |
| `/register` | Cadastro de conta |
| `/produtos` | Catálogo e estoque |
| `/tarefas` | Lista de tarefas e progresso |

```text
public/
  favicon.svg          # Ícone da aplicação
src/
  components/
    AuthLayout.jsx     # Estrutura das telas de acesso
    Brand.jsx          # Marca Fluxo
    Layout.jsx         # Estrutura da área de trabalho
    TopBar.jsx         # Navegação e saída da conta
    UI.jsx             # Modais, avisos, indicadores e estados vazios
  pages/
    Login.jsx
    Register.jsx
    Produtos.jsx
    Tarefas.jsx
  services/
    clienteService.js  # Requisições de clientes e login
    produtoService.js  # Requisições de produtos
    tarefaService.js   # Requisições de tarefas
  App.jsx              # Definição das rotas
  index.css            # Identidade visual e regras responsivas
  main.jsx             # Ponto de entrada do React
vite.config.js         # Plugins e proxy da API
```

## Build e publicação

```bash
npm run lint
npm run build
```

O build gera uma aplicação estática na pasta `dist/`. No ambiente de hospedagem:

- Configure o retorno de `index.html` para as rotas da aplicação, permitindo abrir diretamente `/produtos`, `/tarefas` e `/register`.
- Configure o encaminhamento de `/api/*` para o backend, removendo o prefixo como no proxy local. O build estático não inclui o servidor proxy do Vite.

`npm run preview` serve para conferir o build localmente; não substitui a configuração da hospedagem.

## Problemas comuns

| Situação | O que verificar |
| --- | --- |
| A página abre, mas não carrega os dados | Disponibilidade da API e endereço `target` em `vite.config.js` |
| Login informa nome ou e-mail incorretos | Use os mesmos valores do cadastro; a comparação diferencia maiúsculas e minúsculas |
| Alterei o backend, mas a aplicação continua acessando o anterior | Reinicie `npm run dev` depois da alteração |
| Erro de versão do Node ao instalar ou executar | Confira `node --version` e os requisitos acima |
| Uma rota retorna 404 ao atualizar a página em produção | Configure o fallback das rotas da aplicação para `index.html` |
| As chamadas de API falham após publicar | Configure o proxy `/api` na hospedagem; ele não acompanha os arquivos de `dist/` |
