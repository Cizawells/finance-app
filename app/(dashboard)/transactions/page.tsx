"use client"

import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions"
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions"
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { columns } from "./columns"
import ImportCard from "./import-card"
import { UploadButton } from "./upload-button"
import { transactions as transactionSchema} from "@/db/schema"

enum VARIANTS {
    LIST = "LIST",
    IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors: [],
    meta: {}
}

function TransactionsPage() {
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        console.log({results})
        setImportResults(results)
        setVariant(VARIANTS.IMPORT)
    }

    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULTS);
        setVariant(VARIANTS.LIST)
    }


    const newTransaction = useNewTransaction();
    const deleteTransactions = useBulkDeleteTransactions()
    const transactionsQuery = useGetTransactions();
    const transactions = transactionsQuery.data || [];

    const isDisabled = 
        transactionsQuery.isLoading || 
        deleteTransactions.isPending;

        const onSubmitImport = async(
            values: typeof transactionSchema.$inferInsert[],
        ) => {
            
        }
    if (transactionsQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8 w-48"/>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center">
                            <Loader2 className="size-6 text-slate-300 animate-spin" />
                        </div>
                    </CardContent>
                </Card>
           </div> 
        )
    }

    if (variant === VARIANTS.IMPORT) { 
        return (
            <>
                <div>
                    <ImportCard
                        data={importResults.data}
                        onCancel={onCancelImport}
                        onSubmit={onSubmitImport}
                    />
                </div>
            </>
        )
    }
  return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
          <Card className="border-none drop-shadow-sm">
              <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                  <CardTitle className="text-xl line-clamp-1">
                      Transaction history
                  </CardTitle>
                  <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-2">
                         <Button 
                         className="w-full lg:w-auto"
                         onClick={newTransaction.onOpen} 
                         size="sm">
                      Add new
                  </Button>
                  <UploadButton
                    onUpload={onUpload}
                  />
                  </div>
               
              </CardHeader>
              <CardContent>
                  <DataTable
                      columns={columns}
                      data={transactions}
                      filterKey="payee"
                      onDelete={(row) => {
                          const ids = row.map((r) => r.original.id)
                          deleteTransactions.mutate({ ids })
                      }}
                      disabled={isDisabled}
                  />
              </CardContent>
          </Card>
    </div>
  )
}

export default TransactionsPage