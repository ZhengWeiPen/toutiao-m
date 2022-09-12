<template>
  <div class="layout-container">
    <!-- 子路由组件出口 -->
    <router-view/>
    <!--van-tabbar的fixed属性失效-->
    <van-tabbar class="layout-tabbar" active-color="#3296fa" inactive-color="#707070" route>
      <van-tabbar-item to="/">
        <template #icon>
          <i class="iconfont icon-shouye"></i>
        </template>
        <span class="text">
          首页
        </span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <i class="iconfont icon-wenda"></i>
        </template>
        <span class="text">
          问答
        </span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <i class="iconfont icon-shipin"></i>
        </template>
        <span class="text">
          视频
        </span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon>
          <i class="iconfont icon-wode"></i>
        </template>
        <span class="text">
          {{$store.state.user ? '登录' : '未登录'}}
        </span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  margin-bottom: 103px;
  .layout-tabbar {
    position: fixed;
    .iconfont {
      font-size: 40px;
    }

    .text {
      font-size: 20px;
    }
  }
}
</style>
