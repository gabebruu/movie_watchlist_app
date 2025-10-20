# Relatório Técnico: Aplicação "Your Movies Watchlist"

Este documento oferece uma análise técnica detalhada da aplicação "Your Movies Watchlist", descrevendo sua arquitetura, componentes e funcionalidades.

## 1. Arquitetura Geral

A aplicação segue uma arquitetura de **SPA (Single Page Application)** com um backend desacoplado.

- **Frontend:** Construído com **Next.js** e **React**, é responsável por toda a interface do usuário. Ele é executado no navegador do cliente.
- **Backend:** Um servidor **Node.js** com **Express** que expõe uma API RESTful. Ele lida com a lógica de negócio e a comunicação com o banco de dados.
- **Banco de Dados:** Um banco de dados **MongoDB** é usado para persistir os dados dos filmes. A comunicação é gerenciada pelo **Mongoose**.

O fluxo é o seguinte:
1. O usuário interage com a interface no navegador.
2. O frontend (React) envia requisições HTTP (ex: buscar, adicionar, deletar filmes) para a API do backend.
3. O backend (Express) processa essas requisições, interage com o banco de dados MongoDB e retorna os dados ou o status da operação.
4. O frontend recebe a resposta e atualiza a interface dinamicamente para o usuário.

---

## 2. Análise do Frontend (Código em `src/`)

O frontend é o coração visual e interativo da aplicação.

### 2.1. Estrutura de Arquivos

- `src/pages/index.js`: O componente principal que serve como a página inicial e orquestra todos os outros componentes.
- `src/components/`: Contém os componentes React reutilizáveis, cada um com uma responsabilidade específica (ex: listar filmes, adicionar filme).
- `src/services/api.js`: Centraliza todas as funções que fazem a comunicação com o backend.
- `src/styles/`: Contém os estilos globais da aplicação.

### 2.2. Componente Principal (`pages/index.js`)

Este arquivo gerencia o estado principal da aplicação:

- **`currentView`**: Um estado que controla qual componente de listagem de filmes está visível (`AllMovies`, `WatchedMovies`, etc.). A interface é atualizada dinamicamente quando o usuário clica nos botões de navegação.
- **`showAddModal` e `editMovie`**: Estados que controlam a exibição dos modais para adicionar e editar filmes.
- **`reloadKey`**: Uma técnica inteligente para forçar a remontagem dos componentes de listagem após uma adição ou edição, garantindo que os dados exibidos estejam sempre atualizados.

### 2.3. Componentes da Interface (`src/components/`)

- **`AllMovies.jsx`**:
  - Busca todos os filmes da API usando `useEffect` e `getAllMovies`.
  - Exibe uma lista de filmes, cada um com botões para **Editar**, **Excluir** e **Compartilhar**.
  - A função `handleDelete` chama a API para remover um filme e recarrega a lista.
  - A função `onEdit` (passada como prop) define o estado `editMovie` no componente pai (`index.js`) para abrir o modal de edição.

- **`AddMovie.jsx` e `EditMovie.jsx`**:
  - São modais com formulários para adicionar ou editar filmes.
  - Gerenciam o estado do formulário (`form`).
  - Possuem validação para garantir que os campos essenciais sejam preenchidos.
  - Ao submeter o formulário, chamam as funções `addMovie` ou `updateMovie` da API.
  - Utilizam as props `onAdded`, `onUpdated` e `onClose` para comunicar ao componente pai que a operação foi concluída e o modal deve ser fechado.

- **`WatchedMovies.jsx`, `NotWatchedMovies.jsx`, `MoviesByRating.jsx`**:
  - São componentes especializados em exibir listas filtradas ou ordenadas de filmes.
  - Cada um chama uma função específica da API (`getWatchedMovies`, etc.) para buscar apenas os dados relevantes.
  - A estrutura de exibição é muito semelhante à do `AllMovies`, mas focada apenas na visualização.

### 2.4. Serviço de API (`src/services/api.js`)

