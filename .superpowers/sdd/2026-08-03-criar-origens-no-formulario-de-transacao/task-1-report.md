# Relatório da Task 1

## Resumo
- Atualizei o contrato de criação de origem para que `createOrigin` retorne `OriginFindByIdResponse`.
- Ajustei `useOriginCreate` para repassar a origem criada ao `successCallback`.
- Mantive o padrão de `handleRequest` e `toast.error`.

## Arquivos alterados
- `src/store/services/origin/origin.service.ts`
- `src/store/requests/origin/useOriginCreate.request.ts`

## Testes e comandos executados
- `pnpm exec eslint src/store/services/origin/origin.service.ts src/store/requests/origin/useOriginCreate.request.ts`
- `pnpm build`
- `pnpm exec eslint src/store/services/origin/origin.service.ts src/store/requests/origin/useOriginCreate.request.ts && pnpm build` (falhou no build)
- Commit executado com hooks locais: `git commit -m "CF2-20: retornar origem criada no create"`

## Resultado dos testes
- ESLint nos arquivos alterados: aprovado.
- `pnpm build`: falhou por erro pré-existente de casing em `src/screens/Origin/components/FiltersSection/FiltersSection.component.tsx` e `Origin.schema.ts`/`origin.schema.ts`.
- Hooks do commit (`eslint .` e `tsc --noEmit`): aprovados.

## Commits criados
- `e4c3d43` — `CF2-20: retornar origem criada no create`

## Preocupações
- O build global ainda falha por um conflito de casing já existente fora do escopo desta task.
