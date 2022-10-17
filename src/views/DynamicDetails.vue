<template>
    <div>
        
    </div>
</template>

<script>
export default {
    name: 'ClientDynamicDetails',

    data() {
        return {
        };
    },

    created() {
        this.getDynamicDetail(this.$route.query.id)
    },

    methods: {
        async getDynamicDetail(id){
            try{
                let res = await this.$http.get('/client/dynamic_detail',{id});
                console.log(res);
            }catch(err){}
        }
    },
};
</script>

<style lang="scss" scoped>

</style>