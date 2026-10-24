# Instagram Component Implementation Documentation

## 1. Purpose and Functionality

The Instagram component is designed to display a responsive grid of Instagram posts fetched from the Instagram Graph API. It serves as a reusable UI component that can be integrated into various pages and layouts of the Svelte application.

Key features:
- Displays Instagram posts in a responsive grid layout
- Shows post images with links to Instagram
- Displays engagement metrics (likes and comments)
- Gracefully handles cases where no posts are available
- Responsive design that adapts to different screen sizes

## 2. Component Integration with Existing System

The Instagram component is integrated into the project's component system through the following mechanisms:

### Component Registration
The component is registered in `/src/lib/component/index.ts`:
```typescript
import Instagram from './instagram/instagram.svelte'
// ... other imports
export {
  // ... other exports
  Instagram,
}
```

### Layout Integration
The component is used within the layout system in `/src/lib/layout/layout.svelte`:
```svelte
{#if component?.schemaName === COMPONENT_INSTAGRAM}
  <Instagram instagramData={instagramData} />
{/if}
```

### Component Schema Definition
The component schema is defined in `/src/lib/component/types.ts`:
```typescript
export const COMPONENT_INSTAGRAM = 'instagram'
```

## 3. Data Flow from Server to Component

### Server-Side Data Fetching
Instagram data is fetched server-side using the `fetchInstagramData()` function, which is imported and called in various page server files (e.g., `/src/routes/axe-da-ilha-2026/+page.server.ts`).

The data fetching logic is expected to be implemented in `/src/lib/server/instagram/index.ts`, though currently this file appears to be empty. Based on the usage patterns, it should implement logic to:
1. Check for Instagram API credentials (INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_ACCOUNT_ID)
2. Fetch recent Instagram media using the Instagram Graph API
3. Return structured data with posts containing:
   - `media_url`: URL to the Instagram image
   - `permalink`: Link to the Instagram post
   - `caption`: Post caption
   - `likes`: Number of likes
   - `comments`: Number of comments

### Data Passing to Component
The fetched data is passed to the Instagram component through the `instagramData` prop:
```svelte
<Instagram instagramData={instagramData} />
```

## 4. Implementation Details

### Component Files

#### Main Component: `/src/lib/component/instagram/instagram.svelte`
```svelte
<script lang="ts">
  import './instagram.css'

  const {
    instagramData,
  } = $props()
</script>

<div class="instagram">
  <h2>Instagram Feed</h2>
  <div class="instagram-container">
    {#if instagramData?.posts?.length > 0}
      {#each instagramData.posts as post}
        <div class="instagram-post">
          <a href={post.permalink} target="_blank" rel="noopener noreferrer">
            <img src={post.media_url} alt={post.caption} />
          </a>
          <div class="instagram-post-info">
            <span class="instagram-likes">{post.likes || 0} likes</span>
            <span class="instagram-comments">{post.comments || 0} comments</span>
          </div>
        </div>
      {/each}
    {:else}
      <p>No Instagram posts available</p>
    {/if}
  </div>
</div>
```

#### Styles: `/src/lib/component/instagram/instagram.css`
```css
.instagram {
  padding: 2rem 0;
}

.instagram-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.instagram-post {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.instagram-post:hover {
  transform: translateY(-5px);
}

.instagram-post img {
  width: 100%;
  height: auto;
  display: block;
}

.instagram-post-info {
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  background-color: #f8f8f8;
  font-size: 0.9rem;
}

.instagram-post-info span {
  color: #666;
}
```

## 5. Configuration and Setup Requirements

### Environment Variables
To enable actual Instagram data fetching, the following environment variables must be configured:
- `INSTAGRAM_ACCESS_TOKEN`: Instagram Graph API access token
- `INSTAGRAM_ACCOUNT_ID`: Instagram account ID

### Usage in Pages
To use the Instagram component in a page, follow this pattern in the page server file:
```typescript
import { fetchInstagramData } from '$lib/server/instagram/index.js';

export async function load({ }) {
  const instagramData = await fetchInstagramData()
  return {
    instagramData: instagramData
  }
}
```

And in the page Svelte file:
```svelte
<script>
  const instagramData = data?.instagramData
</script>

<Layout {layout} {instagramData} />
```

### Fallback Behavior
When Instagram API credentials are not available, the component should gracefully fall back to mock data. This behavior is expected to be implemented in the server-side data fetching logic.

## 6. Component Properties

### Required Props
- `instagramData`: Object containing Instagram posts data with the following structure:
  - `posts`: Array of post objects, each with:
    - `media_url`: String - URL to the Instagram image
    - `permalink`: String - Link to the Instagram post
    - `caption`: String - Post caption
    - `likes`: Number - Number of likes
    - `comments`: Number - Number of comments

## 7. Responsive Design

The component uses CSS Grid for responsive layout:
- Uses `repeat(auto-fill, minmax(250px, 1fr))` to create a responsive grid
- Minimum 250px width for each post card
- Automatically adjusts column count based on available space
- Includes hover effects for better user experience

## 8. Error Handling

The component gracefully handles cases where:
- No Instagram data is available
- Instagram API returns no posts
- API credentials are missing (falls back to mock data)

## 9. Future Improvements

1. Implement proper error handling in the server-side data fetching
2. Add loading states for better UX during data fetching
3. Implement pagination for large Instagram feeds
4. Add support for different Instagram post types (videos, carousels)
5. Add caching mechanism for Instagram data to reduce API calls