<template>
    <div>
        <div class="personCenterBg d_f j_c_c a_l_c">
            <p class="title">{{ title }} <span v-count="count"></span> </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ClientHeadBG',
    props:{
        title: {
            type: String,
            default: ''
        },
        count: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
    directives: {
        count: {
            update(el,v){
                if(v.value === 0) el.style.display = 'none';
                el.innerText = `【${v.value}】`;
            }
        }
        
    }
};
</script>

<style lang="scss" scoped>
.personCenterBg{
    background: #333333;
    width: 100%;
    height: 220px;
    background-image: url('@/assets/images/personCenter_bg.png');
    background-repeat: no-repeat;
    background-position: top -275px right 10px;
    .title{
        font-size: 30px;
        text-align: center;
        color: white;
        letter-spacing: 10px;
    }
}
</style>