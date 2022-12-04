<template>
  <div class="UserHome">
    <div class="personCenterBg">
        <div class="headimg">
            <img v-if="userInfo.state==1" :src="userInfo.head_img" alt="">
            <img v-else src="@/assets/icons/user.png" alt="">
        </div>
        <div class="d_f j_c_c">
            <Button type="ghost" @click="follow">
                <Icon size="16" :color="userInfo.is_follows ? '#0058A3' : ''" 
                    :type="userInfo.is_follows ? 'checkmark-round' : 'plus-round' ">
                </Icon>
                {{userInfo.is_follows ? '取消关注':'关注' }}
            </Button>
        </div>
        <div v-if="userInfo.state==1">
            <p class="title">{{userInfo.nickname}}</p>
            <div class="d_f j_c_c" style="padding-top: 10px;" v-if="userInfo.mechanism_name">
                <Tag color="blue">{{userInfo.mechanism_name}}</Tag>
            </div>
            <p class="d_f j_c_c" style="padding-top: 10px;color: #fff;font-size: 14px;">
                {{userInfo.city}} {{userInfo.establish_time}}
            </p>
            <p class="followCount">
                <span>{{userInfo.dynamic_count}} 作品</span>
                <strong>|</strong>
                <span>{{userInfo.follows_count}} 粉丝</span>
            </p>
            <p class="introduce">
                {{userInfo.introduce}}
            </p>
        </div>
        <div v-else>
            <p class="title">用户已注销</p>
        </div>
    </div>
    <div class="container">
        <Dynamic v-for="v in dynamicList" :dynamic="v" :key="v.id"></Dynamic>
    </div>
    <div class="scroll">已加载全部</div>
  </div>
</template>

<script>
import Dynamic from "@/components/Dynamic.vue";
export default {
    name: "UserHome",
    components: {
        Dynamic
    },
    data(){
        return {
            account_number: '',
            userInfo: {},
            dynamicList: []
        }
    },
    created() {
        this.account_number = this.$route.query.account_number;
        this.getUserInfo()
    },
    methods: {
        async getUserInfo(){
            try{
                let res = await this.$http.post('/client/find_other_userinfo',{account_number: this.account_number});
                this.userInfo = res.data.data.userInfo;
                this.dynamicList = res.data.data.dynamicList;
            }catch(err){}
        },
        async follow(){
        try{
            let data = { f_account_number: this.userInfo.account_number };
            await this.$http.post('/client/user_follow',data);
            this.getUserInfo();
        }catch(err){}
    },
    }
}
</script>

<style  lang="scss" scoped>
.UserHome{
    .ivu-btn.ivu-btn-ghost{
        color: #fff;
    }
    .personCenterBg{
        background: #333333;
        width: 100%;
        padding-bottom: 20px;
        background-image: url('@/assets/images/personCenter_bg.png');
        background-repeat: no-repeat;
        background-position: top -275px right 10px;
        overflow: hidden;
        .headimg{
            margin: 40px auto 10px;
                width: 110px;
                height: 110px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                
            }
        }
        .title{
            margin-top: 10px;
            font-size: 30px;
            font-weight: 800;
            text-align: center;
            color: white;
        }
        .followCount{
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            margin-top: 10px;
            span{
                margin: 0 15px;
            }
        }
        .introduce{
            width: 60%;
            color: #fff;
            font-size: 18px;
            text-align: center;
            margin: 10px auto 0;
        }
    }
    .container{
        width: 1280px;
        margin: 20px auto;
        background: #fff;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 310px;
    }
    .scroll {
        margin: auto;
        padding: 40px 0;
        font-size: 20px;
        text-align: center;
    }
}
</style>