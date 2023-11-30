<script lang="ts">
	import { cubicIn } from 'svelte/easing'
	import { tweened } from 'svelte/motion'
	import { slide } from 'svelte/transition'
	import { slugify } from '../libs/slugify.ts'
	import { config } from '../libs/siteConfig.ts'

	export let items: string[]

	const translate = tweened(1, {
		duration: 100,
		easing: cubicIn
	})
	const rotate = tweened(0, {
		duration: 100,
		easing: cubicIn
	})
	let opacity = 1
	let open = false
	async function handleClick() {
		if (!open) {
			await translate.set(18)
			opacity = 0
			await rotate.set(45)
		} else {
			await rotate.set(0)
			opacity = 1
			await translate.set(0)
		}
		open = !open
	}
</script>

<div class=" z-50 items-center">
	<button
		on:click={handleClick}
		class="text-3xl sm:text-5xl stroke-black transition-all"
		class:stroke-white={open}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			version="1.1"
			viewBox="0 0 100 100"
			data-open={open}
			class="group hover:scale-x-110 transition-transform stroke-[7]"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path
				id="hamburgerline1"
				d="m12.229 31.27h75.543"
				class="origin-center"
				style="transform: rotate({$rotate}deg) translate(0,{$translate}%)"
			/>

			<path id="hamburgerline2" d="m12.229 50h75.543" style="opacity:{opacity}" />

			<path
				id="hamburgerline3"
				d="m12.229 68.731h75.543"
				class="origin-center"
				style="transform:rotate({-$rotate}deg) translate(0,{-$translate}%)"
			/>
		</svg>
	</button>
</div>

{#if open}
	<nav
		class="fixed inset-0 bg-black z-10 grid place-content-center"
		transition:slide={{ duration: 200, easing: cubicIn }}
	>
		<ul class=" mx-auto space-y-10 text-center">
			{#each items as title, index}
				<li style="--_index:{index}" class="px-1">
					<a
						href={`/${slugify(title)}`}
						class="group relative min-w-[13rem] inline-block rounded-full {config.categoriesColors[
							index % config.categoriesColors.length
						].bg} font-display text-4xl"
					>
						<span
							class="inline-block capitalize rounded-full {config.categoriesColors[
								index % config.categoriesColors.length
							]
								.fg}  px-4 py-1 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 w-full text-center"
							>{title}</span
						>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	li {
		animation: fadein 0.2s ease-in both calc(var(--_index) * 0.05s + 0.2s);
	}
	@keyframes fadein {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
