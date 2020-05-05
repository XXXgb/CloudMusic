<template>
	<div>
		<topnav></topnav>
		<listbackground></listbackground>
		<listbody></listbody>
	</div>
</template>

<script>
import topnav from './components/top-nav.vue'
import listbody from './components/list.vue'
import listbackground from './components/listbackground.vue'

export default{
	name: 'songlist',
	data(){
		return {
		}
	},
	components:{
		topnav,
		listbody,
		listbackground
	},
	methods:{
		//当页面滚动时，top-nav组件的透明度从0逐渐增加到1
		changeOpcity(){
			//获取滚动条距离顶部的距离
      //微信浏览器无法监听到document.documentElement.scrollTop获取到的文档高度，后两种微信浏览器都能获取到
      //以下写法兼容了所有浏览器文档高度的监听
			let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      let opcityValue;
			//当滚动条向下滚动时，计算透明度变化值，到滚动到距离顶部200的位置，透明度到达1，此时透明度不会再变化
      if(scrollTop <= 200){
        opcityValue = scrollTop/200;
      }else if(scrollTop >= 200){
        opcityValue = 1;
      }
			let flag = true;
			try{
				if(opcityValue>=0&&opcityValue<=1){
					document.querySelector('.list-top-nav').style.background = "rgba(212, 68, 57, "+ opcityValue +") none repeat scroll 0% 0%";
					flag = true;
				}else if(opcityValue<0&&flag==true){
					document.querySelector('.list-top-nav').style.background = "rgba(212, 68, 57, 0) none repeat scroll 0% 0%";
					flag = false;
				}else if(opcityValue>1&&flag==true){
					document.querySelector('.list-top-nav').style.background = "rgba(212, 68, 57, 1) none repeat scroll 0% 0%";
					flag = false;
				}
			}
			catch(err){

			}

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
