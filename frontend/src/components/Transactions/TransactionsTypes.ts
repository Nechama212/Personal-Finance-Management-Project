export interface Expense {
  ExpenseID: number;
  Description: string;
  Amount: number;
  Date: string;
  CategoryName: string;
  UserEmail: string; 
}

export interface Income {
  IncomeID: number;
  Description: string;
  Amount: number;
  Date: string;
  CategoryName: string;
  UserEmail: string; 
}

export interface Category {
  id: number;
  name: string;
}