import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

function NewAccountSheet() {
  return (
      <Sheet>
          <SheetContent>
              <SheetHeader>
                  <SheetTitle>
                      New Account
                  </SheetTitle>
                  <SheetDescription>
                      Create a new account to track your transactions
                  </SheetDescription>
              </SheetHeader>
          </SheetContent>
    </Sheet>
  )
}

export default NewAccountSheet