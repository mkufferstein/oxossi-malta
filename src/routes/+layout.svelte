<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import './layout.css'

	let { children } = $props();

	let isMenuOpen: boolean = $state(false)

	let classList : string[] = $derived.by(() => {
		const classList = ['hamburger']
		classList.push((isMenuOpen) ? 'iconoir-xmark' : 'iconoir-menu')
		return classList
	})

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Capoeira Website</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css">
</svelte:head>

<!-- Navigation -->
<nav class="navbar">
		<div class="container" class:open={isMenuOpen}>
				<a href="/" class="logo"></a>
				<ul class="nav-links">
						<li><a href="/capoeira-classes-malta">Capoeira Classes</a></li>
						<li><a href="/gentle-power">55+ Classes</a></li>
						<li><a href="/axe-na-ilha">Capoeira Festival</a></li>
						<li><a href="/about-oxossi-capoeira-malta">About Us</a></li>
						<li><a href="/contact">Contact</a></li>
				</ul>
				<a href="#" class="secondary">Schedule</a>
				<span class={classList.join(' ')} onclick={toggleMenu}></span>
		</div>
</nav>

<!-- Main Content -->
<main class="main">
	{@render children?.()}
</main>

<!-- Footer -->
<footer class="footer">
		<div class="container">
				<div class="social-links">
						<a href="https://www.instagram.com/oxossi_capoeiramalta/" target="_blank">
							<img src="/img/instagram.svg" alt="Oxossi Malta WhatsApp group"/>
						</a>
						<a href="https://chat.whatsapp.com/EwZYK9bmVLx8NmgOSNYu65?mode=ems_wa_t" target="_blank">
							<img src="/img/whatsapp.svg" alt="Oxossi Malta WhatsApp group"/>
						</a>
						<a href="https://www.facebook.com/profile.php?id=61561065594680" target="_blank">
							<img src="/img/facebook.png" alt="Oxossi Malta Facebbok"/>
						</a>
				</div>
				<p>&copy; 2025 Capoeira Oxossi Malta. All rights reserved.</p>
		</div>
</footer>
