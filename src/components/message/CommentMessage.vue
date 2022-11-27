<template>
    <div class="message">
        <div class="message-left">
            <img @click="toUserHome" :src="comment.head_img" alt="">
        </div>
        <div class="message-right" @click="toDynamicDetail">
            <div class="nickname">{{comment.nickname}}
                <span>回复了你的评论</span>
            </div>
            <div class="content-box">
                <p class="content">回复内容</p>
                <p class="time">{{comment.create_time}}</p>
            </div>
            <div class="dynamic">{{comment.content}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'commentMessage',
    props: {
        comment: {
            type: Object
        }
    },
    methods: {
        toUserHome(){
            this.$router.push(
                {
                    path: '/user_home', 
                    query: {
                        account_number: this.collection_fabulous.account_number
                    }
                }
            )
        },
        toDynamicDetail(){
            this.$router.push({ path: "/dynamic_details", query: { id: this.comment.dynamic_id,open:true } });
        }
    }
}
</script>

<style lang="scss" scoped>
.message{
    width: 100%;
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    &-left{
        img{
            padding: 1px;
            border: 1px solid #ddd;
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    &-right{
        width: 100%;
        margin-left: 20px;
        font-size: 14px;
        &:hover{
            cursor: pointer;
        }
        .nickname{
            span{
                margin-left: 10px;
                color: #aaa;
            }
        }
        .content-box{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            .content{
                font-weight: bold;
            }
            .time{
                color: #aaa;
            }
        }
    }
}
</style>