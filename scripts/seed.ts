import { categories, transactions } from "@/db/schema";
import { convertAmountToMiliunits } from "@/lib/utils";
import { neon } from "@neondatabase/serverless";
import { format, subDays } from "date-fns";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env.local" })

const sql = neon(process.env.DATABSE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = "user_2WL66wH8iHY0rkKPGIenepNyfqS"
const SEED_CATEGORIES = [
    { id: "category_1", anem: "Food", userId: SEED_USER_ID, plaidId: null },
    { id: "category_2", anem: "Rent", userId: SEED_USER_ID, plaidId: null },
    { id: "category_3", anem: "Utilities", userId: SEED_USER_ID, plaidId: null },
    { id: "category_7", anem: "Clothing", userId: SEED_USER_ID, plaidId: null },
    { id: "category_1", anem: "Checking", userId: SEED_USER_ID, plaidId: null },
    { id: "category_2", anem: "Savings", userId: SEED_USER_ID, plaidId: null },
];

const SEED_ACCOUNTS = [
    {id: "account_1", name: "Checking", userId: SEED_USER_ID, plaidId: null},
    {id: "account_2", name: "Savings", userId: SEED_USER_ID, plaidId: null},
]

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSCTIONS: typeof transactions.$inferInsert[] = [];


const generatedRandomAmount = (category: typeof categories.$inferInsert) => {
    switch (category.name) {
        case "Rent":
            return Math.random() * 400 + 90;
        case "Utilities":
            return Math.random() * 200 + 10;
        case "Food":
            return Math.random() * 30 + 10
        case "Transportation":
        case "Health":
            return Math.random() * 50 + 15
        case "Entertainment":
        case "Clothing":
        case "Miscellaneous":
            return Math.random() * 100 + 20;
        default:
            return Math.random() * 50 + 10;
    }
}

const generateTransactionsForDay = (day: Date) => {
    const numTransactions = Math.floor(Math.random() * 4) + 1;

    for (let i = 0; i < numTransactions; i++) {
        const category = SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];

        const isExpense = Math.random() > 0.6;
        const amount = generatedRandomAmount(category);
        const formattedAmount = convertAmountToMiliunits(isExpense ? -amount : amount);

         SEED_TRANSCTIONS.push({
        id: `transaction_${format(day, "yyy-MM-dd")}_${i}`,
        accountId: SEED_ACCOUNTS[0].id,
        categoryId: category.id,
        date: day,
        amount: formattedAmount,
        payee: "Merchant",
        notes: "Random transaction"

    })
    }

    // const generateTransactions = () => {
    //     const days = eachO
    // }

   
}