<template>
	<div class="voice-caller">
		<h1>语音叫号系统</h1>
		<div>
			<label for="serverUrl">服务器地址：</label>
			<input id="serverUrl" v-model="serverUrl" placeholder="" @change="changeUrl" />
		</div>

		<div>
			<label for="rate">语速：</label>
			<select id="rate" v-model.number="rate">
				<option :value="0.5">0.5x</option>
				<option :value="1">1x</option>
				<option :value="1.5">1.5x</option>
				<option :value="2">2x</option>
			</select>
		</div>

		<div>
			<label for="voice">声音：</label>
			<select id="voice" v-model="selectedVoice">
				<option v-for="voice in voices" :key="voice.name" :value="voice.name">
					{{ voice.name }}
				</option>
			</select>
		</div>

		<div>
			<label for="playCount">播放次数：</label>
			<input id="playCount" type="number" v-model.number="playCount" min="1" />
		</div>

		<div>
			<label for="testMessage">测试播放内容：</label>
			<input id="testMessage" v-model="testMessage" placeholder="请输入要播放的内容" />
		</div>

		<button @click="playVoice">播放</button>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import connection from './index'

	// 组件的响应式数据
	const serverUrl = ref<string>('')
	const rate = ref<number>(1)
	const testMessage = ref<string>('')
	const playCount = ref<number>(1)
	const selectedVoice = ref<string>('')

	// 获取可用的声音列表
	const voices = ref<SpeechSynthesisVoice[]>([])
	const getVoices = () => {
		voices.value = speechSynthesis.getVoices()
		console.log('🚀 ~ getVoices ~ speechSynthesis.getVoices():', speechSynthesis.getVoices())
	}

	// 叫号弹窗
	connection.on('CallUser', e => {
		console.log('🚀 ~ connection.on ~ e:', e)
		const formattedCode = e.voiceContent.replace(/([A-Z0-9])/g, '$1 ').replace(/  +/g, ' ')
		const formattedString = formattedCode.replace(/J\d{2}[A-Z]\d{2}/, formattedCode).trim()
		playMsg(formattedString)
	})

	const changeUrl = (e: any) => {
		if (e.target.value.trim()) {
			serverUrl.value = e.target.value
			connection.start().then(res => {
				console.log('连接成功')
			})
		} else {
			alert('请输入服务器地址')
		}
	}
	const playVoice = () => {
		if (!testMessage.value.trim()) {
			alert('请输入测试播放内容')
			return
		}

		if (playCount.value < 1) {
			alert('播放次数必须大于等于 1')
			return
		}
		playMsg(testMessage.value)
	}

	const playMsg = (msg: any) => {
		const utterance = new SpeechSynthesisUtterance(msg)
		utterance.rate = rate.value

		// 设置选择的声音
		const voice = voices.value.find(v => v.name === selectedVoice.value)
		if (voice) {
			utterance.voice = voice
		}

		// 播放指定次数
		for (let i = 0; i < playCount.value; i++) {
			const clonedUtterance = new SpeechSynthesisUtterance(msg)
			clonedUtterance.rate = rate.value
			if (voice) {
				clonedUtterance.voice = voice
			}
			speechSynthesis.speak(clonedUtterance)
		}
	}

	onMounted(() => {
		getVoices()
		speechSynthesis.onvoiceschanged = getVoices
		connection.start().then(res => {
			console.log('连接成功')
		})
	})
</script>

<style scoped>
	.voice-caller {
		max-width: 400px;
		margin: 0 auto;
		padding: 20px;
		border: 1px solid #ddd;
		border-radius: 8px;
		background-color: #f9f9f9;
	}

	.voice-caller h1 {
		font-size: 24px;
		margin-bottom: 20px;
	}

	.voice-caller label {
		display: block;
		margin-bottom: 8px;
	}

	.voice-caller input,
	.voice-caller select {
		width: 100%;
		padding: 8px;
		margin-bottom: 20px;
		border-radius: 4px;
		border: 1px solid #ccc;
	}

	.voice-caller button {
		width: 100%;
		padding: 10px;
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.voice-caller button:hover {
		background-color: #45a049;
	}
</style>
