<template>
	<div>
		<ul>
			<li v-for="(item, index) in items" :key="index" @click="handleClick(item, index)" :class="{ active: activeIndex === index && props.hphm === item?.hphm }">
				{{ item?.hphm }}---{{ item?.hpzl }} ---{{ item?.createTime.split(' ')[0] }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts" name="listConm">
	import { ref, defineModel, defineEmits, defineProps } from 'vue'

	const items = defineModel<{ hphm: string; createTime: string; hpzl: string }[]>()
	const props = defineProps({
		hphm: {
			type: String,
		},
	})
	const activeIndex = ref<number | null>(null)
	const emit = defineEmits(['clickItem'])

	const handleClick = (item: { [key: string]: any }, index: number) => {
		emit('clickItem', item)
		activeIndex.value = index
	}
	defineExpose()
</script>

<style scoped>
	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		padding: 10px;
		margin: 5px 0;
		/* background-color: #f0f0f0; */
		cursor: pointer;
		transition: background-color 0.3s;
	}

	li:hover {
		background-color: #e0e0e0;
	}

	li.active {
		background-color: #d0d0d0;
		font-weight: bold;
	}
</style>
