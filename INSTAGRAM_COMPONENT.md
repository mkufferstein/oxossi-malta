# Instagram Component Implementation Documentation

## Purpose and Functionality

The Instagram component is designed to display Instagram feed content on the website. It renders a responsive grid of Instagram posts with key information including media images, captions, and engagement metrics.

## Integration with Component System

The component integrates seamlessly with the existing component system through the layout rendering mechanism:

1. **Component Registration**: The Instagram component is exported in `src/lib/component/index.ts` and registered with the `COMPONENT_INSTAGRAM` constant
2. **Layout Integration**: The layout system in `src/lib/layout/layout.svelte` matches components based on their schema names and renders the appropriate component
3. **Data Flow**: Instagram data is passed from server-side components to the layout and then to the Instagram component

## Data Flow

The data flows through the following sequence:

1. **Server Side**: `src/lib/server/instagram/index.ts` contains the `fetchInstagramData()` function that retrieves Instagram data
2. **Page Load**: In page server files (e.g., `src/routes/+page.server.ts`), Instagram data is fetched and passed to the page data
3. **Layout Rendering**: The layout component receives the data and passes it to the appropriate component based on schema matching
4. **Component Display**: The Instagram component receives the data and renders it in the specified format

## Implementation Details

### Component Files

**File: `src/lib/component/instagram/instagram.svelte`**
```svelte
<script lang="ts">
  import type { InstagramPost } from './types'

  export let instagramData: {
    posts: InstagramPost[]
  }

  const { posts } = instagramData
</script>

<div class="instagram-container">
  <div class="instagram-grid">
    {#each posts as post (post.id)}
      <div class="instagram-post">
        <a href={post.permalink} target="_blank" rel="noopener noreferrer">
          <img src={post.media_url} alt={post.caption} />
        </a>
        <div class="instagram-post-info">
          <p class="instagram-caption">{post.caption}</p>
          <div class="instagram-stats">
            <span class="instagram-likes">{post.likes} likes</span>
            <span class="instagram-comments">{post.comments} comments</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
```

**File: `src/lib/component/instagram/instagram.css`**
```css
.instagram-container {
  padding: 1rem;
}

.instagram-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.instagram-post {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.instagram-post img {
  width: 100%;
  height: auto;
  display: block;
}

.instagram-post-info {
  padding: 1rem;
}

.instagram-caption {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.instagram-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #666;
}

@media (max-width: 768px) {
  .instagram-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.5rem;
  }
}
```

### Component Registration

**File: `src/lib/component/index.ts`**
```typescript
export { default as Instagram } from './instagram/instagram.svelte'
export { COMPONENT_INSTAGRAM } from './types'
```

### Component Type Constants

**File: `src/lib/component/types.ts`**
```typescript
export const COMPONENT_INSTAGRAM = 'instagram'
```

### Layout Integration

**File: `src/lib/layout/layout.svelte`**
```svelte
{#if component.schema === COMPONENT_INSTAGRAM}
  <Instagram {instagramData} />
{/if}
```

## Configuration Requirements

To use the Instagram component, the following setup is required:

1. **Server-side Implementation**: The `fetchInstagramData()` function in `src/lib/server/instagram/index.ts` needs to be implemented with actual Instagram API integration
2. **Instagram API Access**: Proper Instagram Graph API credentials and permissions must be configured
3. **Data Structure**: The component expects data in the following format:
   ```typescript
   {
     posts: [
       {
         id: string,
         media_url: string,
         permalink: string,
         caption: string,
         likes: number,
         comments: number
       }
     ]
   }
   ```

## Usage

To use the Instagram component on a page:

1. Add the Instagram component to your layout schema in Squidex CMS
2. Ensure the page server file fetches Instagram data and passes it to the layout
3. The component will automatically render when the layout encounters a component with the `instagram` schema

## Notes

The current implementation in `src/lib/server/instagram/index.ts` contains only a mock data fallback. To make the component functional with real Instagram data, the Instagram API integration needs to be implemented in that file.