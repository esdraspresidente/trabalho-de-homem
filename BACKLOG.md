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

## Fullfin

O dinheiro do Trabalho de Homem deve aparecer no Fullfin:

- recebimento com `recebido_em` preenchido entra como **receita**;
- repasse pago entra como **despesa**;
- os dois no centro de custo novo **"Trabalho de Homem"**.

Isso mexe no `fullfin/index.html`, que está em produção, e precisa de
confirmação antes. O import de diligências que já existe lá usa
`fin_movimentacoes.diligencia_id` para não importar duas vezes. O
Trabalho de Homem precisa de um campo equivalente, para não colidir com os
ids das diligências.

## Ideias que surgiram

- Catálogo de serviços frequentes (troca de chuveiro, instalação de TV)
  com preço padrão, para montar orçamento pequeno em segundos.
- Relatório por prestador: quantos serviços fez e quanto recebeu, por
  período.
