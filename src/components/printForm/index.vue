<template>
	<div class="sys-pos-container" v-loading="loading">
		<el-card class="full-table" shadow="hover" style="margin-top: 8px">
			<div class="item_box">
				<div style="flex: 6; overflow: auto">
					<el-divider content-position="left"> 基本信息 </el-divider>
					<el-form label-width="150" label-position="right">
						<el-form-item :label="item.label" v-for="(item, index) in formOption" :key="index" :style="{ 'grid-column': gridColumnHandler(item.widthX) }">
							<template #label>
								<el-tooltip class="box-item" effect="dark" :content="item.label" placement="top">
									<div class="tip_label">
										{{ item.label }}
									</div>
								</el-tooltip>
							</template>
							<component :is="'el-' + item.is" v-on="item.event || {}" v-model="form[item?.prop]" :filterable="item.filterable">
								<tempalet v-if="item.is === 'select'">
									<component :is="'el-option'" v-for="(i, index) in item?.data" :key="index" :label="i.label" :value="i.label"></component>
								</tempalet>
								<tempalet v-if="item.is === 'radio-group'">
									<component :is="'el-radio'" v-for="(i, index) in item?.data" :key="index" :label="i.label" :value="i.label"></component>
								</tempalet>
							</component>
						</el-form-item>
					</el-form>
					<!-- 拍摄行驶证 -->
					<el-divider content-position="left">环保信息</el-divider>
					<el-tabs v-model="dicts" class="demo-tabs">
						<el-tab-pane label="基本信息采集1" name="first">
							<el-form label-width="150" label-position="right">
								<el-form-item :label="item.label" v-for="(item, index) in formOption1" :key="index" :style="{ 'grid-column': gridColumnHandler(item.widthX) }">
									<template #label>
										<el-tooltip class="box-item" effect="dark" :content="item.label" placement="top">
											<div class="tip_label">
												{{ item.label }}
											</div>
										</el-tooltip>
									</template>
									<component :is="'el-' + item.is" v-model="form[item?.prop]">
										<tempalet v-if="item.is === 'select'">
											<component :is="'el-option'" v-for="(i, index) in item.data" :key="index" :label="i.label" :value="i.value || i.label"></component>
										</tempalet>
										<tempalet v-if="item.is === 'radio-group'">
											<component :is="'el-radio'" v-for="(i, index) in item?.data" :key="index" :label="i.label" :value="i.value || i.label"></component>
										</tempalet>
									</component>
								</el-form-item>
							</el-form>
						</el-tab-pane>
						<el-tab-pane label="基本信息采集2" name="second">
							<el-form label-width="150" label-position="right">
								<el-form-item :label="item.label" v-for="(item, index) in formOption2" :key="index" :style="{ 'grid-column': gridColumnHandler(item.widthX) }">
									<template #label>
										<el-tooltip class="box-item" effect="dark" :content="item.label" placement="top">
											<div class="tip_label">
												{{ item.label }}
											</div>
										</el-tooltip>
									</template>
									<component :is="'el-' + item.is" v-model="form[item?.prop]">
										<tempalet v-if="item.is === 'select'">
											<component :is="'el-option'" v-for="(i, index) in item.data" :key="index" :label="i.label" :value="i.label"></component>
										</tempalet>
										<tempalet v-if="item.is === 'radio-group'">
											<component :is="'el-radio'" v-for="(i, index) in item?.data" :key="index" :label="i.label" :value="i.label"></component>
										</tempalet>
									</component>
								</el-form-item>
							</el-form>
						</el-tab-pane>
					</el-tabs>
					<el-checkbox-group v-model="printList">
						<el-checkbox v-for="(item, index) in printData" :key="index" :label="item.name" :value="item.key" />
					</el-checkbox-group>
					<div style="text-align: center">
						<el-button style="width: 40%" type="success" @click="preserve">保存</el-button>
						<el-button style="width: 40%" type="primary" @click="printClick" :disabled="!printList[0]">打印</el-button>
						<el-button style="width: 10%" type="primary" @click="printClick" :disabled="!printList[0]">预览</el-button>
					</div>
				</div>
				<div style="flex: 1; margin-left: 20px; border-left: 2px dashed #8a8a8a; padding-left: 20px; overflow: auto">
					<el-input :suffix-icon="Search" v-model="search" @change="searchChange"></el-input>
					<listConm :hphm="form.cph" v-model="carList" @clickItem="clickItem"></listConm>
				</div>
			</div>
		</el-card>
		<video autoplay ref="video" class="video">
			<controls type="video/webm" />
		</video>
		<canvas ref="canvas" class="canvas"></canvas>
	</div>
