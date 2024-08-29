import * as SignalR from '@microsoft/signalr'
// 初始化SignalR对象
const connection = new SignalR.HubConnectionBuilder()
	.configureLogging(SignalR.LogLevel.Information)
	.withUrl(`ws://14.181.85.2:6999/hubs/ScreenCall`, { transport: SignalR.HttpTransportType.WebSockets, skipNegotiation: true })
	.withAutomaticReconnect({
		nextRetryDelayInMilliseconds: () => {
			return 5000 // 每5秒重连一次
		},
	})
	.build()

connection.keepAliveIntervalInMilliseconds = 15 * 1000 // 心跳检测15s
connection.serverTimeoutInMilliseconds = 30 * 60 * 1000 // 超时时间30m

// // 启动连接
// connection.start().then(() => {
// 	console.log('启动连接');
// });
// // 断开连接
// connection.onclose(async () => {
// 	console.log('断开连接');
// });
// 重连成功
connection.onreconnected(() => {
	console.log('重连成功')
})

connection.on('OnlineUserList', () => {})

export default connection
