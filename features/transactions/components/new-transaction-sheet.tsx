import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateTransaction } from "../api/use-create-transaction";
import { useNewTransaction } from "../hooks/use-new-transaction";

const formSchema = insertTransactionSchema.omit({
    id: true
});

type FormValues = z.input<typeof formSchema>;

function NewTransactionSheet() {
    const { isOpen, onClose } = useNewTransaction();

    const mutation = useCreateTransaction()
    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }
  return (
      <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent className="space-y-4">
              <SheetHeader>
                  <SheetTitle>
                      New Transaction
                  </SheetTitle>
                  <SheetDescription>
                      Create a new transactions
                  </SheetDescription>
              </SheetHeader>
              
          </SheetContent>
    </Sheet>
  )
}

export default NewTransactionSheet