<template>
    <div class="message">
        <div class="message-left">
            <img @click="toUserHome" :src="collection_fabulous.head_img" alt="">
        </div>
        <div class="message-right">
            <div class="nickname">{{collection_fabulous.t_nickname}}
                <span>{{collection_fabulous.type==='collection'?'收藏':'点赞'}}了你的动态</span>
            </div>
            <div class="content-box">
                <p @click="toDynamicDetail" class="content">{{collection_fabulous.title}}</p>
                <p class="time">{{collection_fabulous.create_time}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'collectionMessage',
    props: {
        collection_fabulous: {
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
            this.$router.push({ path: "/dynamic_details", query: { id: this.collection_fabulous.dynamic_id } });
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
            &:hover{
                cursor: pointer;
            }
        }
    }
    &-right{
        width: 100%;
        margin-left: 20px;
        font-size: 14px;
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
                &:hover{
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
            .time{
                color: #aaa;
            }
        }
    }
}
</style>