<template>
	<div>
		<search></search>
		<navbar></navbar>
		<getpaihang></getpaihang>
	</div>
</template>

<script>
import search from '../musichome/components/search.vue'
import navbar from '../musichome/components/nav.vue'
import getpaihang from './components/getpaihang.vue'
export default{
	name: 'paihang',
	components:{
		search,
		navbar,
		getpaihang
	},
}
</script>

<style>

</style>
