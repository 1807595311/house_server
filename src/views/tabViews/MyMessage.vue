<template>
  <div class="my-message">
    <div class="box">
      <div class="box-left">
        <Menu @on-select="changeMeun" :active-name="activeName">
          <Menu-item v-for="v in menuList" :key="v.name" :name="v.name">
            <Icon :type="v.icon"></Icon>
            {{ v.title }}
          </Menu-item>
        </Menu>
      </div>
      <div class="box-right">
        <div class="title">{{ this.activeTitle }}</div>
        <div class="msg-box">
          <div v-show="menuList[0].name===activeKey">
            <FollowMessage v-for="v in messageData.follows" :key="v.id" :follows="v"></FollowMessage>
            <div class="empty" v-if="messageData.follows.length == 0">暂无数据</div>
          </div>
          <div v-show="menuList[1].name===activeKey">
            <CollectionMessage v-for="v in messageData.collection" :collection_fabulous="v" :key="v.id"></CollectionMessage>
            <div class="empty" v-if="messageData.collection.length == 0">暂无数据</div>
          </div>
          <div v-show="menuList[2].name===activeKey">
            <CollectionMessage v-for="v in messageData.fabulous" :collection_fabulous="v" :key="v.id"></CollectionMessage>
            <div class="empty" v-if="messageData.fabulous.length == 0">暂无数据</div>
          </div>
          <div v-show="menuList[3].name===activeKey">
            <CommentMessage v-for="v in messageData.comment" :comment="v" :key="v.id"></CommentMessage>
            <div class="empty" v-if="messageData.comment.length == 0">暂无数据</div>
          </div>
          <div v-show="menuList[4].name===activeKey">
            <SystemNotice v-for="v in messageData.systemNotice" :systemNotice="v" :key="v.id"></SystemNotice>
            <div class="empty" v-if="messageData.systemNotice.length == 0">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentMessage from "@/components/message/CommentMessage.vue";
import CollectionMessage from "@/components/message/CollectionMessage.vue";
import FollowMessage from "@/components/message/FollowMessage.vue";
import SystemNotice from "@/components/message/SystemNotice.vue";
const menuList = [
  {
    name: 1,
    title: '新增粉丝',
    icon: 'plus-round'
  },
  {
    name: 2,
    title: '动态收藏',
    icon: 'star'
  },
  {
    name: 3,
    title: '动态点赞',
    icon: 'heart'
  },
  {
    name: 4,
    title: '评论回复',
    icon: 'chatboxes'
  },
  {
    name: 5,
    title: '系统通知',
    icon: 'android-notifications'
  },
];
export default {
  name: 'MyMessage',
  components: {
    CommentMessage,
    CollectionMessage,
    FollowMessage,
    SystemNotice
  },
  data() {
    return {
      menuList: menuList,
      activeName: 1,
      activeKey: 1,
      activeTitle: menuList[0].title,
      messageData: {
        follows: [],
        collection: [],
        fabulous: [],
        comment: [],
        systemNotice: []
      }
    }
  },
  created() {
    this.getMyMessage()
  },
  methods: {
    changeMeun(key) {
      this.activeKey = key;
      this.activeTitle = this.menuList.find(v => v.name === key).title;
    },
    // 获取我的消息
    async getMyMessage(){
      let res = await this.$http.post('/client/my_message');
      this.messageData = res.data.data;
    }
  }
}
</script>

<style lang="scss" scoped>
.my-message {
  height: calc(100vh - 86px);
  .box {
    display: flex;
    &-right {
      padding: 20px;
      box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 5%);
      background: #fff;
      margin-left: 20px;
      width: 100%;
      height: calc(100vh - 100px);
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 0.5em;
        background-color: #d9d9d9;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 0.25em;
        background-color: #b9b9b9;
      }
      .title {
        padding: 10px 0 20px;
        font-size: 16px;
        font-weight: bold;
        border-bottom: 1px solid #eee;
      }
    }
  }
  .empty{
    padding: 20px;
    font-size: 16px;
    text-align: center;
  }
}
</style>