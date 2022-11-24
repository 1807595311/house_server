<template>
  <div class="comment">
    <div class="left-box">
      <img :src="comment.head_img" alt="" />
    </div>
    <div class="right-box">
      <div class="comment-top">
        <div>
          <a>{{comment.f_nickname}}</a>
          <strong> </strong>
          <span>{{comment.create_time}}</span>
        </div>
        <div class="reply" @click="replys(comment)">{{inputReplays ? '收起': '回复'}}</div>
      </div>
      <div class="comment-content">{{comment.content}}</div>
      <Input v-model="replyContent" type="textarea" v-show="inputReplays" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入回复内容（限50字）"></Input>
      <div v-show="inputReplays" class="reply-btn">
        <Button type="primary" @click="sendReply">回复</Button>
      </div>
      <!-- 是否有回复 -->
      <div v-for="v in comment.children" :key="v.id">
        <div class="comment-top comment-top-reply">
            <div class="comment-reply">
            <div class="left-box">
                <img :src="v.head_img" alt="" />
            </div>
            <span>
                {{v.f_nickname}}
                <span class="span-reply">回复</span>
                {{v.t_nickname}}
            </span>
            <strong> </strong>
            <span>{{v.create_time}}</span>
            </div>
            <div class="reply" @click="reply(v)">{{inputReplay && replyId==v.id ? '收起': '回复'}}</div>
        </div>
        <div class="comment-content">{{v.content}}</div>
        <Input type="textarea" v-model="replyContent" v-show="inputReplay && replyId==v.id" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入回复内容（限50字）"></Input>
        <div v-show="inputReplay && replyId==v.id" class="reply-btn">
        <Button type="primary" @click="sendReply">回复</Button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    comment:{
      type: Object
    }
  },
  data() {
    return {
      inputReplay: false,
      inputReplays: false,
      replyId: null,
      replyInfo: {},
      replyContent: ''
    }
  },
  watch: {
    inputReplay(newVal){
      if(newVal === false){
        this.replyContent = '';
      }
    },
    inputReplays(newVal){
      if(newVal === false){
        this.replyContent = '';
      }
    },
  },
  methods: {
    // 回复评论
    async sendReply(){
      if(this.replyContent == '') return this.$Message.error('请输入内容后再发送...');
      try{
        this.replyInfo = {...this.replyInfo, content: this.replyContent};
        let res = await this.$http.post('/client/dynamic_comment_reply',this.replyInfo);
        if(res.data.status === 0){
          // 由于组件多层嵌套，无法使用$parent调用刷新评论方法，从而使用$emit
          this.$emit('refreshComment');
          this.replyContent = '';
          this.inputReplay = false;
          this.inputReplays = false;
        }
      }catch(err){}
    },
    // 回复楼主
    replys(v){
      this.replyInfo = {
        dynamic_id: v.dynamic_id,
        account_number: this.$store.state.userInfo.account_number,
        a_id: v.id,
        p_id: v.id,
        to_account_number: v.account_number
      }
      this.inputReplays = !this.inputReplays;
    },
    // 回复层主
    reply(v){
      this.replyInfo = {
        dynamic_id: v.dynamic_id,
        account_number: this.$store.state.userInfo.account_number,
        a_id: v.a_id,
        p_id: v.p_id,
        to_account_number: v.account_number
      }
      this.replyId = v.id;
      this.inputReplay = !this.inputReplay;
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  span{
    color: #999;
  }
  .left-box {
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  .right-box {
    width: 100%;
    margin-left: 15px;
    .reply-btn{
      padding: 10px 0;
      display: flex;
      justify-content: flex-end;
    }
    .comment-top {
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &-reply{
        padding-top: 10px;
      }
      strong {
        display: inline-block;
        width: 10px;
      }
      .reply{
        margin-left: 10px;
        color: #21abeb;
      }
      .reply:hover {
        cursor: pointer;
      }
      .span-reply {
        padding: 0 5px;
      }
      .comment-reply {
        display: flex;
        .left-box {
          margin-right: 10px;
        }
      }
    }
    .comment-content {
        width: 460px;
        padding: 5px;
    }
  }
}
</style>