# Criar Origens no Formulário de Transação Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Permitir que o usuário crie uma nova origem dentro do formulário de transação e a veja selecionada automaticamente.

**Architecture:** Vamos estender o contrato de criação de origem para devolver a origem criada, criar um mini-formulário inline específico para o acordeão de Origens e ligar esse fluxo ao `originId` do formulário de transação. O `EntityAccordion` continua genérico; ele só recebe uma seção opcional para conteúdo extra no topo.

**Tech Stack:** React 19, TypeScript, React Hook Form, Zod, RTK Query, Sonner, Vite

## Global Constraints

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
- Não alterar `TransactionFormSchema`

---

### Task 1: Atualizar o contrato de criação de origem

**Files:**
- Modify: `src/store/services/origin/origin.service.ts`
- Modify: `src/store/requests/origin/useOriginCreate.request.ts`

**Interfaces:**
- Consumes: `CreateOriginParams`, `OriginFindByIdResponse`, `CreateOrUpdateOrigin`, `handleRequest`
- Produces: `useOriginCreate({ successCallback })` chama o callback com a origem criada; `createOrigin` passa a retornar `OriginFindByIdResponse`

- [ ] **Step 1: Alterar o endpoint para retornar a origem criada**

```ts
createOrigin: builder.mutation<OriginFindByIdResponse, CreateOriginParams>({
  query: (origin) => ({
    method: "POST",
    url: "/origin",
    body: origin
  }),
  invalidatesTags: ["Origin"]
})
```

- [ ] **Step 2: Atualizar o hook para repassar o recurso criado**

```ts
type UseOriginCreateProps = {
  successCallback: (origin: Origin) => void;
  errorCallback?: () => void;
};

async function handleCreateOrigin(originData: CreateOrUpdateOrigin) {
  const [error, createdOrigin] = await handleRequest(
    createOrigin(originData).unwrap()
  );

  if (error) {
    toast.error("Houve um erro ao criar a origem");
    errorCallback?.();
    return;
  }

  successCallback(createdOrigin);
}
```

- [ ] **Step 3: Validar o contrato com build e lint**

Run:

```bash
pnpm exec eslint src/store/services/origin/origin.service.ts src/store/requests/origin/useOriginCreate.request.ts
pnpm build
```

Expected: sem erros de tipo nem de lint relacionados ao novo retorno da mutation.

- [ ] **Step 4: Commit**

```bash
git add src/store/services/origin/origin.service.ts src/store/requests/origin/useOriginCreate.request.ts
git commit -m "CF2-20: atualizar criação de origem para retornar o recurso criado"
```

### Task 2: Criar a seção inline de criação de origem

**Files:**
- Create: `src/components/Form/Transaction/components/OriginCreationSection/OriginCreationSection.component.tsx`
- Create: `src/components/Form/Transaction/components/OriginCreationSection/hooks/useOriginCreationSection.hook.ts`

**Interfaces:**
- Consumes: `OriginFormSchema`, `originFormDefaultValues`, `useOriginCreate`, `ColorPicker`, `IconSelector`, `Form` primitives
- Produces: `OriginCreationSection({ onSuccess })` e `useOriginCreationSection({ onSuccess })`

- [ ] **Step 1: Escrever o hook com estado local e submissão**

```ts
interface UseOriginCreationSectionProps {
  onSuccess: (originId: number) => void;
}

export function useOriginCreationSection({
  onSuccess
}: UseOriginCreationSectionProps) {
  // form, colorWatch, isFormVisible, isLoading, handleToggleForm, onSubmit
}
```

- [ ] **Step 2: Implementar o componente com toggle e formulário inline**

```tsx
interface OriginCreationSectionProps {
  onSuccess: (originId: number) => void;
}
```

O componente precisa renderizar:

```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    {/* Botão + Criar Origem / Cancelar */}
    {/* Nome */}
    {/* Descrição */}
    {/* Cor + Ícone */}
    {/* Salvar */}
  </form>
</Form>
```

Use estes campos:

```tsx
<Input type="text" placeholder="Nome da Origem" />
<Textarea className="h-20 resize-none" />
<ColorPicker value={field.value} onChange={field.onChange} />
<IconSelector color={colorWatch} value={field.value} onChange={field.onChange} />
```

- [ ] **Step 3: Garantir que o sucesso feche e resete a seção**

No callback de sucesso:

```ts
onSuccess(origin.id);
setIsFormVisible(false);
form.reset(originFormDefaultValues());
```

Ao cancelar a seção:

```ts
setIsFormVisible(false);
form.reset(originFormDefaultValues());
```

- [ ] **Step 4: Validar a nova seção com build e lint**

Run:

```bash
pnpm exec eslint src/components/Form/Transaction/components/OriginCreationSection/OriginCreationSection.component.tsx src/components/Form/Transaction/components/OriginCreationSection/hooks/useOriginCreationSection.hook.ts
pnpm build
```

Expected: o novo formulário compila e o hook fica tipado sem problemas.

- [ ] **Step 5: Commit**

```bash
git add src/components/Form/Transaction/components/OriginCreationSection/OriginCreationSection.component.tsx src/components/Form/Transaction/components/OriginCreationSection/hooks/useOriginCreationSection.hook.ts
git commit -m "CF2-20: adicionar seção inline para criar origem"
```

### Task 3: Ligar a criação inline ao acordeão de Origens

**Files:**
- Modify: `src/components/Form/Transaction/components/EntityAccordion/EntityAccordion.component.tsx`
- Modify: `src/components/Form/Transaction/Transaction.form.tsx`

**Interfaces:**
- Consumes: `OriginCreationSection`, `EntityAccordionProps.createSection`, `form.setValue("originId", ...)`
- Produces: acordeão de Origens com botão de criação inline e auto-seleção da nova origem

- [ ] **Step 1: Adicionar a prop opcional `createSection` ao acordeão**

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

Renderize `createSection` antes da lista de cards dentro do `AccordionContent`.

- [ ] **Step 2: Passar a seção de criação apenas para Origens**

```tsx
<EntityAccordion
  title="Origens"
  entityOptions={origins}
  formFieldName="originId"
  fetchAreaRef={setOriginFetchRef}
  createSection={
    <OriginCreationSection
      onSuccess={(id) =>
        form.setValue("originId", id, {
          shouldDirty: true,
          shouldValidate: true
        })
      }
    />
  }
/>
```

Não passar `createSection` para categorias nem sub-categorias.

- [ ] **Step 3: Verificar a experiência completa no navegador**

Run:

```bash
pnpm exec eslint src/components/Form/Transaction/components/EntityAccordion/EntityAccordion.component.tsx src/components/Form/Transaction/Transaction.form.tsx
pnpm build
pnpm dev
```

Verificação manual esperada:
1. Abrir o formulário de transação
2. Expandir o acordeão de Origens
3. Clicar em `+ Criar Origem`
4. Salvar uma nova origem
5. Confirmar que a nova origem aparece na lista e fica selecionada automaticamente

- [ ] **Step 4: Commit**

```bash
git add src/components/Form/Transaction/components/EntityAccordion/EntityAccordion.component.tsx src/components/Form/Transaction/Transaction.form.tsx
git commit -m "CF2-20: permitir criar origem no formulário de transação"
```

