# Email Verification Setup

## ✅ What's Been Added

Email verification is now fully implemented! Here's what happens:

1. **User signs up** → Account created but `emailVerified` is `null`
2. **Verification email sent** → User receives email with verification link
3. **User clicks link** → Email verified, `emailVerified` set to current date
4. **User can now login** → Login checks for verified email

## 📧 Setup Resend (Email Service)

### Step 1: Get Resend API Key

1. Go to [resend.com](https://resend.com) and sign up (free tier available)
2. Go to **API Keys** section
3. Create a new API key
4. Copy the API key

### Step 2: Add to `.env.local`

Add these lines to your `.env.local` file:

```env
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

**Note:** For testing, you can use `onboarding@resend.dev` as the from email (Resend provides this for free tier).

### Step 3: Install Resend Package

Run this command:

```bash
npm install resend
```

### Step 4: Restart Dev Server

```bash
npm run dev
```

## 🎯 How It Works

### Signup Flow:
1. User fills out signup form
2. Account created with `emailVerified: null`
3. Verification token generated (expires in 24 hours)
4. Email sent with verification link
5. User redirected to `/signup-success` page

### Verification Flow:
1. User clicks link in email → Goes to `/verify-email?token=...`
2. Token validated → User's `emailVerified` set to current date
3. Token deleted → User redirected to login

### Login Flow:
1. User tries to login
2. System checks `emailVerified` field
3. If `null` → Error: "Please verify your email"
4. If verified → Login succeeds

## 🔒 Security Features

- ✅ Tokens expire after 24 hours
- ✅ Tokens are single-use (deleted after verification)
- ✅ Tokens are cryptographically secure (32-byte random)
- ✅ Email verification required before login

## 📝 Files Created/Modified

- `lib/email.ts` - Email sending utilities
- `app/api/auth/signup/route.ts` - Updated to send verification email
- `app/api/auth/verify-email/route.ts` - Verifies email tokens
- `app/verify-email/page.tsx` - Verification page
- `app/signup-success/page.tsx` - Success page after signup
- `app/api/auth/[...nextauth]/route.ts` - Updated to check emailVerified

## 🧪 Testing

1. Sign up with a new email
2. Check your email inbox
3. Click the verification link
4. Try logging in (should work now!)

---

**Note:** Google OAuth signups automatically verify email (Google handles that), so they don't need this flow.
