# Requisitos — EPIGuard

## Problema

Empresas de infraestrutura e operação rodoviária (linha CCR Motiva/SPI) entregam Equipamentos de Proteção Individual a centenas de colaboradores de campo. O controle hoje é feito em planilha ou papel: ninguém sabe com certeza quem está com EPI vencido, quanto estoque resta, ou se a entrega está documentada para uma auditoria de NR. Isso gera risco de acidente, não conformidade e retrabalho administrativo.

**EPIGuard** é um sistema web que centraliza o cadastro de colaboradores e EPIs, registra entregas e devoluções, e avisa automaticamente quando um equipamento está perto de vencer.

## Personas

### Marcos Aurélio — Técnico de Segurança do Trabalho
42 anos, responde por ~180 colaboradores de campo em uma concessão de rodovia. Hoje perde parte do dia conferindo validade de EPI em planilha e cobrando devolução manualmente. Precisa de um painel simples que mostre, de cara, o que está vencido ou prestes a vencer.

### Ana Beatriz — Colaboradora de campo
29 anos, operação em campo. Retira e devolve EPI toda semana. Usa celular ou tablet compartilhado na base — precisa registrar a retirada em poucos toques, sem treinamento longo.

## Requisitos Funcionais (RF)

| ID | Requisito |
|---|---|
| RF01 | Cadastrar, editar e listar colaboradores |
| RF02 | Cadastrar tipos de EPI (categoria, CA — Certificado de Aprovação, vida útil padrão) |
| RF03 | Registrar entrega de um EPI a um colaborador, com data e validade calculada |
| RF04 | Registrar devolução ou descarte de um EPI |
| RF05 | Gerar alertas automáticos de EPIs vencidos ou a vencer em 15/30 dias |
| RF06 | Consultar histórico de entregas por colaborador ou por tipo de EPI |
| RF07 | Exibir um dashboard com indicadores (vencidos, entregues no mês, pendências) |
| RF08 | Autenticar usuários com dois perfis: administrador e técnico de segurança |

## Requisitos Não Funcionais (RNF)

| ID | Requisito |
|---|---|
| RNF01 | Interface responsiva, usável em desktop e tablet de campo |
| RNF02 | Telas principais respondem em até 2s sob uso normal |
| RNF03 | Senhas armazenadas com hash; nenhum dado sensível em texto puro |
| RNF04 | Sistema acessível via deploy gratuito (ex.: Vercel, Render) durante toda a avaliação |
| RNF05 | Fluxo de registro de entrega completo em no máximo 3 cliques |

## Escopo

### Entra nesta versão (CP4–CP6)
- Cadastro de colaboradores e tipos de EPI
- Registro de entrega e devolução
- Alertas de vencimento
- Dashboard com indicadores básicos
- Login com dois perfis de acesso

### Fica de fora
- Leitor físico de código de barras / RFID
- App mobile nativo offline
- Integração com folha de pagamento (desconto por perda)
- Suporte multi-empresa (multi-tenant)
- Notificação por e-mail/SMS automática
