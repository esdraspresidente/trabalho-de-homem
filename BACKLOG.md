# Backlog — Trabalho de Homem

Itens combinados e ainda não implementados.

## Agenda do Google

Cada dia de serviço deve criar, mover e apagar o evento na agenda do Google
do Esdras.

**O que falta:**

1. **E-mail da conta de serviço.** Precisamos do endereço
   `...@...iam.gserviceaccount.com` que a function `criar-evento-calendar` usa
   (variável `GOOGLE_CLIENT_EMAIL`). O projeto "MindTracker" no Google Cloud
   não tem nenhuma conta de serviço; ela deve estar em outro projeto, ou na
   conta Google da Naiarha.
2. **Compartilhar a agenda.** A agenda do Esdras precisa ser compartilhada com
   esse e-mail, na permissão "Fazer alterações nos eventos".
3. **Criar a function `tdh-calendario`** no previmater-ops. Ela recebe o id
   do dia (`tdh_agendas`), cria ou atualiza o evento e grava o
   `google_event_id`; ao remover o dia, apaga o evento.
   - A function antiga do Diligências não serve. Ela só cria evento, não
     guarda o id, e por isso um evento remarcado lá fica duplicado.
4. **Ligar no app.** Preencher `GCAL_FUNCTION` no `index.html` e completar
   `gcalSync()`.

## Fullfin — FEITO (Fullfin v3.88, 26/10/2026)

Aba "Trabalho de Homem" na tela Importar do Fullfin, manual como as outras
(é você quem escolhe a carteira onde o dinheiro caiu):

- recebimento com `recebido_em` preenchido entra como **receita**
  (origem `tdh_receb`);
- repasse com `repasse_status = 'pago'` entra como **despesa** na data
  `repassado_em` (origem `tdh_repasse`);
- centro de custo **"Trabalho de Homem"** criado e pré-selecionado na aba.

Não precisou de coluna nova: a trava contra duplicidade é origem + id em
`fin_movimentacoes.diligencia_id`, e as origens próprias não colidem com as
diligências. A aba só mostra dados para a conta do Esdras (RLS `is_tdh`).

No banco, o índice único `fin_mov_origem_ref_uniq` (origem, diligencia_id)
recusa qualquer import duplicado. Antes de criá-lo, em 26/10 foram removidos
14 lançamentos de diligência duplicados (R$ 1.143), com cópia em
`backup.fin_mov_duplicadas_20261026`.

## Ideias que surgiram

- Catálogo de serviços frequentes (troca de chuveiro, instalação de TV)
  com preço padrão, para montar orçamento pequeno em segundos.
- Relatório por prestador: quantos serviços fez e quanto recebeu, por
  período.
