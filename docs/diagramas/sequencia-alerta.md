# Diagrama de Sequência — Alertas de vencimento

Fluxo correspondente ao RF05 no protótipo funcional. Os alertas não são armazenados: são recalculados a partir das entregas ativas sempre que a tela é exibida.

```mermaid
sequenceDiagram
    actor T as Técnico de Segurança
    participant UI as Interface EPIGuard
    participant LS as Dados mockados / LocalStorage

    T->>UI: Acessa tela de Alertas
    UI->>LS: Solicita entregas, colaboradores e tipos de EPI
    LS-->>UI: Retorna dados
    UI->>UI: Filtra entregas com status Ativo
    loop Para cada entrega ativa
        UI->>UI: Calcula dias até a validade
        alt Validade já passou
            UI->>UI: Classifica como Vencido
        else Vence em até 15 dias
            UI->>UI: Classifica como urgente
        else Vence em 16 a 30 dias
            UI->>UI: Classifica como a vencer
        else Vence em mais de 30 dias
            UI->>UI: Não gera alerta
        end
    end
    UI->>UI: Ordena pela validade mais próxima
    alt Há alertas
        UI-->>T: Exibe cartões com EPI, colaborador, matrícula, CA e validade
    else Nenhum alerta
        UI-->>T: Exibe mensagem de que não há EPIs vencidos ou a vencer
    end
```
