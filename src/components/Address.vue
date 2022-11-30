<template>
  <div>
    <Cascader :value="value" :data="data3" :placeholder="placeholder" :render-format="format" @on-change="change"></Cascader>
  </div>
</template>

<script>
import address from "@/utils/address.json";
export default {
  name: "ClientAddressSelect",
  props: {
    placeholder:{
        type: String,
        default: '请选择所在城市'
    },
    value: {
      type: Array
    }
  },
  data() {
    return {
      data3: [],
    };
  },
  created() {
    this.data3 = address.map((v) => {
      return {
        code: v.code,
        value: v.label,
        label: v.label,
        children: v.children.map((vle) => {
          return {
            code: vle.code,
            label: vle.label,
            value: vle.label,
          };
        }),
      };
    });
  },
  methods: {
    format(labels, selectedData) {
      const index = labels.length - 1;
      const data = selectedData[index] || false;
      if (data && data.code) {
        return labels[index];
      }
      return labels[index];
    },
    change(value) {
      this.$emit("getAddress", value[1]);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>