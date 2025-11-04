<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown'
	import type { PageProps } from './$types';
	import './page.css'

	let { data }: PageProps = $props();

	let heroBanner = data.post.items[0].data,
		highlights = data.highlights.items

console.log(heroBanner, highlights)

</script>

<div class="hero">
	<img src={"https://cloud.squidex.io/api/assets/oxossi-malta/" + heroBanner.banner.iv} alt="Oxossi Capoeira Malta"/>
	<section class="container">
		<h1>{heroBanner.title.en}</h1>
		<h2>{heroBanner.description.en}</h2>
	</section>
</div>
<section class="container introduction">
	<SvelteMarkdown source={heroBanner.introDescription.en} />
</section>
<div class="highlights">
	<section class="container">
		{#each highlights as highlight}
			<img src={"https://cloud.squidex.io/api/assets/oxossi-malta/" + highlight.data.banner.iv } alt={highlight.data.title.en} />
			<div class="highlight">
				<h1>
					{highlight.data.title.en}
				</h1>
				<h2>
					{highlight.data.description.en}
				</h2>
				<a href="">{highlight.data.ctaText.en}</a>
			</div>
		{/each}
	</section>
</div>
<div class="container mestre">
	<img src="/img/mestre-tarzan_orig.jpg" alt="Oxossi Mestre Tarzan"/>
	<h1>Mestre Tarzan</h1>
</div>
<div class="ani">
	<section class="container">
		<h1>AXÉ NA ILHA</h1>
		<h2>Join us for the largest Capoeira event of the year in Malta!</h2>
		<p>We are really excited that Capoeira Events (by Oxossi) in Malta is bringing you the 3rd edition of Capoeira October Fest!  Whether you are new to Capoeira and just curious, or practicing for many years, you will be stimulated and enriched by this event. Register by clicking the button below.</p>
		<a href="" class="secondary">Register now</a>
	</section>
</div>