# Instagram API Setup

This document explains how to configure Instagram API credentials for the website.

## Prerequisites

To enable Instagram feed integration, you need:

1. An Instagram Business or Creator account
2. Access to Instagram Graph API
3. Instagram App with proper permissions

## Setup Steps

### 1. Create Instagram App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or use an existing one
3. Add the "Instagram Basic Display" product to your app

### 2. Get Instagram Account ID

1. Go to [Instagram Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app
3. Get an access token with `instagram_basic` permission
4. Make a GET request to `/me` endpoint to get your Instagram account ID

### 3. Configure Environment Variables

Add the following to your `.env` file:

```
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
INSTAGRAM_ACCOUNT_ID=your_instagram_account_id_here
```

### 4. Permissions Required

The access token needs the following permissions:
- `instagram_basic`
- `pages_manage_posts` (optional, for posting)

### 5. Testing

After setting up the credentials, restart your development server to test the Instagram feed integration.

## Important Notes

- Instagram API access tokens expire after 60 days
- For production, implement token refresh logic
- The Instagram feed will fall back to mock data if credentials are not configured