# 💾 Gestão de Participantes - Estética Y2K

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![CSS3](https://img.shields.io/badge/CSS3-Mobile_First-blue)
![HTML5](https://img.shields.io/badge/HTML5-Semântico-orange)

Este projeto foi desenvolvido como **Desafio Prático** para a disciplina de **Programação Web II**. O objetivo é criar uma aplicação web de cadastro de participantes aplicando JavaScript moderno e rigorosas boas práticas de desenvolvimento front-end, tudo isso encapsulado em uma interface nostálgica inspirada nos anos 2000 (Y2K).

---

## 🎓 Informações Acadêmicas

* **Instituição:** IFCE - Instituto Federal de Educação, Ciência e Tecnologia do Ceará
* **Disciplina:** Programação Web II
* **Professora:** Jéssica de Paulo Rodrigues
* **Equipe Desenvolvedora:**
  * Mario Jamisson
  * Amanda Morais
  * Maria Carolina
  * Gabrielly Morais

---

## ✨ Características e Funcionalidades (CRUD Completo)

A aplicação vai além de um simples formulário, atuando como um sistema de gerenciamento persistente no navegador do usuário:

* **[C]reate (Criar):** Cadastro de novos participantes com validação de dados obrigatórios.
* **[R]ead (Ler):** Listagem dinâmica dos cadastros, exibindo status de presença e tipo de ingresso (Padrão, VIP, Convidado) com diferenciação visual.
* **[U]pdate (Atualizar):** Edição fluida de registros já existentes, reaproveitando o formulário principal.
* **[D]elete (Remover):** Exclusão de participantes com confirmação de segurança.
* **Persistência de Dados:** Utilização da API de `localStorage` para garantir que os dados não sejam perdidos ao recarregar a página.
* **Campos Dinâmicos:** Exibição condicional de campos extras (ex: opções de interesse) apenas quando o usuário marca que deseja receber novidades.

---

## 🛠️ Requisitos Técnicos Atendidos

O projeto atende a 100% dos requisitos solicitados no desafio prático, com implementações avançadas de acessibilidade e design:

1. **Progressive Enhancement (Aprimoramento Progressivo):**
   * A estrutura principal do `<form>` utiliza action e method POST nativos do HTML.
   * Se o JavaScript estiver desabilitado, o formulário submete os dados nativamente. Com o JS ativado, as requisições são interceptadas para criar a experiência fluida na mesma página.

2. **Mobile First & Responsividade:**
   * O layout foi construído inicialmente para telas pequenas (smartphones), empilhando os componentes.
   * Uso de *Media Queries* e *CSS Grid* (`grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))`) para adaptar a interface de forma fluida para tablets e desktops.

3. **Acessibilidade (a11y):**
   * **Semântica:** Uso correto de tags HTML5 (`<header>`, `<main>`, `<section>`, `<form>`, `<fieldset>`, `<legend>`).
   * **Leitores de Tela:** Uso de `aria-live="polite"` nos contêineres dinâmicos e referências explícitas usando `for` nas `<label>`.
   * **Sistema de Temas Inclusivo:** Além do visual padrão e do "Modo Escuro (Hacker)", foi desenvolvido um **Modo Acessível para Daltonismo**, que substitui combinações problemáticas de vermelho/verde por paletas de alto contraste focadas em azul e laranja/amarelo.

4. **Separação de Camadas:**
   * **HTML:** Focado estritamente na estrutura e conteúdo.
   * **CSS:** Responsável pelo layout, transições de tema, tipografia e efeitos visuais estilo "Windows 98" utilizando variáveis CSS customizadas (`:root`).
   * **JavaScript:** Controla todo o comportamento, validação e manipulação do DOM sem o uso de bibliotecas externas (Vanilla JS).

---

## 🚀 Como Executar o Projeto

Como o projeto é totalmente baseado no lado do cliente (Client-side) e não possui dependências externas ou de frameworks, executá-lo é extremamente simples:

1. Clone ou baixe os arquivos deste repositório para o seu computador.
2. Certifique-se de que os três arquivos (`index.html`, `style.css` e `script.js`) estão no mesmo diretório.
3. Dê um duplo clique no arquivo `index.html` para abri-lo em qualquer navegador moderno (Google Chrome, Firefox, Edge, Safari).

---

> *"Best viewed in Netscape Navigator 4.0 at 800x600 resolution."* 👾