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
    <div style="width: 100%;position: relative;display: flex;justify-content: center;align-items: center;padding-top: 50px;margin-top: 20px;">
      <Avatar icon="ios-person" src="../../../static/109951162913202465.jpg" size="100" style="position: absolute;z-index:1;top: 0px;"/>
      <Card style="width:280px;" shadow>
        <div style="text-align:center;margin: 40px 0 20px 0;">
          <h3>{{userInfo.nickName | userInfoFormat}}</h3>
          <h5 style="color: #ccc;">加入时间：{{userInfo.addTime}}</h5>
        </div>
        <div v-if="!editStatus">
          <Form ref="formValidate" :label-width="60" label-position="left">
            <FormItem label="生日:">
              <h3>{{userInfo.brithday | userInfoFormat}}</h3>
            </FormItem>
            <FormItem label="性别:">
              <h3>{{userInfo.sex | sexFormat}}</h3>
            </FormItem>
            <FormItem label="手机号:">
              <h3>{{userInfo.phoneNumber | userInfoFormat}}</h3>
            </FormItem>
            <FormItem label="邮箱:">
              <h3>{{userInfo.email | userInfoFormat}}</h3>
            </FormItem>
          </Form>
          <Button type="primary" style="width:100%;" @click.native="changeUesrInfo()">修改资料</Button>
        </div>
        <div v-if="editStatus">
          <Form :label-width="60" label-position="left">
            <FormItem label="昵称:">
              <Input v-model="editUserInfo.nickName"></Input>
            </FormItem>
            <FormItem label="生日:">
              <DatePicker format="yyyy-MM-dd" :editable="false" type="date" placeholder="选择你的生日" style="width: 100%;" v-model="editUserInfo.brithday"></DatePicker>
            </FormItem>
            <FormItem label="性别:">
              <Select style="width:100%;" v-model="editUserInfo.sex">
                <Option value="1">男</Option>
                <Option value="0">女</Option>
                <Option value="2">我也不清楚</Option>
              </Select>
            </FormItem>
            <FormItem label="手机号:">
              <Input placeholder="Enter your name" v-model="editUserInfo.phoneNumber"></Input>
            </FormItem>
            <FormItem label="邮箱:">
              <Input placeholder="Enter your name" v-model="editUserInfo.email"></Input>
            </FormItem>
          </Form>
          <Row :gutter="colSpace">
            <Col span="12"><Button type="primary" style="width:100%;" @click.native="saveChange()">保存修改</Button></Col>
            <Col span="12"><Button type="dashed" style="width:100%;" @click.native="cancelChange()">取消</Button></Col>
          </Row>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import { getUserInfo , changeSelfInfo} from '../../api/user.js'
  import util from '../../util/util.js'
export default{
	name: 'user',
	data(){
		return {
      editStatus: false,
      userInfo: {},
      colSpace: 5,
      editUserInfo: {}
		}
	},
	components:{

	},

  filters:{
    userInfoFormat:function(data){
      let result = '';
      if(data == null || data == '' || data == undefined){
        result = '未填写'
      }else{
        result = data;
      }
      return result;
    },

    sexFormat: function (data) {
      let result = '';
      if(data == null || data == '' || data == undefined){
        result = '未填写'
      }else if(data == 1){
        result = '男';
      }else if(data == 0){
        result = '女';
      }else if(data == 2){
        result = '我也不清楚'
      }
      return result;
    }
  },

  mounted(){
	  this.getUserInfo();
  },

	methods:{
    back(){
      history.go(-1);
    },


    //点击修改资料按钮
    changeUesrInfo(){
      this.editStatus = true;
      this.editUserInfo = util.pxdeepCopy(this.userInfo);
    },


    //点击保存修改按钮
    saveChange(){
      this.changeSelfInfo();
    },

    //点击取消修改按钮
    cancelChange(){
      this.editStatus = false;
    },


    //获取个人信息
    getUserInfo(){
      let _id = JSON.parse(window.sessionStorage.getItem('token'))._id;
      getUserInfo(_id).then( res => {
        this.userInfo = res.data;
        console.log(res)
      }).catch( err => {

      })
    },

    //保存修改
    changeSelfInfo(){
      let params = {
        _id: JSON.parse(window.sessionStorage.getItem('token'))._id,
        nickName: this.editUserInfo.nickName,
        brithday: util.dateFormater('YYYY-MM-DD',this.editUserInfo.brithday),
        sex: this.editUserInfo.sex,
        phoneNumber: this.editUserInfo.phoneNumber,
        email: this.editUserInfo.email,
      };
      changeSelfInfo(params).then( res => {
        if( res.data.err == 0 ){
          this.$Message.success = res.data.msg;
          this.editStatus = false;
          this.getUserInfo();
        }else {
          this.$Message.success = res.data.msg;
        }
      }).catch( err => {
        this.$Message.success = err;
      })
    }

	}
}
</script>

<style>
  .comments-top-nav{
    width: 100%;
    height: 44px;
    display: flex;
    flex-flow: row wrap;
    align-items:center;
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
    background-image: url('../../assets/images/sky-2540302_1920.jpg');
    background-size: cover;
  }
  .ivu-form-item{
  }
</style>
