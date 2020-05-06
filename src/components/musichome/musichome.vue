<template>
	<div class="musichome">
		<search></search>
		<navbar></navbar>
		<lunbo></lunbo>
		<recommendsonglist></recommendsonglist>
	</div>
</template>

<script>
import search from './components/search'
import lunbo from './components/lunbo'
import recommendsonglist from './components/recommendsonglist'
import navbar from './components/nav.vue'
export default{
	name: 'musichome',
	components:{
		search,
		lunbo,
		recommendsonglist,
		navbar,
	},
  methods:{
  }
}
</script>

<style>
.musichome{
	position: relative;
}
</style>
