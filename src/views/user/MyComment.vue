<template>
  <div class="comment">
    <HeadBG title="我的评论" :count="count"></HeadBG>
    <div class="d_f sort-box">
      <span class="label">排序方式：</span>
      <Select v-model="sort" style="width:160px;" placeholder="排序方式" class="m_r_40">
        <Option value="desc">评论时间正序</Option>
        <Option value="asc">评论时间倒序</Option>
      </Select>
    </div>
    <div class="box">
      <div class="comment-box" v-for="v in commentList" :key="v.id" @click.prevent="toDynamicDetail(v.dynamic_id)">
        <Comment @refreshComment="getMyComment" :comment="v" :isDelete="true"></Comment>
      </div>
    </div>
    <LoadingMore :count="count" :listLength="commentList.length" @nextPage="currentPage+=1"></LoadingMore>
  </div>
</template>

<script>
import HeadBG from "@/components/HeadBG.vue";
import Comment from "@/components/Comment.vue";
import LoadingMore from "@/components/LoadingMore.vue";
export default {
  name: 'MyComment',
  components: {
    HeadBG,
    Comment,
    LoadingMore
  },
  data() {
    return {
      commentList: [],
      sort: 'desc',
      currentPage: 1,
      count: 0
    }
  },
  created() {
    this.getMyComment();
  },
  watch: {
    sort() {
      this.commentList = []
      this.getMyComment()
    },
    currentPage() {
      this.getMyComment()
    }
  },
  methods: {
    async getMyComment() {
      try {
        let res = await this.$http.post('/client/my_comment', { sort: this.sort, currentPage: this.currentPage });
        let data = res.data.data;
        data.forEach(v => this.commentList.push(v));
        this.count = res.data.count;
      } catch (err) { }
    },
    toDynamicDetail(id) {
      this.$router.push({ path: "/dynamic_details", query: { id, open: true } });
    },
  }
}
</script>

<style lang="scss" scoped>
.comment {
  .sort-box {
    width: 1250px;
    padding: 20px;
    margin: auto;
  }
  .box {
    margin: auto;
    width: 1200px;
    background: #fff;
    padding-top: 20px;
    .comment-box:hover {
      cursor: pointer;
    }
  }
  .scroll {
    margin: auto;
    padding: 40px 0;
    font-size: 20px;
    text-align: center;
  }
}
</style>