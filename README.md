# EPIGuard

Sistema web de gestão de EPI (Equipamento de Proteção Individual) industrial: controle de uso, validade, entrega e devolução de equipamentos de segurança para colaboradores de campo.

Projeto da disciplina **Engenharia de Software — Engenharia de Computação, 3º ano, FIAP**, desenvolvido em três entregas: CP4 (idealização), CP5 (protótipo funcional) e CP6 (produto final).

## Checkpoint 5 — Protótipo funcional

Nesta etapa, o EPIGuard apresenta um MVP navegável com dados mockados. O objetivo é validar os fluxos principais do sistema antes da implementação de backend e banco de dados no CP6.

### Funcionalidades disponíveis

- Login simulado com perfis de **Administrador** e **Técnico de Segurança**;
- Dashboard com indicadores de EPIs ativos, vencidos, próximos do vencimento e entregas do mês;
- Cadastro, edição, listagem e busca de colaboradores;
- Cadastro e listagem de tipos de EPI, incluindo categoria, CA, vida útil e estoque;
- Registro de entrega com cálculo automático da validade;
- Registro de devolução ou descarte;
- Histórico de movimentações com busca e filtro por status;
- Alertas automáticos de EPIs vencidos, a vencer em até 15 dias (urgente) e em até 30 dias;
- Persistência local no navegador via `localStorage`, apenas para fins de demonstração do protótipo.

> **Importante:** o CP5 utiliza dados mockados/localStorage. Banco de dados, API e autenticação real serão implementados no CP6.

## Tecnologias do CP5

- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage
- Google Fonts: Big Shoulders Display, IBM Plex Sans e IBM Plex Mono

A opção por uma aplicação web estática reduz dependências nesta etapa e permite que o protótipo seja executado ou publicado com facilidade. A arquitetura poderá ser evoluída no CP6 para backend/API e persistência real sem alterar os fluxos validados no CP5.

## Como executar

### Opção 1 — execução direta

Abra o arquivo:

```text
src/index.html
```

em um navegador moderno.

### Opção 2 — servidor local recomendado

Com Python 3 instalado, na raiz do projeto execute:

```bash
python -m http.server 5173 -d src
```

Depois acesse:

```text
http://localhost:5173
```

## Acessos de demonstração

### Técnico de Segurança

```text
E-mail: tecnico@epiguard.com
Senha: 123456
```

### Administrador

```text
E-mail: admin@epiguard.com
Senha: 123456
```

Os acessos acima são exclusivamente fictícios e fazem parte da simulação do CP5.

## Fluxo recomendado para avaliação

1. Entrar como Técnico de Segurança;
2. Consultar o dashboard;
3. Abrir **Colaboradores** e cadastrar um novo colaborador;
4. Abrir **EPIs** e cadastrar um novo tipo de EPI;
5. Abrir **Entregas** e registrar a entrega para o colaborador;
6. Conferir a movimentação no **Histórico**;
7. Consultar os **Alertas**;
8. Registrar uma devolução ou descarte e verificar a atualização do histórico.

## Reset dos dados do protótipo

Os dados ficam salvos no `localStorage` do navegador. Para voltar aos dados iniciais, limpe os dados do site no navegador ou execute no console:

```javascript
localStorage.removeItem('epiguard-cp5-data-v1')
```

Depois recarregue a página.

## Documentação

- [Requisitos, escopo e personas](docs/requisitos.md)
- [Jornada do projeto](docs/jornada.md)
- [Diagrama de caso de uso](docs/diagramas/caso-de-uso.md) — revisado no CP5
- [Diagrama de classes](docs/diagramas/classes.md)
- [Diagrama de atividade — registro de entrega](docs/diagramas/atividade-entrega.md)
- [Diagrama de atividade — devolução/descarte](docs/diagramas/atividade-devolucao.md)
- [Diagrama de sequência — registro de entrega](docs/diagramas/sequencia-entrega.md)
- [Diagrama de sequência — alertas de vencimento](docs/diagramas/sequencia-alerta.md)
- [Identidade visual](design/identidade-visual.md)
- [Vídeo de apresentação (CP4)](https://youtu.be/uG78S6TPvsw)
- Vídeo de apresentação e demonstração (CP5): _link a inserir após a gravação_
- [Quadro Trello](https://trello.com/b/y73SiZXd/epiguard-cp4-cp5-cp6)

## Estrutura

```text
epiguard/
├── design/
│   └── identidade-visual.md
├── docs/
│   ├── diagramas/
│   │   ├── atividade-devolucao.md
│   │   ├── atividade-entrega.md
│   │   ├── caso-de-uso.md
│   │   ├── caso-de-uso.svg
│   │   ├── classes.md
│   │   ├── sequencia-alerta.md
│   │   └── sequencia-entrega.md
│   ├── jornada.md
│   └── requisitos.md
├── src/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── package.json
└── README.md
```

## Time

| Integrante | Papel |
| --- | --- |
| Eric Siciliano | Product Owner / GitHub / Infraestrutura |
| Lucas Costa Sanson | Modelagem UML |
| Vinicius de Abreu Fernandes | Design / Identidade visual |
| Giuliano Ferreira Venceslau | Scrum Master / Trello / Desenvolvimento do protótipo |
| Felipe Chiozzotto Gozzani | Documentação |
| Enrico Nikolay Meirelles Zeronian | Pitch / Apresentação |

## Status do projeto

- [x] CP4 — Idealização
- [x] CP5 — Protótipo funcional com dados mockados
- [ ] CP6 — Produto final com persistência real e versão implantável
