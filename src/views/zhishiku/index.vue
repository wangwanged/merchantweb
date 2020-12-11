<template>
	<div class="page">
		<div class="left">
			<span>应用产品</span>
			<div>
				<div>
					<img src="" alt="">
					<div class="right">
						<div class="top">
							<span>区域加盟</span>
							<span class="xiazai">下载</span>
						</div>
						<div class="down">jdrhgjdfhgj</div>
					</div>
				</div>
				<div>
					<img src="" alt="">
					<div class="right">
						<div class="top">
							<span>单店加盟</span>
							<span>下载</span>
						</div>
						<div class="down">jdrhgjdfhgj</div>
					</div>
				</div>
			</div>
		</div>
		<div class="right">
			<span>合同模板</span>
			<div>
				<div>
					<img src="" alt="">
					<span>ddfjgdfljghdgh</span>
					<span class="xiazai">下载</span>
				</div>
				<div>
					<img src="" alt="">
					<span>ddfjgdfljghdgh</span>
					<span>下载</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="less" scoped>
	div {
		line-height: 1;
		box-sizing: border-box;
	}
	.xiazai {
		color:#FFBF2A;
	}
	.page {
		display: flex;
		background-color: #f4f5f7;
		width:100vw;
		height:100vh;
		>div {
			    padding: 0 20px;
			    background: #fff;
		}
		>.left,>.right {
			margin:20px;
			flex:1;
			// height:500px;
			overflow: scroll;
			display: flex;
			flex-direction: column;
			&::-webkit-scrollbar {
				display: none;
			}
			>span {
				background-color: #fff;
				display: flex;
				font-size:20px;
				width:100px;
				justify-content: center;
				align-items: center;
				padding:10px 0;
				border-top:5px solid #FFBF2A;
			}
			>div {
				>div {
					background-color: #fff;
					display: flex;
					border-bottom:1px solid #ccc;
					width:100%;
					padding: 20px 0;
					img {
						width:100px;
						height:100px;
					}
					.right {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						height:100px;
						    padding: 20px;
						.top {
							span:nth-child(1){
								font-size:20px;
								font-weight:bold;
							}
							span:last-child {
								font-size:15px;
								margin-left:30px;
							}
						}
						.down {
							word-break: break-all;
							font-size:15px;
						}
					}
				}
				>div:last-child {
					border-bottom:none;
				}
			}
		}
		>.right {
			display: flex;
			width:100%;
			>div>div {
				border-bottom:1px solid #ccc;
			}
			img {
				width:30px !important;
				height:30px !important;
			}
			span:nth-child(2){
				margin:0 20px 0 30px;
				width:300px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			
		}
	}
</style>