</template>

<script setup lang="ts" name="printInfo">
	import { ref, onMounted, nextTick, watch } from 'vue'
	import { getParams, getQrCode, saveParams, getCarList, uploadImage, getSerialNum } from '@/api/printForm'
	import { toDataURL } from 'qrcode'
	import { cllx } from './cllx'
	import { Search } from '@element-plus/icons-vue'
	import { formOption1, formOption2 } from './options'
	import listConm from '@/components/printForm/listConm.vue'
	import { toMessage } from '@/utils/toMessage'

	const height = ref()
	const video = ref<HTMLMediaElement & HTMLVideoElement>()
	const canvas = ref<HTMLCanvasElement>()

	const form = ref<any>({
		cph: '晋',
	})
	let mediaStreamTrack: MediaStream

	const desiredPixels = 3000000 // 目标像素数
	const aspectRatio = 4 / 3 // 宽高比，可以根据需要进行调整

	// 计算宽度和高度
	const width = Math.sqrt(desiredPixels * aspectRatio)
	const heights = width / aspectRatio

	const getTableHeight = () => {
		console.log('开始')
		nextTick(() => {
			const layout = (document.querySelector('.layout-main-scroll') as HTMLDivElement).offsetHeight
			const footer = document.querySelector('.layout-footer') as HTMLDivElement
			const offsetHeight = layout - 110 - (footer?.offsetHeight || 52)
			height.value = offsetHeight + 'px'
			console.log(height.value)
		})
	}

	const dicts = ref('first')
	const printList = ref(['wjb', 'hbwjb', 'hpsjb', 'wts'])
	const carList = ref([])
	const loading = ref(false)
	const search = ref('')
	const formOption: any = [
		{
			label: '号牌号码',
			prop: 'cph',
			is: 'input',
			event: {
				change: async e => {
					form.value.cph = e.toUpperCase()
					loading.value = true
					const res = await getParams({ hphm: e })
					if (res.result) {
						res.result.jyrq = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
						form.value = res.result
						form.value.cph = res.result.cph.toUpperCase()
						form.value.pqggs = 1
						Object.keys(res.result).forEach(i => {
							form.value[i] = res.result[i] || formOption1.find(k => k.prop === i)?.value
						})
					}
					loading.value = false
				},
			},
			// widthX: 0.5,
		},
		{
			label: '号牌类型',
			prop: 'hpzl',
			is: 'select',
			data: [
				{
					label: '大型汽车',
				},
				{
					label: '小型汽车',
				},
				{
					label: '使馆汽车',
				},
				{
					label: '领馆汽车',
				},
				{
					label: '境外汽车',
				},
				{
					label: '外籍汽车',
				},
				{
					label: '两三轮摩托车',
				},
				{
					label: '轻便摩托车',
				},
				{
					label: '使馆摩托车',
				},
				{
					label: '领馆摩托车',
				},
				{
					label: '境外摩托车',
				},
				{
					label: '外籍摩托车',
				},
				{
					label: '低速车',
				},
				{
					label: '拖拉机',
				},
				{
					label: '挂车',
				},
				{
					label: '教练汽车',
				},
				{
					label: '教练摩托车',
				},
				{
					label: '试验汽车',
				},
				{
					label: '试验摩托车',
				},
				{
					label: '临时入境',
				},
				{
					label: '临时入境摩托车',
				},
				{
					label: '临时行驶车',
				},
				{
					label: '警用汽车',
				},
				{
					label: '警用摩托车',
				},
				{
					label: '原农机号牌',
				},
				{
					label: '香港入出境车',
				},
				{
					label: '澳门入出境车',
				},
				{
					label: '武警号牌',
				},
				{
					label: '军队号牌',
				},
				{
					label: '无号牌',
				},
				{
					label: '假号牌',
				},
				{
					label: '挪用号牌',
				},
				{
					label: '大型新能源汽车',
				},
				{
					label: '小型新能源汽车',
				},
				{
					label: '其它车型',
				},
				{
					label: '残疾人专用汽车',
				},
				{
					label: '残疾人专用摩托车',
				},
				{
					label: '哈企消防车',
				},
			],
		},
		{
			label: '识别代号',
			prop: 'vin',
			is: 'input',
		},
		{
			label: '车辆类型',
			prop: 'cllx',
			is: 'select',
			data: cllx,
			filterable: true,
		},
		{
			label: '车辆类别',
			prop: 'cllb',
			is: 'select',
			data: [
				{ label: '小客车' },
				{ label: '小货车' },
				{ label: '两轮轻便摩托车' },
				{ label: '农用四轮' },
				{ label: '农用三轮' },
				{ label: '出租车' },
				{ label: '大客车' },
				{ label: '大货车' },
				{ label: '重型车' },
				{ label: '危险品货车' },
				{ label: '其他车' },
				{ label: '正三轮摩托车' },
				{ label: '偏三轮摩托车' },
				{ label: '两轮摩托车' },
			],
		},

		{
			label: '品牌型号',
			prop: 'ppxh',
			is: 'input',
		},
		{
			label: '四驱',
			prop: 'sfqssq',
			is: 'radio-group',
			data: [{ label: '是' }, { label: '否' }],
		},
		{
			label: '使用性质',
			prop: 'syxz',
			is: 'input',
		},
		{
			label: '所有人',
			prop: 'syrsyr',
			is: 'input',
		},
		{
			label: '出厂日期',
			prop: 'ccrq',
			is: 'input',
		},
		{
			label: '注册日期',
			prop: 'zcrq',
			is: 'input',
		},
		{
			label: '燃油类型',
			prop: 'rl',
			is: 'select',
			data: [
				{ label: '汽油' },
				{ label: '柴油' },
				{ label: '电' },
				{ label: '混合油' },
				{ label: '天然气' },
				{ label: '液化石油气' },
				{ label: '甲醇' },
				{ label: '乙醇' },
				{ label: '太阳能' },
				{ label: '混合动力' },
				{ label: '气天双燃料' },
				{ label: '其他' },
				{ label: '无' },
			],
		},
		{
			label: '总质量',
			prop: 'zzl',
			is: 'input',
		},
		{
			label: '整备质量/kg',
			prop: 'zbzl',
			is: 'input',
		},
		{
			label: '乘员数',
			prop: 'hdzk',
			is: 'input',
		},
		{
			label: '颜色',
			prop: 'color',
			is: 'select',
			data: [{ label: '白' }, { label: '灰' }, { label: '黑' }, { label: '黄' }, { label: '绿' }, { label: '棕' }, { label: '蓝' }, { label: '紫' }, { label: '红' }],
		},
		{
			label: '发动机型号',
			prop: 'fdjxh',
			is: 'input',
		},
		{
			label: '发动机号',
			prop: 'fdjh',
			is: 'input',
		},
		{
			label: '额定功率/kw',
			prop: 'edgl',
			is: 'input',
		},
		{
			label: '转向形式',
			prop: 'zxxs',
			is: 'input',
		},
		{
			label: '轴数',
			prop: 'zs',
			is: 'input',
		},
		{
			label: '排量/L',
			prop: 'pl',
			is: 'input',
		},
		{
			label: '机动车序号',
			prop: 'jdcxh',
			is: 'input',
		},
		{
			label: '环保达标情况',
			prop: 'hbdbqk',
			is: 'input',
		},
	]
	const printData = ref([
		{ name: '外检表', key: 'wjb' },
		{ name: '环保外检表', key: 'hbwjb' },
		{ name: '号牌申请表', key: 'hpsjb' },
		{ name: '委托书', key: 'wts' },
	])

	const preserve = async () => {
		await saveParams({ ...form.value, sjr: form.value.sjr || '-' })
		CarListCongratulations({ hphm: '', kssj: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() })
		toMessage('保存成功')
	}

	const getDate = async () => {
		const date = new Date()
		const year = date.getFullYear()
		let month: string = date.getMonth() + 1 + ''
		let day: string = date.getDate() + ''
		month = +month < 10 ? '0' + month : month
		day = +day < 10 ? '0' + day : day
		const { result }: { result: number } = await getSerialNum()
		if (result) {
			return Number(year + month + day + ('' + result).toString().padStart(3, '0'))
		}
	}

	const printClick = async () => {
		loading.value = true
		await saveParams({ ...form.value, sjr: form.value.sjr || '-' })
		const res = await getQrCode({ hphm: form.value.cph })
		form.value.bh = await getDate()
		if (res.result) {
			toDataURL(res.result, { errorCorrectionLevel: 'L' }, function (err, url) {
				console.log('🚀 ~ url:', url)
				form.value.image = url
			})
		}
		printListOk(printList.value)
		CarListCongratulations({ hphm: '', kssj: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() })
		loading.value = false
	}

	const printListOk = list => {
		fetch(window.__env__.VITE_PRINT_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				data: {
					...form.value,
				},
				templatePaths: list,
			}),
		})
			.then(response => response.json())
			.then(data => console.log('Success:', data))
			.catch(error => console.error('Error:', error))
		CarListCongratulations({ hphm: '', kssj: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() })
	}

	function gridColumnHandler(widthX) {
		if (widthX === -1) return `${widthX} / 1`
		else return `auto / span ${widthX || 1}`
	}

	const searchChange = async e => {
		search.value = e.toUpperCase()
		CarListCongratulations({ hphm: e.toUpperCase(), kssj: '' })
	}

	const clickItem = async (item: any) => {
		loading.value = true
		const res = await getParams({ hphm: item.hphm })
		if (res.result) {
			res.result.jyrq = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
			form.value = res.result
		}
		loading.value = false
	}

	const CarListCongratulations = async ({ hphm, kssj }: any) => {
		// const res = await getCarList({ hphm, kssj })
		// carList.value = res.result
	}

	watch(form.value, (n, l) => {
		if (form.value.scrxh) {
			form.value.scr = '有'
		} else {
			form.value.scr = '无'
		}
		if (form.value.dpfxh) {
			form.value.dpf = '有'
		} else {
			form.value.dpf = '无'
		}
		if (form.value.qdxs === '4×4全时四驱后驻车' || form.value.qdxs === '4×4全驻车') {
			form.value.sfqssq = '是'
		} else {
			form.value.sfqssq = '否'
		}
	})

	onMounted(() => {
		CarListCongratulations('')
		window.addEventListener('resize', getTableHeight)
		;(formOption1 as []).forEach((i: any) => {
			if (i.value) {
				form.value[i.prop] = i.value
			}
		})
	})
