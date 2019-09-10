<template>
	<div>
		<searchinput></searchinput>
		<hotsearch></hotsearch>
	</div>
</template>

<script>
import searchinput from './components/searchinput'
import hotsearch from './components/hotsearch'
export default{
	name: 'gosearch',
	components:{
		searchinput,
		hotsearch
	}
}
</script>

<style>

</style>
