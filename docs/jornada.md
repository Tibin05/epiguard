# Jornada do projeto — decisões e mudanças de escopo

Registro vivo: atualizar a cada checkpoint, nunca reescrever do zero.

## CP4 — Idealização

- **2026-08-20**: Tema definido — Gestão de EPI industrial, inspirado no Challenge CCR Motiva/SPI. Tecnologia escolhida: Web.
- **2026-08-20**: Nome do produto proposto — EPIGuard. Personas definidas (Marcos Aurélio, técnico de segurança; Ana Beatriz, colaboradora de campo).
- **2026-08-20**: Rascunho completo de documentação, RF/RNF, escopo, diagrama de caso de uso, identidade visual, pitch e estrutura de Trello/GitHub produzido como base de trabalho do grupo.
- **2026-08-27**: Grupo formalizado (6 integrantes) e papéis distribuídos — ver tabela "Time" no README.
- **2026-08-27**: Figma da identidade visual criado (logo, paleta, tipografia) — https://www.figma.com/design/DvzT8Wfshv8kSFqs4CBKgR
- **2026-08-30**: Quadro Trello criado e tarefas distribuídas — https://trello.com/b/y73SiZXd/epiguard-cp4-cp5-cp6
- **2026-08-31**: Vídeo de apresentação gravado e publicado — https://youtu.be/uG78S6TPvsw. CP4 completo.
- **2026-09-01**: CP4 nota 10 — feedback do professor: diagrama de caso de uso poderia ser melhor trabalhado. Refeito em notação UML formal (atores, fronteira do sistema, elipses, `«include»`/`«extend»`) — ver docs/diagramas/caso-de-uso.svg.

## CP5 — Protótipo funcional

- **2026-10-06**: Definido o formato do MVP — aplicação web estática (HTML, CSS e JavaScript) com dados mockados e persistência local via `localStorage`. Sem framework nesta etapa, para o professor rodar sem instalar dependências.
- **2026-10-06**: Mantidos os requisitos RF01–RF08, com autenticação simulada (RF08): os dois perfis entram, mas ainda têm as mesmas permissões.
- **2026-10-06**: **Mudança de escopo** — o colaborador deixa de ser usuário do sistema e passa a ser apenas uma entidade cadastrada. Entregas, devoluções e consultas são feitas pelo Técnico de Segurança ou pelo Administrador. Motivo: simplificar o primeiro fluxo funcional sem perder a rastreabilidade do EPI.
- **2026-10-06**: Implementadas as telas de login, dashboard, colaboradores, tipos de EPI, entregas/devoluções, histórico e alertas, com cálculo automático da validade pela vida útil do tipo de EPI.
- **2026-10-06**: Diagrama de caso de uso revisado para refletir a mudança de escopo (ator Colaborador removido; Administrador como generalização do Técnico).
- **2026-10-06**: Criados os diagramas de atividade (entrega e devolução/descarte), de sequência (entrega e alertas) e de classes, todos condizentes com o que o protótipo faz.
- **2026-10-06**: Troca de papéis a partir do CP5 — Eric assume GitHub / Infraestrutura e Felipe assume Documentação. No CP4 era o inverso.
- **2026-10-06**: Alertas passam a distinguir as faixas de 15 e 30 dias previstas no RF05; histórico passa a exibir a data da baixa.

## Decisões que ficam para o CP6

- Escolha definitiva de backend/API;
- Banco de dados e modelagem física;
- Autenticação real com hash de senha (RNF03);
- Autorização efetiva por perfil (o que só o Administrador pode fazer);
- Estratégia de deploy da aplicação completa (RNF04);
- Testes de instalação/uso por pessoa externa ao grupo.
