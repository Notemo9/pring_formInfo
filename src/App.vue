<template>
	<div id="app">
		<VoiceCaller />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	import VoiceCaller from './components/VoiceCaller.vue'

	export default defineComponent({
		name: 'App',
		components: {
			VoiceCaller,
		},
	})
</script>
