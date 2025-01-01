export interface Expense {
    ExpenseID: number;
    Description: string;
    Amount: number;
    Date: string;
    CategoryName: string;
  }
  
  export interface Income {
    IncomeID: number;
    Description: string;
    Amount: number;
    Date: string;
    CategoryName: string;
  }
  
  export interface Category {
    id: number;
    name: string;
  }
  