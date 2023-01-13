<template>
    <div class="notice">
        <div class="top d_f j_c_sb">
            <p>
                <span class="icon">系统</span>
                <span class="title m_l_2">动态下架通知！</span>
            </p>
            <p class="time">{{systemNotice.delete_time}}</p>
        </div>
        <div class="container">
            您的动态<Button type="text">{{systemNotice.title}}</Button>被管理员下架了。原因：<span>{{systemNotice.delete_reason}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SystemNotice',
    props: {
        systemNotice: {
            type: Object
        }
    }
}
</script>

<style lang="scss" scoped>
.notice{
    padding: 10px;
    border-bottom: 1px solid #eee;
    .top{
        p{
            .icon{
                border: 1px solid #ccc;
                padding: 3px 6px;
            }
            .title{
                font-size: 16px;
            }
        }
        .time{
            font-size: 16px;
            color: #aaa;
        }
    }
    .container{
        font-size: 16px;
        margin-top: 10px;
        background: #F7F7F7;
        padding: 10px;
    }
}
</style>