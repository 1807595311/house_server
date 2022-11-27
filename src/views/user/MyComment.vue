<template>
    <div class="comment">
        <HeadBG title="我的评论"></HeadBG>
        <div class="box">
            <Comment @refreshComment="getMyComment" v-for="v in commentList" :key="v.id" :comment="v" :isDelete="true"></Comment>
        </div>
        <div class="scroll">已加载全部</div>
    </div>
</template>

<script>
import HeadBG from "@/components/HeadBG.vue";
import Comment from "@/components/Comment.vue";
export default {
    name: 'MyComment',
    components: {
        HeadBG,
        Comment
    },
    data(){
        return {
            commentList: []
        }
    },
    created() {
        this.getMyComment();
    },
    methods: {
        async getMyComment(){
            try{
                let res = await this.$http.post('/client/my_comment');
                this.commentList = res.data.data;
            }catch(err){}
        },
    }
}
</script>

<style lang="scss" scoped>
.comment{
    .box{
        margin: auto;
        width: 1200px;
        background: #fff;
        padding-top: 20px;
    }
    .scroll {
      margin: auto;
      padding: 40px 0;
      font-size: 20px;
      text-align: center;
    }
}
</style>