</script>

<style scoped>
	:deep(.el-form-item__label) {
		font-weight: 800 !important;
		font-size: 1.5rem !important;
		color: #191ce0 !important;
	}
	:deep(.el-table__inner-wrapper) {
		--heigth-item: v-bind(height);
		height: var(--heigth-item) !important;
	}
	:deep(.el-form) {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}
	:deep(.el-select) {
		width: 100% !important;
	}
	:deep(.el-form-item):last-child {
		margin-bottom: 18px !important;
	}
	:deep(.el-divider__text) {
		font-size: 1.5rem !important;
		font-weight: 800 !important;
	}
	:deep(.el-divider--horizontal) {
		border-top: 2px dashed #8a8a8a;
	}
	:deep(.el-checkbox-group) {
		text-align: center;
	}
	.item_box {
		height: 100%;
		display: flex;
	}
	:deep(.el-checkbox__label) {
		font-size: 1.5rem;
	}
	.video {
		display: none;
	}
	.canvas {
		display: none;
	}
	:deep(.el-select__wrapper) {
		background-color: #e0dd19;
	}
	:deep(.el-input__inner) {
		font-weight: 700;
		font-size: 1.5rem;
	}
	:deep(.el-select__placeholder) {
		font-weight: 700;
		font-size: 1.5rem;
	}
	.tip_label {
		/* 显示一行多的省略号 */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100%;
		text-align: right;
	}
	:deep(.el-tabs__content) {
		overflow: visible;
	}
</style>
