<template>
  <div class="manageLineProgress">
    <div ref="fans" style="width: 100%; height: 530px"></div>
  </div>
</template>

<script>
export default {
  name: "ManageLineProgress",

  data() {
    return {};
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
            data: [
              "昵称1",
              "昵称2",
              "昵称3",
              "昵称4",
              "昵称5",
              "昵称6",
              "昵称7",
              "昵称8",
              "昵称9qweqwe",
              "昵称10",
            ],
          },
          series: [
            {
              type: "bar",
              data: [124, 432, 65, 557, 234, 97, 242, 543, 821, 92],
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
