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