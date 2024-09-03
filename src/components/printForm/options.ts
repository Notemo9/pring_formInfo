import { reactive } from 'vue';
export const formOption1: any = reactive([
	{
		label: '检验方法',
		prop: 'jyff',
		is: 'select',
		data: [
			{ label: '稳态工况法', value: '稳态工况法' },
			{ label: '双怠速法', value: '双怠速法' },
			{ label: '加载减速法', value: '加载减速法' },
			{ label: '自由加速法', value: '自由加速法' },
			{ label: '简易瞬态工况法', value: '简易瞬态工况法' },
			{ label: '无', value: '无' },
		],
		value: '稳态工况法',
	},
	{
		label: '检验类别',
		prop: 'jclb',
		is: 'select',
		data: [
			{ label: '注册登记检验', value: '注册登记检验' },
			{ label: '在用车检验', value: '在用车检验' },
			{ label: '临时检验', value: '临时检验' },
		],
		value: '在用车检验',
	},
	{
		label: '车牌颜色',
		prop: 'cpys',
		is: 'select',
		data: [
			{ label: '蓝色', value: '蓝色' },
			{ label: '黄色', value: '黄色' },
			{ label: '白色', value: '白色' },
			{ label: '绿色', value: '绿色' },
			{ label: '黑色', value: '黑色' },
		],
		value: '黄色',
	},
	{
		label: '悬架方式',
		prop: 'xjxs',
		is: 'select',
		data: [
			{
				label: '独立悬架',
			},
			{
				label: '非独立悬架',
			},
		],
		value: '非独立悬架',
	},
	{
		label: '燃油型式',
		prop: 'gyfs',
		is: 'select',
		data: [
			{ label: '闭环电喷', value: '闭环电喷' },
			{ label: '开环电喷', value: '开环电喷' },
			{ label: '化油器', value: '化油器' },
			{ label: '喷油泵', value: '喷油泵' },
			{ label: '高压共轨', value: '高压共轨' },
			{ label: '直列喷', value: '直列喷' },
			{ label: '泵喷嘴', value: '泵喷嘴' },
		],
		value: '闭环电喷',
	},
	{
		label: '变速器型式',
		prop: 'bsx',
		is: 'select',
		data: [
			{ label: '手动', value: '手动' },
			{ label: '自动', value: '自动' },
			{ label: '手自一体', value: '手自一体' },
			{ label: '无', value: '无' },
		],
		value: '手动',
	},
	{
		label: '前照灯',
		prop: 'qzd',
		is: 'select',
		data: [{ label: '一灯制' }, { label: '两灯制' }, { label: '四灯制' }],
		value: '两灯制',
	},
	{
		label: '驱动方式',
		prop: 'qdxs',
		is: 'select',
		data: [
			{
				label: '4×2后驱后驻车',
			},
			{
				label: '4×2前驱后驻车',
			},
			{
				label: '4×2前驱前驻车',
			},
			{
				label: '4×4全驱后驻车',
				Value: '04',
				ExtAttr: null,
			},
			{
				label: '4×4全连驱后驻车',
			},
			{
				label: '4×4全时四驱后驻车',
			},
			{
				label: '6×2单后驱单后驻车',
			},
			{
				label: '6×2双后浮动桥中驻车',
				Value: '08',
				ExtAttr: null,
			},
			{
				label: '6×4双后驱双后驻车',
			},
			{
				label: '6×4双后连驱双后驻车',
			},
			{
				label: '6×6全连驱双后驻车',
			},
			{
				label: '8×4双后驱双后驻车',
			},
			{
				label: '10×6三后驱三后驻车',
			},
			{
				label: '6×2中驱中驻车半挂',
			},
			{
				label: '8×2中驱中驻车半挂',
			},
			{
				label: '8×4双中驱双中驻车半挂',
			},
			{
				label: '10×2中驱中驻车半挂',
			},
			{
				label: '10×4双中驱双中驻车半挂',
			},
			{
				label: '12×4双中驱双中驻车半挂',
			},
			{
				label: '10×4双后驱双后驻车',
			},
			{
				label: '8×2后驱后驻车全挂',
			},
			{
				label: '2×1无驱后驻车全挂',
			},
			{
				label: '4×4全驻车',
			},
			{
				label: '6×6全驻车',
			},
		],
		value: '6x4双后驱',
	},

	{
		label: '制动方式',
		prop: 'zdfs',
		is: 'select',
		data: [{ label: '液压制动' }, { label: '气压制动' }, { label: '其他' }],
		value: '气压制动',
	},
	{
		label: '进气方式',
		prop: 'jqfs',
		is: 'select',
		data: [{ label: '涡轮增压中冷' }, { label: '自然吸气' }, { label: '涡轮增压' }, { label: '机械增压' }],
		value: '涡轮增压',
	},
	{
		label: '联系电话',
		prop: 'phone1',
		is: 'input',
	},
	{
		label: '里程表读数',
		prop: 'lcbds',
		is: 'input',
	},
	{
		label: '催化器型号',
		prop: 'sychqxh',
		is: 'select',
		data: [{ label: '三元催化' }, { label: 'DPF' }, { label: 'SCR' }, { label: 'DOC' }, { label: 'POC' }, { label: '其他' }],
		value: '三元催化',
	},
	{
		label: '电子手刹',
		prop: 'dzss',
		is: 'radio-group',
		data: [{ label: '是' }, { label: '否' }],
		value: '否',
	},
	{
		label: '空气悬架',
		prop: 'kqxj',
		is: 'radio-group',
		data: [{ label: '是' }, { label: '否' }],
		value: '否',
	},
	{
		label: '气缸数',
		prop: 'qgs',
		is: 'input',
		value: '6',
	},
	{
		label: '额定转速',
		prop: 'edzs',
		is: 'input',
	},
	{
		label: '排放标准',
		prop: 'pfbz',
		is: 'input',
	},
	{
		label: '电喷方式',
		prop: 'dpfs',
		is: 'radio-group',
		data: [
			{ label: '多', value: '多点电喷' },
			{ label: '单', value: '单点电喷' },
		],
		value: '多点电喷',
	},
	{
		label: '道路运输证号',
		prop: 'dlyszh',
		is: 'input',
	},
	{
		label: 'SCR',
		prop: 'scr',
		is: 'radio-group',
		data: [{ label: '有' }, { label: '无' }],
		value: '无',
	},
	{
		label: 'SCR型号',
		prop: 'scrxh',
		is: 'input',
	},
	{
		label: 'DPF',
		prop: 'dpf',
		is: 'radio-group',
		data: [{ label: '有' }, { label: '无' }],
		value: '无',
	},
	{
		label: 'DPF型号',
		prop: 'dpfxh',
		is: 'input',
	},
	{
		label: '三元催化型号',
		prop: 'sychxh',
		is: 'input',
		value: '信息不可见',
	},
	{
		label: 'OBD',
		prop: 'obd',
		is: 'radio-group',
		data: [{ label: '有' }, { label: '无' }],
		value: '无',
	},
	{
		label: 'EGR',
		prop: 'egr',
		is: 'radio-group',
		data: [{ label: '有' }, { label: '无' }],
		value: '无',
	},
	{
		label: '电控高压油泵',
		prop: 'dkgyyb',
		is: 'radio-group',
		data: [{ label: '是' }, { label: '否' }],
		value: '无',
	},
	{
		label: '燃油蒸发装置',
		prop: 'ryzfzz',
		is: 'radio-group',
		data: [{ label: '有' }, { label: '无' }],
		value: '无',
	},
	{
		label: '地址',
		prop: 'dz',
		is: 'input',
		value: '山西省太原市',
	},
]);

export const formOption2: any = reactive([
	{
		label: '排气管管数',
		prop: 'pqggs',
		is: 'select',
		data: [{ label: 1 }, { label: 2 }, { label: 4 }],
	},
	{
		label: '电池容量',
		prop: 'dcrl',
		is: 'input',
	},

	{
		label: '生产企业',
		prop: 'scqy',
		is: 'input',
	},
	{
		label: '储能装置型号',
		prop: 'cnzzxh',
		is: 'input',
	},
	{
		label: '代理人',
		prop: 'dlr',
		is: 'input',
	},
	{
		label: '检验日期',
		prop: 'jyrq',
		is: 'input',
	},
	{
		label: '邮编',
		prop: 'yb',
		is: 'input',
	},
	{
		label: '送检人',
		prop: 'sjr',
		is: 'input',
	},
	{
		label: '送检人电话',
		prop: 'phone2',
		is: 'input',
	},
	{
		label: '前轴数',
		prop: 'qzs',
		is: 'input',
	},
	{
		label: '制动力源',
		prop: 'zdly',
		is: 'select',
		data: [{ label: '液压制动' }, { label: '气压制动' }, { label: '其他' }],
	},
]);
