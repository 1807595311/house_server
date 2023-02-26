<template>
  <div class="house_list_container">
    <div class="house_list" v-for="item in houseList" :key="item.id">
      <div class="house_title">
        <p>{{item.title}}</p>
      </div>
      <div class="house_container">
        <div class="p_t_10 info">
          <span>所在城市: <b>{{ item.city }}</b></span>
          <span>房屋面积: <b>{{ item.area }}m²</b></span>
          <span>装修预算: <b>{{ item.budget }}万元</b></span>
          <span>装修风格: <b>{{ item.style }}</b></span>
          <span>房屋现状: <b>{{ item.situation }}</b></span>
          <p>预计入住时间: <b>{{ item.planned_time }}</b></p>
        </div>
        <div class="operation">
          <span @click="editHouse(item.id)">编辑</span>
          <span @click="deleteHouse(item.id)">删除</span>
        </div>
      </div>
    </div>
    <div class="loading_more">已加载全部</div>
  </div>
</template>
  
<script>
export default {
  name: 'house_list',
  props: ['houseList'],
  data() {
    return {
      editFormInline: {},
    };
  },
  created() {
  },
  computed: {
    showHouseList() {
      return this.houseList.length <= 0;
    }
  },
  methods: {
    async editHouse(id) {
      let res = await this.$http.get('/client/find_house_by_id', { id })
      if (res.data.status === 2) {
        this.editFormInline = res.data.data;
        this.$emit('edit', this.editFormInline);
      }
    },
    // 删除房屋信息
    deleteHouse(id) {
      this.$Modal.confirm({
        title: '删除房屋信息',
        content: '确认要删除该条记录吗？',
        onOk: async () => {
          let res = await this.$http.post('/client/delete_house', { id });
          if (res.data.status === 0) this.$parent.getHoustList()

        }
      });
    }
  },
}
  </script>
  
  <style lang="scss">
.house_list_container {
  overflow-y: auto;
  height: calc(100vh - 440px);
  &::-webkit-scrollbar {
    width: 0.5em;
    background-color: #d9d9d9;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.25em;
    background-color: #b9b9b9;
  }
  .loading_more {
    padding: 10px;
    text-align: center;
  }
  .house_list {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #eee;
    background: #f7f7f7;
    .house_title {
      p {
        font-weight: bold;
        font-size: 16px;
      }
    }
    .house_container {
      .info span {
        padding-right: 10px;
        border-right: 2px solid #2d8cf0;
        margin-right: 10px;
        &:last-of-type {
          border-right: none;
        }
      }
      .operation {
        display: flex;
        justify-content: flex-end;
        span {
          color: #2d8cf0;
          margin-right: 10px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>