Este arquivo é um excelente exemplo de como isolar a lógica de acesso a dados:

- **Abstração:** Ele exporta funções com nomes claros (ex: `getAllMovies`, `deleteMovie`). Os componentes não precisam saber os detalhes da URL ou do método HTTP, apenas chamam a função.
- **Tratamento de Erros:** Cada função verifica se a resposta da API foi bem-sucedida (`res.ok`) e lança um erro caso contrário. Isso permite que os componentes capturem esses erros em um bloco `try...catch`.
- **Configuração Centralizada:** A `API_URL` é definida em um único lugar, facilitando a manutenção caso a rota da API mude no futuro.

---

## 3. Análise do Backend (`server.js`)

O `server.js` configura e executa o servidor Express que atende às requisições do frontend.

### 3.1. Configuração

- **Next.js e Express:** O servidor integra o Next.js, permitindo que o Express sirva tanto as rotas da API quanto as páginas renderizadas pelo Next.js.
- **Conexão com o DB:** A função `connectDB()` (de `lib/mongodb.js`) é chamada na inicialização para estabelecer a conexão com o MongoDB.

### 3.2. Rotas da API (Endpoints)

- **`GET /api/movies`**:
  - Rota principal para buscar filmes.
  - **Funcionalidade de Filtro:** Verifica o query param `watched`. Se for `"true"` ou `"false"`, cria um filtro para o MongoDB.
  - **Funcionalidade de Ordenação:** Verifica os query params `sortBy` e `order` para construir um objeto de ordenação para o MongoDB.
  - Retorna uma lista de filmes em formato JSON.

- **`POST /api/movies`**:
  - Recebe os dados de um novo filme no corpo da requisição (`req.body`).
  - Cria uma nova instância do modelo `Movie` e a salva no banco de dados.
  - Retorna o filme recém-criado com um status `201 (Created)`.

- **`PUT /api/movies/:id`**:
  - Atualiza um filme existente.
  - Usa o `id` da URL (`req.params.id`) para encontrar o filme com `Movie.findByIdAndUpdate`.
  - Os novos dados são passados no corpo da requisição (`req.body`).
  - A opção `{ new: true }` garante que o documento atualizado seja retornado.

- **`DELETE /api/movies/:id`**:
  - Remove um filme do banco de dados usando `Movie.findByIdAndDelete` com o `id` da URL.
  - Retorna uma mensagem de sucesso.

---

## 4. Análise do Banco de Dados

### 4.1. Modelo de Dados (`models/Movie.js`)

- Define a **estrutura (Schema)** de um documento de filme no MongoDB usando o Mongoose.
- Campos definidos: `title`, `year`, `genre`, `watched`, `rating`, e `createdAt`.
- Cada campo tem um tipo de dado especificado (ex: `String`, `Number`, `Boolean`, `Date`).
- O `createdAt` tem um valor padrão de `Date.now`, que registra automaticamente quando o filme foi adicionado.

### 4.2. Conexão (`lib/mongodb.js`)

- Responsável por conectar a aplicação ao MongoDB.
- Lê a string de conexão da variável de ambiente, o que é uma boa prática de segurança.
- Gerencia o estado da conexão para evitar múltiplas conexões desnecessárias.

---

## 5. Estilização (Tailwind CSS)

- **`tailwind.config.mjs`**: Arquivo de configuração onde se pode estender o tema padrão do Tailwind, como cores, fontes e sombras. A aplicação define cores personalizadas como `neon-red` e `slasher-font` para criar uma identidade visual única.
- **Classes Utilitárias:** Os componentes usam classes do Tailwind diretamente no `className` para aplicar estilos de forma rápida e consistente (ex: `bg-gray-900`, `text-cyan-400`, `font-bold`).
- **Estilos Condicionais:** O `buttonStyle` em `index.js` é um ótimo exemplo de como aplicar estilos diferentes com base no estado da aplicação (`currentView`), criando um efeito visual claro para o botão ativo.
