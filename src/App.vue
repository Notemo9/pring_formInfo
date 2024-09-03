<template>
	<div id="app">
		<VoiceCaller />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	import VoiceCaller from '@/components/printForm/index.vue'

	export default defineComponent({
		name: 'App',
		components: {
			VoiceCaller,
		},
	})
</script>
