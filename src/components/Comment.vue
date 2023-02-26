<template>
  <div class="comment">
    <div class="left-box">
      <img @click="toUserHome(comment)" :src="comment.head_img" alt="" />
    </div>
    <div class="right-box">
      <div class="comment-top">
        <div>
          <a>{{comment.f_nickname}}</a>
          <span class="comment-author" v-if="author == comment.account_number">作者</span>
          <span class="comment-self" v-else-if="loginAccount == comment.account_number">自己</span>
          <strong> </strong>
          <span>{{comment.create_time}}</span>
        </div>
        <div class="reply" v-if="!isDelete">
          <span v-if="selfCommentDelete" @click="deleteComment(comment.id)" class="m_r_10 com_btn">删除</span>
          <span @click="replys(comment)" class="com_btn">{{inputReplays ? '收起': '回复'}}</span>
        </div>
        <div class="reply" v-if="isDelete" @click="deleteComment(comment.id)">删除</div>
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
                <img @click="toUserHome(v)" :src="v.head_img" alt="" />
            </div>
            <span>
                {{v.f_nickname}}
                <span class="comment-author" v-if="author == v.account_number">作者</span>
                <span class="comment-self" v-else-if="loginAccount == v.account_number">自己</span>
                <span class="span-reply">回复</span>
                {{v.t_nickname}}
                <span class="comment-author" v-if="author == v.to_account_number">作者</span>
                <span class="comment-self" v-else-if="loginAccount == v.to_account_number">自己</span>
            </span>
            <strong> </strong>
            <span>{{v.create_time}}</span>
            </div>
            <div class="reply">
              <span v-if="v.account_number === loginAccount" @click="deleteComment(v.id)" class="m_r_10 com_btn">删除</span>
              <span class="com_btn" @click="reply(v)">{{inputReplay && replyId==v.id ? '收起': '回复'}}</span>
            </div>
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
import { replace, filtion } from "verification-sensitive";
export default {
  name: 'Comment',
  props: {
    comment:{
      type: Object
    },
    author: {
      type: String
    },
    isDelete:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputReplay: false,
      inputReplays: false,
      replyId: null,
      replyInfo: {},
      replyContent: '',
      loginAccount: this.$store.state.userInfo.account_number
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
  computed: {
    selfCommentDelete(){
      return this.loginAccount === this.comment.account_number
    }
  },
  methods: {
    // 回复评论
    async sendReply(){
      if(this.replyContent == '') return this.$Message.error('请输入内容后再发送...');
      if(filtion(this.replyContent)) return this.$Message.error('评论存在敏感词...');
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
    },
     deleteComment(id){
      this.$Modal.confirm({
          title: '删除体提醒',
          content: '确定要删除该评论吗？',
          onOk: () => {
            try{
              this.$http.post('/client/delete_comment',{id}).then(res=>{
                this.$emit('refreshComment');
              })
            }catch(err){}
          }
      });
    },
    // 通过评论跳转用户主页
    toUserHome(v){
      let account_number = v.account_number;
      if(account_number != this.loginAccount){
        this.$router.push({path:'/user_home',query: {account_number} });
      }
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
  &-self,&-author{
    margin-left: 5px;
    padding: 2px 4px;
    color: #e95739 !important;
    background: #FFEEEA;
  }
  span{
    color: #999;
  }
  .left-box {
    &:hover{
      cursor: pointer;
    }
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