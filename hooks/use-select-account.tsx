import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useRef, useState } from "react";


export const useSelectAccount = (
): [() => JSX.Element, () => Promise<unknown>] => {

    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name:string) => accountMutation.mutate({
        name
    });
    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value: account.id
    }));


    const [promise, setPromise] = useState<{ resolve: (value: string | undefined) => void } | null>(null);

    const selectValue = useRef<string>();

    const comfirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve })
    })

    const handleClose = () => {
        setPromise(null)
    }

    const handleComfirm = () => {
        promise?.resolve(selectValue.current);
        handleClose()
    }

    const handleCancel = () => {
        promise?.resolve(undefined);
        handleClose()
    }

    const comfirmationDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select account</DialogTitle>
                    <DialogDescription>Please select an account to continue</DialogDescription>
                </DialogHeader>
                <Select 
                placeholder="Select an account"
                options={accountOptions}
                onCreate={onCreateAccount}
                onChange={(value) => selectValue.current = value}
                disabled={accountQuery.isLoading || accountMutation.isPending}
                />
                <DialogFooter>
                    <Button
                        onClick={handleCancel}
                        variant="outline"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleComfirm}
                        variant="default"
                    >
                        Comfirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

    return [comfirmationDialog, comfirm]
}