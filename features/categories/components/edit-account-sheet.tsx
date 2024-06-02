import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { insertAccountSchema } from "@/db/schema";
import { useConfirm } from "@/hooks/use-confirm";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useDeleteAccount } from "../api/use-delete-account";
import { useEditCategory } from "../api/use-edit-category";
import { useGetCategory } from "../api/use-get-category";
import { useOpenCategory } from "../hooks/use-open-category";
import { AccountForm } from "./account-form";

const formSchema = insertAccountSchema.pick({
    name: true
});

type FormValues = z.input<typeof formSchema>;

function EditAccountSheet() {
    const { isOpen, onClose, id } = useOpenCategory();

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this transaction"
    )

    const accountQuery = useGetCategory(id);
    const editMutation = useEditCategory(id)
    const deleteMutation = useDeleteAccount(id)
    // const mutation = useCreateAccount();

    const isPending = 
    editMutation.isPending || deleteMutation.isPending

    const isLoading = accountQuery.isLoading

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name
    } : {
        name: ""
    }

    const onDelete = async () => {
        const ok = await confirm();
        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose()
                }
            })
        }
    }
    return (
        <>
            <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent className="space-y-4">
              <SheetHeader>
                  <SheetTitle>
                      Edit Account
                  </SheetTitle>
                  <SheetDescription>
                      Edit an existing account
                  </SheetDescription>
              </SheetHeader>
              {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                  </div>
              ) : (
                      <AccountForm
                  onSubmit={onSubmit}
                  disabled={isPending}
                          defaultValues={defaultValues}
                          onDelete={onDelete}
              /> 
              )
              }
             
          </SheetContent>
            </Sheet>
            </>
  )
}

export default EditAccountSheet