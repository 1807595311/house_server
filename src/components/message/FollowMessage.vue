<template>
    <div class="message">
        <div class="message-left">
            <img @click="toUserHome" :src="follows.head_img" alt="">
        </div>
        <div class="message-right">
            <div class="nickname">{{follows.u_nickname}}</div>
            <div class="content-box">
                <p>{{follows.create_time}} 关注了你</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'followMessage',
    props: {
        follows: {
            type: Object
        }
    },
    methods: {
        toUserHome(){
            this.$router.push(
                {
                    path: '/user_home', 
                    query: {
                        account_number: this.follows.account_number
                    }
                }
            )
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
        }
    }
}
</style>