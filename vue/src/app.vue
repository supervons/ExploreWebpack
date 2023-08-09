<template>
  <div id="vueApp">
    <div class="jumbotron">
      <img
        style="height: 500px"
        src="./assets/images/theme-index-blue.c38b733.png"
      />
    </div>
    <div class="jumbotron-red" :style="{ height: this.scroll + 'px' }">
      <img
        style="height: 500px"
        src="./assets/images/theme-index-red.c8e136e.png"
      />
    </div>
    <div style="margin-top: 720px"></div>
    <p v-for="item in 20" :key="item">测试文字{{ item }}</p>
    <div>
      <img style="height: 500px" src="./assets/images/0.png" />
      <img
        class="react-style"
        :style="{
          opacity: (this.scroll - 1000) / 100,
          marginLeft:
            -280 - (this.scroll > 1300 ? 100 : this.scroll - 1200) + 'px',
        }"
        src="./assets/images/1.png"
      />
      <img
        class="react-style"
        :style="{
          opacity: (this.scroll - 1200) / 100,
          marginLeft:
            -280 - (this.scroll > 1400 ? 100 : this.scroll - 1300) + 'px',
        }"
        src="./assets/images/2.png"
      />
      <img
        class="react-style"
        :style="{
          opacity: (this.scroll - 1300) / 100,
          marginLeft:
            -280 - (this.scroll > 1500 ? 100 : this.scroll - 1400) + 'px',
        }"
        src="./assets/images/3.png"
      />
    </div>
    <p v-for="item in 20" :key="item">测试文字{{ item }}</p>
  </div>
</template>

<script>
import { getProfile } from "base/utils";
export default {
  name: "App",
  data() {
    return {
      scroll: 0,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      //或者使用document.querySelector('.class或者#id').scrollTop
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
  },
};
</script>

<style>
.jumbotron {
  position: absolute;
  left: 250px;
  top: 220px;
}
.jumbotron-red {
  transition: height 0.1s;
  position: absolute;
  left: 250px;
  top: 220px;
  overflow: hidden;
}
.react-style {
  height: 500px;
}
</style>
