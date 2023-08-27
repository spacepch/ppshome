<template>
  <!-- github信息卡片 -->
  <pps-card>
    <!-- 输入框 -->
    <pps-input
      color="white"
      placeholder="输入github用户名"
      :content.sync="keyword"
      @keyup.13.native="gitSendAjax"
    >
      <pps-button type="confirm" @click="handleClear">重置</pps-button>
      <pps-button type="primary" @click="gitSendAjax">查找</pps-button>
    </pps-input>
    <!-- 头像框 -->
    <pps-avatar
      :href="githubPart.content.href"
      :src="githubPart.content.avatar"
      defaultSrc="https://qlogo4.store.qq.com/qzone/2969476145/2969476145/100"
    ></pps-avatar>
    <!-- 信息栏 -->
    <pps-table-item
      v-for="(item, index) of navList"
      :key="index"
      :title="item"
      :content="githubPart.infoList[index]"
    >
    </pps-table-item>
    <!-- 加载中 -->
    <my-loading :loading="isloading"></my-loading>
  </pps-card>
</template>

<script>
// import { } from 'view-ui-plus'
import { gitFilter } from "@/private";
import { getGithubInfoAPI } from "@/api";
import { mapGetters } from "vuex";
import myLoading from '@/components/myLoading.vue';
export default {
  components: { myLoading },
  name: "my-github",
  data() {
    return {
      isloading: false,
      keyword: "",
      navList: [
        { title: "用户id", haveToast: false },
        { title: "用户名", haveToast: false },
        { title: "昵称", haveToast: false },
        {
          title: "静态页面",
          haveToast: true,
        },
      ],
    };
  },
  methods: {
    async gitSendAjax() {
      if (this.keyword === "") return this.$message.error("输入不能为空！");
      if (await gitFilter(this.keyword)) return false;
      try {
        this.isloading = true
        const { data: res } = await getGithubInfoAPI(this.keyword);
        if (res.code) return this.$message.error(res.message);
        console.log(res);
        const pages = `<a href="https://${res.login}.github.io" target="_blank">点击跳转</a>`;
        const info = {
          infoList: [res.id, res.login, res.name, pages],
          content: { href: res.href, avatar: res.avatar },
        };
        this.$store.commit("updateGithub", info);
      } catch {
        this.isloading = false
        this.$message.error("接口请求失败！请尝试VPN");
      }
      this.isloading = false
      //#region
      // this.ppsAjax({
      //   url: `https://api.github.com/users/${this.gitPart.content.keyword}`,
      //   method: 'get',
      //   async: true,
      //   success: ({ html_url, avatar_url, id, login, name }) => {
      //     this.gitPart.infoList = [id, login, name];
      //     this.gitPart.content.avatar = avatar_url;
      //     this.gitPart.content.href = html_url;
      //   },
      //   error: (err) => {
      //     console.error(`[pps warn]:${err}`);
      //   },
      // });
      //#endregion
    },
    handleClear() {
      this.$store.commit("updateGithub", "");
      this.keyword = "";
    },
  },
  computed: {
    ...mapGetters(["githubPart"]),
  },
};
</script>

<style scoped>
.pps-card {
  width: 300px;
  height: fit-content;
  margin: 0 auto;
}
</style>
