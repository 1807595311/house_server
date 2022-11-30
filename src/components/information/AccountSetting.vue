<template>
    <div class="AccountSetting">
        <div class="item">
            <p>修改密码</p>
            <Button type="text">立即修改</Button>
        </div>
        <div class="item">
            <p>账号注销</p>
            <Button type="text">立即注销</Button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AccountSetting',
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.AccountSetting{
    .item{
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 10px;
    }
}
</style>