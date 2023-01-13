<template>
  <div class="manageStatistics">
    <div class="top-left">
      <div class="box">
        <StatisticsCard :title="ordinary_user.title" :num="ordinary_user.count">
          <img :src="url1" alt="">
        </StatisticsCard>
        <StatisticsCard :title="design_department.title" :num="design_department.count">
          <img :src="url2" alt="">
        </StatisticsCard>
        <StatisticsCard :title="dynamic_count.title" :num="dynamic_count.count">
          <img :src="url3" alt="">
        </StatisticsCard>
      </div>
      <div class="middle">
        <div class="right" ref="column" style="width: 100%; height: 300px"></div>
      </div>
      <div class="bottom">
        <div ref="like" style="width: 100%; height: 320px"></div>
      </div>
    </div>
    <!-- 性别比例 -->
    <div class="top-right">
      <div class="top-right-box">
        <!-- <p>用户性别比例</p> -->
        <div class="sex">
          <div class="left" ref="cake" style="width: 100%; height: 350px"></div>
        </div>
        <p style="margin-top: 20px">粉丝数排行榜</p>
        <div class="">
          <LineProgress :fansLeaderboard="fansLeaderboard"></LineProgress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticsCard from "@/components/StatisticsCard.vue";
import LineProgress from "@/components/LineProgress .vue";
export default {
  name: "ManageStatistics",
  components: {
    StatisticsCard,
    LineProgress,
  },
  data() {
    return {
      url1: require("../../assets/icon/users.png"),
      url2: require("../../assets/icon/design.png"),
      url3: require("../../assets/icon/dongtai.png"),
      url4: require("../../assets/icon/admin.png"),
      progress: 45,
      ordinary_user: {
        count: 0,
        title: "用户人数"
      },
      design_department: {
        count: 0,
        title: "设计机构"
      },
      dynamic_count: {
        count: 0,
        title: "动态总数"
      },
      percentage: 0,
      sexColor: "",
      statistics: {},
      oneWeekAddUserInfo: {},
      fansLeaderboard: [], // 粉丝排行榜
      userLikeStyle: [] // 用户喜爱风格
    };
  },
  created() {
    this.getStatisticsInfo()
  },
  mounted() {
  },

  methods: {
    async getStatisticsInfo() {
      try {
        let res = await this.$http.get('/manage/getStatisticsInfo');
        this.statistics = res.data;
        this.ordinary_user.count = this.statistics.otherStatistics.old_user_count; // 普通用户人数
        this.design_department.count = this.statistics.otherStatistics.des_user_count; // 设计机构数量
        this.dynamic_count.count = this.statistics.otherStatistics.dynamic_count; // 动态总数
        this.fansLeaderboard = this.statistics.fansLeaderboard; // 粉丝排行榜
        this.userLikeStyle = this.statistics.userLikeStyle; // 用户喜爱风格
        this.cakeCharts();// 性别人数
        this.clounmCharts();// 设计机构所在城市
        this.changeSex(false);
        // 最近一周新增用户
        this.oneWeekAddUserInfo.keysArr = this.statistics.oneWeekAddUsers.map(v => v.date);
        this.oneWeekAddUserInfo.valueArr = this.statistics.oneWeekAddUsers.map(v => v.count);
        this.oneWeekAddUsers()
      } catch (err) { }
    },
    // 修改性别比例显示
    changeSex(flag) {
      this.sexColor = flag === true ? "#319EEC" : "#F897A7";
      let male_count = this.statistics.otherStatistics.male_count;
      let female_count = this.statistics.otherStatistics.female_count;
      let male = Math.floor(100 * (male_count / (female_count + male_count)));
      let female = 100 - male;
      this.percentage = flag === true ? male : female;
    },
    // 用户喜爱风格
    cakeCharts() {
      const chart = this.$refs.cake;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "用户喜爱风格",
            left: "center",
          },
          tooltip: {
            trigger: "item"
          },
          legend: {
            top: "10%",
            y: "10%",
            formatter: function (name) {
              // 获取legend显示内容
              let data = option.series[0].data;
              let p = "";
              for (let i = 0; i < data.length; i++) {
                if (data[i].name == name) {
                  p = `${data[i].name} ${data[i].value}`;
                }
              }
              return p;
            },
          },
          series: [
            {
              name: "人数",
              type: "pie",
              radius: "50%",
              data: this.userLikeStyle,
              center: ["50%", "60%"],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            }
          ],
        };
        myChart.setOption(option);
      }
    },
    // 设计机构所在城市
    clounmCharts() {
      const chart = this.$refs.column;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        let option = {
          title: {
            text: "设计机构所在城市",
            left: "center",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "10%",
            orient: "vertical",
            x: "left",
            formatter: function (name) {
              // 获取legend显示内容
              let data = option.series[0].data;
              let p = "";
              for (let i = 0; i < data.length; i++) {
                if (data[i].name == name) {
                  p = `${data[i].name} ${data[i].value}`;
                }
              }
              return p;
            },
          },
          series: [
            {
              name: "城市人数",
              type: "pie",
              radius: ["30%", "70%"],
              center: ["70%", "50%"],
              avoidLabelOverlap: true, //是否启用防止标签重叠策略
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "16",
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: this.statistics.cityStatistics,
            },
          ],
          dataZoom: [{ //添加X轴滚动条
        type: 'slider',
        show: true,
        start: 20,
        end: 100,
        handleSize: 8
    }]

        };
        myChart.setOption(option);
      }
    },
    // 最近一周新增用户
    oneWeekAddUsers() {
      const chart = this.$refs.like;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        let option = {
          title: {
            text: "最近一周新增用户",
            left: "center",
          },
          grid: {
            x: "5%", //x 偏移量
            y: "5%", // y 偏移量
            width: "90%", // 宽度
            height: "75%", // 高度
            top: "15%"
          },
          xAxis: {
            type: "category",
            data: this.oneWeekAddUserInfo.keysArr,
          },
          yAxis: {
            type: "value",
            minInterval: 1,
          },
          series: [
            {
              data: this.oneWeekAddUserInfo.valueArr,
              type: "line",
            },
          ],
        };

        myChart.setOption(option);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.manageStatistics {
  height: 100%;
  // overflow: hidden;
  display: flex;
  justify-content: space-between;
  .box {
    width: 95%;
    display: flex;
    justify-content: space-between;
  }
  .top-left {
    width: 75%;
    // min-width: 900px;
    .middle,
    .bottom {
      border-radius: 10px;
      margin-top: 20px;
      padding: 10px;
      width: 93%;
      background: #fff;
      display: flex;
    }
  }
  .top-right {
    width: 40%;
    &-box {
      padding: 10px;
      p {
        padding: 10px 30px 20px;
      }
      border-radius: 10px;
      background: #fff;
      .sex {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .right {
          width: 30%;
          .top,
          .bottom {
            display: flex;
            justify-content: space-between;
          }
          .triangle-up,
          .triangle-down {
            width: 0;
            height: 0;
            border-right: 10px solid transparent;
            border-left: 10px solid transparent;
            &:hover {
              cursor: pointer;
            }
          }
          .top {
            padding: 0px 20px 20px;
            border-bottom: 1px solid #ccc;
            .triangle-up {
              border-bottom: 10px solid #319eec;
              border-top: 10px solid transparent;
            }
          }
          .bottom {
            padding: 20px 20px;
            .triangle-down {
              border-top: 10px solid #f897a7;
              border-bottom: 10px solid transparent;
            }
          }
        }
      }
    }
  }
}
</style>
