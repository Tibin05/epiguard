# Requisitos — EPIGuard

## Problema

Empresas de infraestrutura e operação rodoviária entregam Equipamentos de Proteção Individual a centenas de colaboradores de campo. Quando o controle é feito em planilha ou papel, torna-se difícil identificar rapidamente quem está com EPI vencido, acompanhar estoque e manter o histórico necessário para auditorias de segurança.

O EPIGuard é um sistema web que centraliza o cadastro de colaboradores e tipos de EPI, registra entregas e devoluções e destaca automaticamente equipamentos vencidos ou próximos do vencimento.

## Personas

### Marcos Aurélio — Técnico de Segurança do Trabalho

42 anos, responsável por aproximadamente 180 colaboradores de campo. Precisa registrar entregas e devoluções com rapidez e visualizar situações críticas sem conferir planilhas manualmente.

### Ana Beatriz — Colaboradora de campo

29 anos, trabalha em operação de campo e recebe EPIs periodicamente. No fluxo validado para o CP5, Ana é representada como colaboradora cadastrada e vinculada às movimentações realizadas pelo Técnico de Segurança.

## Ajuste de modelagem realizado no CP5

No CP4, a persona “colaborador” representava também uma possibilidade de interação direta com o sistema. Durante a construção do protótipo, o grupo optou por simplificar o primeiro fluxo funcional: a entrega, devolução e consulta são registradas pelo Técnico de Segurança ou Administrador, enquanto o colaborador permanece como entidade do domínio.

Essa decisão reduz complexidade operacional sem retirar a rastreabilidade do EPI. Caso o acesso direto do colaborador seja necessário futuramente, ele poderá ser incorporado como evolução de escopo.

## Requisitos Funcionais

| ID | Requisito | Situação no CP5 |
| --- | --- | --- |
| RF01 | Cadastrar, editar e listar colaboradores | Implementado com dados mockados/localStorage |
| RF02 | Cadastrar tipos de EPI (categoria, CA, vida útil padrão) | Implementado com dados mockados/localStorage |
| RF03 | Registrar entrega de um EPI a um colaborador, com data e validade calculada | Implementado |
| RF04 | Registrar devolução ou descarte de um EPI | Implementado |
| RF05 | Gerar alertas automáticos de EPIs vencidos ou a vencer em 15/30 dias | Implementado: vencidos, a vencer em até 15 dias (urgente) e em até 30 dias |
| RF06 | Consultar histórico de entregas por colaborador ou tipo de EPI | Implementado por busca textual e status |
| RF07 | Exibir dashboard com indicadores (vencidos, entregues no mês, pendências) | Implementado |
| RF08 | Autenticar usuários com dois perfis: administrador e técnico de segurança | Simulado no CP5; autenticação real prevista para CP6 |

## Requisitos Não Funcionais

| ID | Requisito | Situação no CP5 |
| --- | --- | --- |
| RNF01 | Interface responsiva, usável em desktop e tablet de campo | Implementado no protótipo |
| RNF02 | Telas principais respondem em até 2s sob uso normal | Atendido localmente por aplicação estática |
| RNF03 | Senhas armazenadas com hash; nenhum dado sensível em texto puro | Não aplicável à autenticação mockada; obrigatório no CP6 |
| RNF04 | Sistema acessível via deploy gratuito durante a avaliação | Estrutura pronta para hospedagem estática; link deve ser inserido após publicação |
| RNF05 | Fluxo de registro de entrega completo em no máximo 3 cliques | Fluxo simplificado e validado no protótipo |

## Escopo do CP5

### Incluído

- Cadastro de colaboradores;
- Cadastro de tipos de EPI;
- Registro de entrega;
- Registro de devolução/descarte;
- Alertas de vencimento;
- Dashboard;
- Histórico de movimentações;
- Login simulado com dois perfis;
- Dados mockados com persistência local no navegador.

### Não incluído nesta etapa

- Banco de dados real;
- API/backend;
- Autenticação real e hash de senhas;
- Leitor físico de código de barras/RFID;
- Aplicativo mobile nativo offline;
- Integração com folha de pagamento;
- Multiempresa;
- Notificações automáticas por e-mail ou SMS.

## Critério de aceite do protótipo

O CP5 é considerado funcional quando um avaliador consegue, sem alterar o código:

1. realizar login com uma conta de demonstração;
2. cadastrar um colaborador;
3. cadastrar um tipo de EPI;
4. registrar uma entrega;
5. visualizar a movimentação no histórico;
6. visualizar indicadores e alertas;
7. registrar uma devolução ou descarte.
