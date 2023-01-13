<template>
  <div class="manageLineProgress">
    <div ref="fans" style="width: 100%; height: 380px"></div>
  </div>
</template>

<script>
export default {
  name: "ManageLineProgress",
  props: ['fansLeaderboard'],
  data() {
    return {
      fansLeaderboardList: []
    };
  },

  watch: {
    fansLeaderboard(v){
      this.fansLeaderboardList = v;
      this.fans();

    }
  },
  mounted() {
    this.fans();
  },

  methods: {
    fans() {
      const chart = this.$refs.fans;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {},
          grid: {
            left: "0%",
            right: "4%",
            bottom: "3%",
            top: "5%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
          },
          yAxis: {
            type: "category",
            data: this.fansLeaderboardList.map(v=> v.nickname),
          },
          series: [
            {
              type: "bar",
              data: this.fansLeaderboardList.map(v=> v.follows_count),
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
.manageLineProgress {
}
</style>
