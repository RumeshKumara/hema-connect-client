This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Firebase Auth and Role Flow

This project now includes a Firebase Auth + Firestore authentication flow with role-based dashboards.

### 1) Configure Firebase

1. Copy `.env.example` to `.env.local`.
2. Add your Firebase web app config values.
3. Ensure Authentication is enabled in Firebase Console:
	 - Email/Password

### 2) Firestore user profile model

Each authenticated user must have a Firestore document at `users/{uid}`:

```json
{
	"uid": "firebase-auth-uid",
	"fullName": "Jane Doe",
	"email": "jane@example.com",
	"accountType": "donor"
}
```

Allowed `accountType` values:

- `admin`
- `donor`
- `organization`

### 3) Auth pages

- `/login`
	- Email Address
	- Password
- `/register`
	- Full Name
	- Email Address
	- Account Type (`donor` or `organization`)
	- Password

### 4) Route behavior

- Admin users are redirected to `/admin/dashboard`.
- Donor users are redirected to `/donor/dashboard`.
- Organization users are redirected to `/organization/dashboard`.

### 5) Admin account setup

For an admin login, pre-create the admin in both places:

1. Firebase Authentication user (email/password).
2. Firestore `users/{uid}` document with `accountType: "admin"`.

Once that admin user signs in, they are routed to the admin dashboard automatically.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
