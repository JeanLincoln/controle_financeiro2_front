# Spec: Criar Origens no Formulário de Transação

**Data:** 2026-08-03  
**Repositório:** controle_financeiro2_front  
**Status:** Aprovado

---

## Objetivo

Permitir que o usuário crie uma nova origem diretamente dentro do formulário de transação, sem sair da tela. Após a criação, a origem deve ser automaticamente selecionada no campo `originId` da transação.

---

## Contexto

O formulário de transação (`Transaction.form.tsx`) já exibe um acordeão "Origens" com o componente `EntityAccordion`, que lista origens existentes para seleção. Atualmente não há como criar uma nova origem a partir desse formulário.

O padrão de referência é o `SubCategorySection` no formulário de categorias, que oferece um botão "Criar" que expande um mini-formulário inline dentro da seção.

---

## Abordagem Escolhida

**Prop opcional `createSection?: ReactNode` no `EntityAccordion`**, renderizada no topo do conteúdo do acordeão antes da lista de cards. Para o campo `originId`, o `Transaction.form.tsx` passa um `OriginCreationSection` que gerencia o formulário inline de criação.

---

## Arquivos Novos

```
src/components/Form/Transaction/
└── components/
    └── OriginCreationSection/
        ├── OriginCreationSection.component.tsx
        └── hooks/
            └── useOriginCreationSection.hook.ts
```

---

## Arquivos Modificados

- `src/components/Form/Transaction/components/EntityAccordion/EntityAccordion.component.tsx`
- `src/components/Form/Transaction/Transaction.form.tsx`
- `src/store/services/origin/origin.service.ts` — alterar tipo de retorno de `createOrigin` de `void` para `OriginFindByIdResponse`
- `src/store/requests/origin/useOriginCreate.request.ts` — atualizar `successCallback` para receber a origem criada

---

## Especificação dos Componentes

### `EntityAccordion` — alteração

Adicionar prop opcional:

```tsx
interface EntityAccordionProps {
  title: string;
  entityOptions: Omit<DetailsCardProps, "isSelected" | "onClick">[];
  formFieldName: "originId" | "categoriesIds" | "subCategoriesIds";
  fetchAreaRef: ((node: HTMLDivElement | null) => void) | null;
  disabled?: boolean;
  createSection?: ReactNode;
}
```

Renderizar `createSection` no início do `AccordionContent`, antes do `div` com os cards. Se `createSection` for `undefined`, o comportamento atual é preservado.

---

### `useOriginCreate` — alteração

Atualizar `successCallback` para receber a origem criada:

```tsx
type UseOriginCreateProps = {
  successCallback: (origin: Origin) => void;
  errorCallback?: () => void;
};
```

Em `handleCreateOrigin`, capturar o retorno da mutation e passá-lo ao callback:

```tsx
const [error, createdOrigin] = await handleRequest(createOrigin(originData).unwrap());
if (error) { ... }
successCallback(createdOrigin);
```

### `origin.service.ts` — alteração

Alterar o tipo de retorno de `createOrigin` de `void` para `OriginFindByIdResponse`:

```tsx
createOrigin: builder.mutation<OriginFindByIdResponse, CreateOriginParams>
```

Isso é padrão REST: POST /origin retorna o recurso criado.

---

**Arquivo:** `hooks/useOriginCreationSection.hook.ts`

```tsx
interface UseOriginCreationSectionProps {
  onSuccess: (originId: number) => void;
}
```

**Responsabilidades:**
- Gerenciar `isFormVisible` (boolean, inicia `false`)
- Instanciar `useForm` com `zodResolver(OriginFormSchema)` e `originFormDefaultValues()`
- Usar `useOriginCreate` com `successCallback: (origin: Origin)` que:
  1. Chama `onSuccess(origin.id)` com o ID da origem recém-criada
  2. Define `isFormVisible = false`
  3. Reseta o formulário para os valores padrão
- `handleToggleForm`: alterna `isFormVisible`; ao fechar (false), reseta o formulário
- Expor: `{ form, colorWatch, isFormVisible, isLoading, onSubmit, handleToggleForm }`

---

### `OriginCreationSection` component

**Arquivo:** `OriginCreationSection.component.tsx`

```tsx
interface OriginCreationSectionProps {
  onSuccess: (originId: number) => void;
}
```

**Layout:**
1. Botão "+ Criar Origem" (toggle): quando `isFormVisible = false`, exibe "+ Criar Origem"; quando `true`, exibe "Cancelar" com ícone `X`
2. Quando `isFormVisible = true`, exibe os campos abaixo em um `div` com `space-y-4`:
   - **Nome** — `Input` tipo texto, placeholder "Nome da Origem", validado por `OriginFormSchema`
   - **Descrição** — `Textarea` com `className="h-20 resize-none"`, validado por `OriginFormSchema`
   - **Cor e Ícone** — em `div` com `flex gap-4`: `ColorPicker` (campo `color`) e `IconSelector` (campo `icon`, `color={colorWatch}`)
   - **Botão Salvar** — `Button` tipo `submit`, variante `outline`, com ícone `Save` ou `LoadingSpinner` quando `isLoading`

O componente deve renderizar seu próprio `<form>` com `onSubmit={form.handleSubmit(onSubmit)}` envolto em `<Form {...form}>`.

---

### `Transaction.form.tsx` — alteração

No `EntityAccordion` de Origens, passar:

```tsx
createSection={
  <OriginCreationSection
    onSuccess={(id) => form.setValue("originId", id)}
  />
}
```

---

## Fluxo do Usuário

1. Usuário abre o acordeão "Origens" no formulário de transação
2. Vê o botão "+ Criar Origem" no topo
3. Clica no botão → mini-formulário expande
4. Preenche nome, descrição, cor e ícone
5. Clica em "Salvar"
6. RTK Query invalida a cache de origens → lista atualizada automaticamente
7. O campo `originId` é definido com o ID da nova origem
8. O mini-formulário fecha e é resetado
9. A nova origem aparece na lista já com o indicador de selecionada

---

## Constraints Globais

- Todos os arquivos devem ser `.tsx` ou `.ts`
- Sem default exports; usar named exports
- Sem barrel files
- Sem tipo `any` ou `never`
- Sem comentários no código
- Props interfaces em PascalCase + "Props"
- Sem magic numbers; usar constantes nomeadas
- Usar `cn()` para combinar classes CSS
- Mensagens de validação e toast em português
- Usar `toast.error` / `toast.success` nos callbacks de API
- Seguir o padrão de nomenclatura de arquivos do projeto (`.component.tsx`, `.hook.ts`)

---

## Fora do Escopo

- Edição de origens dentro do formulário de transação
- Criação inline de categorias ou sub-categorias no formulário de transação
- Alterações no schema `TransactionFormSchema`
