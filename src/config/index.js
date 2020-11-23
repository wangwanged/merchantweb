export default {
	imgBaseUrl: "https://img.sosozhaofang.com/",
	informationUrl: "https://www.sosozhaofang.com",
	// informationUrl: "http://localhost:8080",
	/**
	 * @description 配置显示在浏览器标签的title
	 */
	title: "嗖嗖后台",
	/**
	 * @description 默认打开的首页的路由name值，默认为home
	 */
	homeName: "home",
	/**
	 * @description 需要加载的插件
	 */
	plugin: {
		"error-store": {
			showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
			developmentOff: true, // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
		},
	},
};
