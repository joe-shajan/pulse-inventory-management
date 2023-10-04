This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

steps after updating prisma schema

```sh
npx prisma migrate dev
```

```sh
npx prisma migrate dev --name newtables
```

```sh
npx prisma db push
```

# Checklist

## Project Checklist - Shop Inventory Management App

1. **User Account Management:**
   - [x] Implement user registration with fields: Name, Phone Number, Email, Password.
   - [x] Implement user login using Email/Phone Number and Password combination.

2. **Shop Creation:**
   - [x] Allow logged-in users to create a shop with details: Name, Shop bio/about, Address, Latitude, and Longitude of the shop.

3. **Product Management:**
   - [x] Enable users to add products with attributes: Name, Description, Price, Tags, Available stock/inventory.
   - [x] Implement the ability to view a list of all products.
   - [x] Implement the ability to edit and delete added products.
   - [x] Allow users to change the available stock/inventory of each product separately and for each shop.

4. **User Roles:**
   - [x] Implement user roles: Admin and Manager.
   - [ ] Admin should have the ability to add and remove team members (Managers).
   - [x] Only Admins should be able to add more products.
   - [x] Managers cannot add more users or products; they can only change the available stock of products.

5. **Efficient Product List View:**
   - [ ] Optimize the product list view to handle a large number of products efficiently (consider pagination or virtualization).

6. **Data Persistence:**
   - [x] Implement data persistence to ensure user data and added products persist between app sessions.

7. **Security:**
   - [x] Implement secure authentication and authorization mechanisms to protect user accounts and data.
   - [ ] Ensure password hashing and encryption for user credentials.

8. **User Experience:**
   - [x] Implement error handling and validation for user inputs.
