<template>
    <div class="comment">
        <HeadBG title="我的评论"></HeadBG>
        <div class="box">
            <div class="comment-box" v-for="v in commentList" :key="v.id" @click.prevent="toDynamicDetail(v.dynamic_id)">
                <Comment @refreshComment="getMyComment" :comment="v" :isDelete="true"></Comment>
            </div>
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
        toDynamicDetail(id){
            this.$router.push({ path: "/dynamic_details", query: { id,open:true } });
        }
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
        .comment-box:hover{
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