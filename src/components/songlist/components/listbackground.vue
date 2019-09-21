<template>
	<div class="list-box2">
		<div class="list-father">
			<div class="list-bg" :style="note">
				<div class="list-songlistname">
				<h2>{{$store.state.priorityRender.name}}</h2>
			</div>
			</div>
		
		</div>
	</div>
</template>

<script>
export default{
	name: 'listbackground',
	data(){
		return {
			note:{
				backgroundImage: ''
				
			},
		}
	},
	methods:{
		songlistresult(){
			this.note.backgroundImage = 'url(' + this.$store.state.priorityRender.picUrl + ')';
		},
	},
		
	mounted:function(){
    	this.songlistresult();
  	},
}
</script>

<style>

</style>
