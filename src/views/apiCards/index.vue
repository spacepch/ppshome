<template>
  <div class="back">
    <div class="img-slider-big" v-if="isShowImg" @click="closeImg()">
      <img :src="imgSrc" alt="" />
    </div>
    <pps-card class="api-card" v-for="(obj, index) in cardList" :key="index">
      <div class="cover-pic" v-if="obj.cover_pic" @click="showImg(obj.cover_pic)">
        <img :src="obj.cover_pic" alt="" />
      </div>
      <div class="text">
        <div class="title">
          <router-link :to="obj.path" class="pps-title-a">
            {{ obj.title }}
          </router-link>
        </div>
        <div class="description">
          <router-link to="" class="desc">
            {{ obj.description }}
          </router-link>
        </div>
        <div class="info">
          <span class="time">
            <router-link to="" class="desc">
              {{ obj.time }}
            </router-link>
          </span>
          <span class="author">
            <router-link to="" class="desc">
              {{ obj.author }}
            </router-link>
          </span>
        </div>
      </div>
    </pps-card>
      <el-dialog title="添加文章" :visible.sync="acticlePart.addActDialogVisible" fullscreen>
        <el-form :model="actForm">
          <el-form-item label="文章标题" label-width="120px">
            <el-input v-model="actForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章简介" label-width="120px">
            <el-input v-model="actForm.description" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="作者" label-width="120px">
            <el-input v-model="actForm.author" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="封面图片" label-width="120px">
            <el-input v-model="actForm.cover_pic" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取 消</el-button>
          <el-button type="primary" @click="confirm()">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import qqcardcover from "@/assets/img/qqcard_cover.png";
import bilicardcover from "@/assets/img/bilicard_cover.png";
import biliusercardcover from "@/assets/img/biliuser_cover.png";
import gitcardcover from "@/assets/img/github_cover.png";
import { mapGetters } from "vuex";

export default {
  name: "apiCard",
  methods: {
    showImg(src) {
      this.isShowImg = true;
      this.imgSrc = src;
    },
    closeImg() {
      this.isShowImg = false;
    },
    confirm() {
      this.$store.state.acticlePart.addActDialogVisible = false;
      const date = new Date();
      const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      console.log(date);
      this.cardList.push({ ...this.actForm, time });
      this.actForm = {
        title: "",
        description: "",
        author: "",
        cover_pic: "",
        path: "",
      };
    },
    cancel() {
      this.$store.state.acticlePart.addActDialogVisible = false;
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      isShowImg: false,
      imgSrc: "",
      actForm: {
        title: "",
        description: "",
        author: "",
        time: "",
        cover_pic: "",
        path: "",
      },
      cardList: [
        {
          title: "QQ用户信息查询",
          description: "QQ接口，后端自己写的部署在vercel Serverless Function",
          author: "space",
          time: "2023-08-14",
          path: "/qqCard",
          cover_pic: qqcardcover,
        },
        {
          title: "bili单用户信息查询",
          description: "QQ接口，后端自己写的部署在vercel Serverless Function",
          author: "space",
          time: "",
          path: "/biliCard",
          cover_pic: bilicardcover,
        },
        {
          title: "B站用户信息查询",
          description: "QQ接口，后端自己写的部署在vercel Serverless Function",
          author: "space",
          time: "",
          path: "/biliUserCard",
          cover_pic: biliusercardcover,
        },
        {
          title: "github用户信息查询",
          description: "QQ接口，后端自己写的部署在vercel Serverless Function",
          author: "space",
          time: "",
          path: "/githubCard",
          cover_pic: gitcardcover,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['acticlePart'])
  },
  mounted() {
    this.$store.state.acticlePart.addBtnVisible = true;
  },
  beforeDestroy(){
    this.$store.state.acticlePart.addBtnVisible = false;
  }
};
</script>

<style lang="less" scoped>
.back {
  position: relative;
}
.api-card {
  display: flex;
  align-items: center;
  height: 120px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  box-sizing: border-box;

  .cover-pic {
    width: 128px;
    height: 94px;
    border-radius: 5px;
    overflow: hidden;
    background-color: #86858540;

    &:hover {
      filter: brightness(75%);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      vertical-align: middle;
      cursor: zoom-in;
    }
  }

  .text {
    flex-grow: 1;
    margin-left: 10px;
    &.title span {
      color: #2e2e2e;
      font-size: 16px;
      font-weight: 400;
    }
    .info {
      display: flex;
      flex-direction: row-reverse;

      .time {
        margin-left: 15px;
      }
    }
  }
}
.desc {
  color: #9e9e9e;
  font-size: 14px;
}
.pps-title-a {
  font-size: 16px;
  color: #4e4e4e;
}
.pps-title-a:hover {
  color: #409eff;
}
.img-slider-big {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  cursor: zoom-out;

  & img {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    max-width: 77vw;
    max-height: 80vh;
  }
}
</style>
