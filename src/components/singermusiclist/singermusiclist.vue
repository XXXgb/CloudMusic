<template>
	<div>
		<singertopnav></singertopnav>
		<singerlistbackground></singerlistbackground>
		<singerlist></singerlist>
	</div>
</template>

<script>
import singertopnav from './components/singer-top-nav.vue'
import singerlist from './components/singerlist.vue'
import singerlistbackground from './components/singerlistbackground.vue'

export default{
	name: 'songlist',
	data(){	
		return {
		}
	},
	components:{
		singertopnav,
		singerlist,
		singerlistbackground
	},
	methods:{
		//当页面滚动时，top-nav组件的透明度从0逐渐增加到1
		changeOpcity(){
			//获取滚动条距离顶部的距离
			let scrollTop = document.documentElement.scrollTop;
			//当滚动条向下滚动时，计算透明度变化值，到滚动到距离顶部200的位置，透明度到达1，此时透明度不会再变化
			let opcityValue = scrollTop/200;
			let flag = true;
			try{
				if(opcityValue>=0&&opcityValue<=1){
					document.querySelector('.singer-top-nav').style.background = "rgba(212, 68, 57, "+ opcityValue +") none repeat scroll 0% 0%";
					flag = true;
				}else if(opcityValue<0&&flag==true){
					document.querySelector('.singer-top-nav').style.background = "rgba(212, 68, 57, 0) none repeat scroll 0% 0%";
					flag = false;
				}else if(opcityValue>1&&flag==true){
					document.querySelector('.singer-top-nav').style.background = "rgba(212, 68, 57, 1) none repeat scroll 0% 0%";
					flag = false;
				}
			}
			catch(err){
				
			}
			
			// background: rgba(212, 68, 57, 0) none repeat scroll 0% 0%
		},
	},
	mounted:function(){
		//当页面滚动时，触发changeOpcity事件
		window.addEventListener("scroll",this.changeOpcity);
	}
}
</script>

<style>
div{
	padding: 0;
	margin:0;

}
</style>
