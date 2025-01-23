DROP TABLE IF EXISTS public."User" CASCADE;
DROP TABLE IF EXISTS public."Category" CASCADE;
DROP TABLE IF EXISTS public."Analytics" CASCADE;
DROP TABLE IF EXISTS public."Expense" CASCADE;
DROP TABLE IF EXISTS public."Income" CASCADE;
DROP TABLE IF EXISTS public."MonthlyBudget" CASCADE;
DROP TABLE IF EXISTS public."SavingGoal" CASCADE;

CREATE TABLE public."User" (
    "Email" text NOT NULL,
    "UserName" text NOT NULL,
    "Password" text NOT NULL,
    "Language" text NOT NULL,
    PRIMARY KEY ("Email")
);

CREATE TABLE public."Category" (
    "CategoryID" integer NOT NULL,
    "CategoryName" text NOT NULL,
    "Email" text NOT NULL,
    PRIMARY KEY ("CategoryID"),
    UNIQUE ("CategoryName"),
    FOREIGN KEY ("Email") REFERENCES public."User"("Email") ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE public."Analytics" (
    "AnalyticsID" integer NOT NULL,
    "CategoryName" text NOT NULL,
    "Metric" text DEFAULT ''::text NOT NULL,
    "Value" double precision DEFAULT 0 NOT NULL,
    "Date" timestamp(3) without time zone NOT NULL,
    "Email" text NOT NULL,
    PRIMARY KEY ("AnalyticsID"),
    FOREIGN KEY ("CategoryName") REFERENCES public."Category"("CategoryName") ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY ("Email") REFERENCES public."User"("Email") ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE public."Expense" (
    "ExpenseID" integer NOT NULL,
    "Email" text NOT NULL,
    "Amount" double precision NOT NULL,
    "Date" timestamp(3) without time zone NOT NULL,
    "CategoryName" text NOT NULL,
    "Description" text,
    PRIMARY KEY ("ExpenseID"),
    FOREIGN KEY ("CategoryName") REFERENCES public."Category"("CategoryName") ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY ("Email") REFERENCES public."User"("Email") ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE public."Income" (
    "IncomeID" integer NOT NULL,
    "Email" text NOT NULL,
    "Amount" double precision NOT NULL,
    "Date" timestamp(3) without time zone NOT NULL,
    "CategoryName" text NOT NULL,
    "Description" text,
    PRIMARY KEY ("IncomeID"),
    FOREIGN KEY ("CategoryName") REFERENCES public."Category"("CategoryName") ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY ("Email") REFERENCES public."User"("Email") ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE public."MonthlyBudget" (
    "BudgetID" integer NOT NULL,
    "Email" text NOT NULL,
    "CategoryName" text NOT NULL,
    "BudgetAmount" double precision NOT NULL,
    "SpentAmount" double precision NOT NULL,
    "BudgetMonth" timestamp(3) without time zone NOT NULL,
    PRIMARY KEY ("BudgetID"),
    FOREIGN KEY ("CategoryName") REFERENCES public."Category"("CategoryName") ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY ("Email") REFERENCES public."User"("Email") ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE public."SavingGoal" (
    "GoalID" integer NOT NULL,
    "Email" text NOT NULL,
    "Amount" double precision NOT NULL,
    "SavedAmount" double precision NOT NULL,
    "TargetDate" timestamp(3) without time zone NOT NULL,
    "Description" text,
    PRIMARY KEY ("GoalID"),
    FOREIGN KEY ("Email") REFERENCES public."User"("Email") ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE SEQUENCE public."Analytics_AnalyticsID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public."Category_CategoryID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public."Expense_ExpenseID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public."Income_IncomeID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public."MonthlyBudget_BudgetID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public."SavingGoal_GoalID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public."Analytics_AnalyticsID_seq" OWNED BY public."Analytics"."AnalyticsID";
ALTER SEQUENCE public."Category_CategoryID_seq" OWNED BY public."Category"."CategoryID";
ALTER SEQUENCE public."Expense_ExpenseID_seq" OWNED BY public."Expense"."ExpenseID";
ALTER SEQUENCE public."Income_IncomeID_seq" OWNED BY public."Income"."IncomeID";
ALTER SEQUENCE public."MonthlyBudget_BudgetID_seq" OWNED BY public."MonthlyBudget"."BudgetID";
ALTER SEQUENCE public."SavingGoal_GoalID_seq" OWNED BY public."SavingGoal"."GoalID";

-- Sequence Set Commands
-- Name: Analytics_AnalyticsID_seq; Type: SEQUENCE SET; Schema: public; Owner: nechamachen
SELECT pg_catalog.setval('public."Analytics_AnalyticsID_seq"', 1, false);

-- Name: Category_CategoryID_seq; Type: SEQUENCE SET; Schema: public; Owner: nechamachen
SELECT pg_catalog.setval('public."Category_CategoryID_seq"', 1, false);

-- Name: Expense_ExpenseID_seq; Type: SEQUENCE SET; Schema: public; Owner: nechamachen
SELECT pg_catalog.setval('public."Expense_ExpenseID_seq"', 1, false);

-- Name: Income_IncomeID_seq; Type: SEQUENCE SET; Schema: public; Owner: nechamachen
SELECT pg_catalog.setval('public."Income_IncomeID_seq"', 1, false);

-- Name: MonthlyBudget_BudgetID_seq; Type: SEQUENCE SET; Schema: public; Owner: nechamachen
SELECT pg_catalog.setval('public."MonthlyBudget_BudgetID_seq"', 1, false);

-- Name: SavingGoal_GoalID_seq; Type: SEQUENCE SET; Schema: public; Owner: nechamachen
SELECT pg_catalog.setval('public."SavingGoal_GoalID_seq"', 1, false);


-- Users
INSERT INTO public."User" ("Email", "UserName", "Password", "Language") VALUES
('example@example.com', 'exampleuser', 'password123', 'en');

-- Categories
INSERT INTO public."Category" ("CategoryID", "CategoryName", "Email") VALUES
(2, 'Groceries', 'example@example.com'),
(3, 'Utilities', 'example@example.com'),
(4, 'Salary', 'example@example.com');

-- Expenses
INSERT INTO public."Expense" ("ExpenseID", "Email", "Amount", "Date", "CategoryName", "Description") VALUES
(2, 'example@example.com', 50.75, '2023-01-02', 'Groceries', 'Bought fruits and vegetables'),
(3, 'example@example.com', 120.00, '2023-01-03', 'Utilities', 'Electricity bill payment');

-- Income
INSERT INTO public."Income" ("IncomeID", "Email", "Amount", "Date", "CategoryName", "Description") VALUES
(2, 'example@example.com', 2500.00, '2023-01-01', 'Salary', 'Monthly salary'),
(3, 'example@example.com', 3000.00, '2023-01-01', 'Salary', 'Monthly salary');

-- Analytics
INSERT INTO public."Analytics" ("AnalyticsID", "CategoryName", "Metric", "Value", "Date", "Email") VALUES
(2, 'Groceries', 'spending', 200, '2023-01-01', 'example@example.com'),
(3, 'Utilities', 'usage', 300, '2023-01-01', 'example@example.com');

-- Monthly Budgets
INSERT INTO public."MonthlyBudget" ("BudgetID", "Email", "CategoryName", "BudgetAmount", "SpentAmount", "BudgetMonth") VALUES
(2, 'example@example.com', 'Groceries', 300.00, 50.75, '2023-01-01'),
(3, 'example@example.com', 'Utilities', 150.00, 120.00, '2023-01-01');

-- Saving Goals
INSERT INTO public."SavingGoal" ("GoalID", "Email", "Amount", "SavedAmount", "TargetDate", "Description") VALUES
(2, 'example@example.com', 10000.00, 2000.00, '2024-12-31', 'Vacation fund'),
(3, 'example@example.com', 5000.00, 1000.00, '2024-06-30', 'New laptop');
