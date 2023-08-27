<template>
  <div class="loadMask" v-if="loading" >
    <van-loading size="30px" vertical color="#0094ff" text-color="#0094ff">加载中...</van-loading>
  </div>
</template>

<script>
export default {
  name: "my-loading",
  props:{
    loading:{
        required: true,
    }
  }
};
</script>

<style>
.loadMask {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffffffcc;
  transition: opacity 0.2s;
  border-radius: inherit;
}
</style>
