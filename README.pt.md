# Nota Certa

[🇺🇸 English version](./README.md)
![Nota Certa Banner](https://github.com/mafortthiago/right-grade/blob/main/public/fundo.png?raw=true)

## Descrição

O Nota Certa é um web app criado para ajudar professores a organizar e centralizar o controle de notas e turmas de forma simples, intuitiva e eficiente. O objetivo é facilitar o acompanhamento do desempenho dos alunos e otimizar o tempo do professor.

## Funcionalidades

- Cadastro e gerenciamento de turmas.
- Lançamento e edição de notas.
- Controle de avaliações e recuperações.
- Suporte a português e inglês.

## Tecnologias Utilizadas

- **React**:

  Biblioteca JavaScript usaada para construir interfaces de usuário que sejão interativas e reutilizáveis.

- **TypeScript**:

  Usado para melhor tipagem dos dados, adicionando segurança e clareza ao código JavaScript.

- **Vite**:

  Ferramente utilizada para realizar o build do projeto.

- **Tailwind CSS**:

  Esta framework CSS utility-first foi usado para criar estilizações rapidamente.

- **Context API**:

  Utilizado para estados globais de tema e exibição de snackbar.

- **Zustand**:

  Biblioteca de gerenciamento de estado que armazena dados buscados da api
  para evitar muitas requisições e realizar consultas na api.

- **i18next**:

  Usado para internacinalização da aplicação, forncendo textos em portugûes e inglês.

- **react-router-dom**:

Biblioteca para gerenciamento de rotas e navegação.

- **react-icons**:

Biblioteca que fornece uma coleção de ícones.

- **framer-motion**:

Biblioteca para animações dos componentes.

- **@tanstack/react-table**:

Biblioteca para criação e manipulação de tabelas na aplicação.

## Instalação

- Certifique-se de que o back-end (api), esteja rodando, repositório da api:
  https://github.com/mafortthiago/right-grade-api

1. Clone o repositório:
   ```bash
   git clone https://github.com/mafortthiago/right-grade.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd nota-certa
   ```
3. Instale as dependências:

   ```bash
   npm install
   ```

4. Adicione um arquivo `.env` na raiz do projeto indicando onde está o back-end:
   ```bash
      Exemplo de conteúdo do arquivo:
      VITE_API_URL=http://localhost:8080
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Como Usar

- Acesse `http://localhost:5173` no seu navegador após iniciar o servidor.
- Crie sua conta ou faça login.
- Cadastre suas turmas e comece a lançar as notas dos alunos.

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature ou correção (`git checkout -b minha-feature`)
3. Commit suas alterações (`git commit -m 'Minha nova feature'`)
4. Faça push para a branch (`git push origin minha-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença CC BY-NC 4.0. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Desenvolvido por Thiago Mafort. Entre em contato pelo [LinkedIn](https://www.linkedin.com/in/thiago-mafort/) ou abra uma issue neste repositório.
