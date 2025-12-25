# LinkedIn OAuth Integration

## Overview

LinkedIn login and signup buttons have been successfully integrated into the authentication pages.

## Files Created/Modified

### New Files:

1. **`src/lib/linkedinAuth.ts`** - LinkedIn OAuth utility functions
2. **`src/components/auth/LinkedInButton.tsx`** - Reusable LinkedIn button component
3. **`src/app/(auth)/linkedin-callback/page.tsx`** - LinkedIn OAuth callback handler

### Modified Files:

1. **`src/app/(auth)/signin/page.tsx`** - Added LinkedIn sign-in button
2. **`src/app/(auth)/signup/page.tsx`** - Added LinkedIn sign-up button
3. **`.env`** - Added LinkedIn OAuth redirect URI configuration

## LinkedIn OAuth Configuration

### Environment Variables:

```env
NEXT_PUBLIC_CLIENT_ID=your_linkedin_client_id
NEXT_PUBLIC_PRIMARY_CLIENT_SECRET=your_linkedin_client_secret
NEXT_PUBLIC_LINKEDIN_REDIRECT_URI=http://localhost:3000/linkedin-callback
```

### LinkedIn Developer Settings:

You need to configure the following in your LinkedIn App settings:

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Select your app
3. Add Authorized Redirect URLs:
   - **Development:** `http://localhost:3000/linkedin-callback`
   - **Production:** `https://yourdomain.com/linkedin-callback`

## How It Works

### Sign In Flow:

1. User clicks "Sign in with LinkedIn" button
2. User is redirected to LinkedIn OAuth page
3. After authorization, LinkedIn redirects to `/linkedin-callback`
4. Callback page exchanges code for access token
5. Fetches user profile from LinkedIn API
6. Sends login request to backend with `loginProvider: "linkedin"`
7. Backend handles login (creates account if first time)
8. User is redirected to appropriate dashboard

### Sign Up Flow:

1. User selects a role first (required)
2. User clicks "Sign up with LinkedIn" button
3. Role and userType are stored in sessionStorage
4. Same OAuth flow as sign-in
5. Backend receives role, userType, firstName, lastName from LinkedIn
6. Backend creates new account automatically
7. User is redirected to complete their profile

## Backend Integration

The implementation follows the backend API specification:

### Login Endpoint: `POST /api/v1/auth/login`

**For existing LinkedIn user:**

```json
{
  "email": "user@example.com",
  "loginProvider": "linkedin"
}
```

**For new LinkedIn user:**

```json
{
  "email": "user@example.com",
  "loginProvider": "linkedin",
  "firstName": "John",
  "lastName": "Doe",
  "role": "Professional Player",
  "userType": "candidate"
}
```

## Features

✅ LinkedIn OAuth 2.0 integration
✅ CSRF protection using state parameter
✅ Automatic account creation for new users
✅ Role-based signup flow
✅ Error handling and user feedback
✅ Responsive LinkedIn button with icon
✅ Seamless redirect flow
✅ Compatible with React 19

## Testing

1. **Start Development Server:**

   ```bash
   npm run dev
   ```

2. **Test Sign In:**

   - Go to `/signin`
   - Click "Sign in with LinkedIn"
   - Authorize the app on LinkedIn
   - Verify successful login and redirect

3. **Test Sign Up:**
   - Go to `/signup`
   - Select a role (e.g., "Professional Player")
   - Click "Sign up with LinkedIn"
   - Authorize the app on LinkedIn
   - Verify account creation and redirect

## Important Notes

⚠️ **Redirect URI Configuration:**

- Make sure the redirect URI in your `.env` matches exactly what's configured in LinkedIn Developer Portal
- For production, update `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI` to your production domain

⚠️ **Client Secret Security:**

- The client secret is exposed in the frontend (NEXT*PUBLIC*\*)
- For production, consider moving token exchange to a backend API route to keep the secret secure

⚠️ **Role Selection:**

- For signup, users MUST select a role before clicking LinkedIn button
- The signup flow validates this and shows an error if no role is selected

## Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" error:**

   - Ensure the redirect URI in `.env` matches LinkedIn app settings
   - Check for trailing slashes or protocol mismatches

2. **"Invalid state parameter" error:**

   - Browser may have blocked sessionStorage
   - Try in incognito mode or check browser settings

3. **Backend login fails:**
   - Verify backend API is running
   - Check that `loginProvider: "linkedin"` is sent correctly
   - Ensure backend handles LinkedIn login as per documentation

## Next Steps

- [ ] Consider moving token exchange to backend API route for better security
- [ ] Add loading states during OAuth flow
- [ ] Implement retry logic for failed token exchanges
- [ ] Add analytics tracking for LinkedIn login/signup
- [ ] Test with different LinkedIn account types
