<template>
	<div class="list-box2">
		<div class="list-father">
			<div class="list-bg" :style="note">
				<div class="list-songlistname">
				<h2>{{$store.state.priorityRenderSinger.name}}</h2>
			</div>
			</div>
		
		</div>
	</div>
</template>

<script>
export default{
	name: 'singerlistbackground',
	data(){
		return {
			note:{
				backgroundImage: ''
				
			},
		}
	},
	methods:{
		songlistresult(){
			this.note.backgroundImage = 'url(' + this.$store.state.priorityRenderSinger.picUrl + ')';
		},
	},
		
	mounted:function(){
    	this.songlistresult();
  	},
}
</script>

<style>
.list-box2{
	margin: 0;
}
.list-box2 .list-father{
	position: relative;
}
.list-bg{
	background-image: url(../.././../assets/images/109951162913202465.jpg);
	background-size: 100% 300px;
	width:100%;
	height: 300px;
	position: relative;
	top: 0;
	margin: 0;
	padding: 0;
}
.list-songlistname{
	color: #fff;
	position: absolute;
	bottom: 25px;
	left: 10px;
}
.list-songlistname h2{
	font-size: 16px;

}
.list-songlistname p{
	font-size: 11px;
}
</style>
