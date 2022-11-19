<template>
  <div class="design">
    <div class="container">
        <div class="headimg">
            <img :src="userObj.headimg">
        </div>
        <p class="nickname">{{userObj.nickname}}</p>
        <div class="introduce">
            {{userObj.introduce}}
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        userObj: {
            type: Object
        }
    }
}
</script>

<style lang="scss" scoped>
.design{
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 10%);
    width: 180px;
    .container{
        width: 180px;
        background: url(@/assets/images/bg.png) no-repeat;
        background-size: 100% 80%;
        overflow: hidden;
        .headimg{
            background: #fff;
            border-radius: 50%;
            width: 100px;
            height: 100px;
            margin: 50px auto 0;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                border-radius: 50%;
                width: 96px;
                height: 96px;
            }
        }
        .nickname{
            text-align: center;
            color: #333;
            font-size: 16px;
            font-weight: bold;
            margin-top: 10px;
        }
        .establish_time{
            text-align: center;
            margin: 10px 0;
        }
        .address{
            margin: 10px auto 10px;
            span{
                background: #f5f5f5;
                color: #666;
                padding: 4px 14px;
            }
        }
        .introduce{
            margin: auto;
            width: 80%;
            padding: 20px;
            font-size: 14px;
            text-align: left;
            height: 80px;
        }
    }
}
</style>