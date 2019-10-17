<template>
	<div>
		<singerlist></singerlist>
	</div>
</template>

<script>
import singerlist from './components/singerlist.vue'

export default{
	name: 'singer',
	data(){	
		return {
		}
	},
	components:{

		singerlist,

	}
}
</script>

<style>
div{
	padding: 0;
	margin:0;

}
</style>
