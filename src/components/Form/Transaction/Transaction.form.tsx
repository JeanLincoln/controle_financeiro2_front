export function TransactionForm() {
  // const { form, isLoading, onSubmit, isLoadingTransaction } =
  //   useTransactionForm();

  return (
    <></>
    // <Form {...form}>
    //   <form
    //     onSubmit={form.handleSubmit(onSubmit)}
    //     className="flex flex-col items-center justify-center w-full p-6 space-y-6 max-w-120 "
    //   >
    //     {isLoadingTransaction && (
    //       <div className="flex items-center justify-center h-50">
    //         <LoadingSpinner variant="orbit" size="lg" />
    //       </div>
    //     )}
    //     {!isLoadingTransaction && (
    //       <>
    //         <FormField
    //           control={form.control}
    //           name="name"
    //           render={({ field }) => (
    //             <FormItem className="w-full">
    //               <FormLabel className="flex items-center gap-2">
    //                 <FileText className="w-4 h-4" />
    //                 Nome
    //               </FormLabel>
    //               <FormControl>
    //                 <Input
    //                   type="text"
    //                   placeholder="Nome da Transação"
    //                   {...field}
    //                 />
    //               </FormControl>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />
    //         <FormField
    //           control={form.control}
    //           name="description"
    //           render={({ field }) => (
    //             <FormItem className="w-full">
    //               <FormLabel className="flex items-center gap-2">
    //                 <FileText className="w-4 h-4" />
    //                 Descrição
    //               </FormLabel>
    //               <FormControl>
    //                 <Textarea {...field} className="resize-none h-30" />
    //               </FormControl>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />
    //         <div className="flex w-full gap-4"></div>
    //         <Button
    //           type="submit"
    //           variant="outline"
    //           className="flex items-center w-32 gap-2"
    //           disabled={isLoading}
    //         >
    //           {isLoading ? (
    //             <LoadingSpinner size="sm" variant="orbit" />
    //           ) : (
    //             <>
    //               <Save className="w-4 h-4" />
    //               Salvar
    //             </>
    //           )}
    //         </Button>
    //       </>
    //     )}
    //   </form>
    // </Form>
  );
}
