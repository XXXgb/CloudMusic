<template>
  <div class="uesrInfo-box">
    <div class="comments-top-nav">
      <div class="comments-fanhui" @click="back">
        <img src="../../assets/images/back.png">
      </div>
      <div style="width: calc(100% - 35px);">
        <span style="margin-left: calc((100% - 105px) / 2);">个人信息</span>
      </div>
    </div>
  </div>
</template>

<script>




export default{
	name: 'user',
	data(){
		return {

		}
	},
	components:{

	},
	methods:{
    back(){
      history.go(-1);
    },
	}
}
</script>

<style>
  .comments-top-nav{
    position: fixed;
    top: 0;
    width: 100%;
    height: 44px;
    display: flex;
    flex-flow: row wrap;
    align-items:center;
    background-color: #f2f3f4;
    z-index: 9999;
  }
  .comments-fanhui{
    width: 25px;
    height: 25px;
    margin-left: 10px;
  }
  .comments-fanhui img{
    width: 100%;
    height: 100%;
  }
  .comments-top-nav div:nth-child(2){
    color: #000;
  }
  .uesrInfo-box{
    width: 100%;
    height:100%;
    background: url("../../assets/images/low-angle-shot-of-two-green-palm-trees-3560451.jpg");
  }
</style>
