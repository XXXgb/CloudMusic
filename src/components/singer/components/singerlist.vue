<template>
	<div class="ggg" ref="gg">
		666
	</div>
</template>

<script>
import {singerlistpaihang} from '../../../api/songlist.js'
export default{
	data(){
			return {
				abc: '123'
			}
	},
	methods:{
		async bc(){
			let that = this;
			let promise = new Promise(function(resolve,reject){
				singerlistpaihang(2).then(res => {

				})
				return resolve('1');
			})
			let pp = await promise;
			if(pp == 1){
			}
		}
	},
	mounted(){
		this.bc();
	},
}
</script>

<style>

</style>
