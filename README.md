# Delivery App: Test task for ElifTech
## level of accomplished: Advanced.

**Live Demo:** [https://delivery-app-ugqq.onrender.com/shop](https://delivery-app-ugqq.onrender.com/shop)

## Technical Stack

### Frontend
* React 18 with TypeScript
* Vite as the build tool
* Tailwind CSS for styling
* Shadcn UI as the component library
* TanStack Query (React Query) for server state management
* React Hook Form + Zod for robust form validation

### Backend
* Node.js and Express.js
* Prisma ORM for database communication
* PostgreSQL as the relational database


## Installation and Setup

### Prerequisites
* Node.js (v18 or higher)
* PostgreSQL installed and running

### Step 1: Clone the Repository
```bash
git clone [https://github.com/ivan10gudko/delivery-app.git](https://github.com/ivan10gudko/delivery-app.git)
cd delivery-app
```
### Step 2: Backend Setup
Navigate to the backend directory:

```bash
cd backend
```
Install dependencies:
```bash
npm install
```
Create a .env file and add your database credentials:
```code
DATABASE_URL="postgresql://user:password@localhost:5432/delivery_db"
PORT=3000
```

Sync the database and run the seed script:
```bash
npx prisma db push
npx prisma db seed
```
Start the development server:
```bash
npm run dev
```
### Step 3: Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```
Install dependencies:
```bash
npm install
```
Create a .env file for the API connection:
```code
VITE_API_URL=http://localhost:3000/api
```
Start the client:

```bash
npm run dev
```
