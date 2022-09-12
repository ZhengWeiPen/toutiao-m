<template>
  <div class="my-container">
    <div class="hearer user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image class="pic" round fit="cover" :src="userInfo.photo" />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div class="hearer not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="pic" src="@/assets/mobile.png" alt="">
        <span class="text">登录&nbsp;/&nbsp;注册</span>
      </div>
    </div>
    <van-grid class="grid-nav md-9" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <template #icon>
          <i class="iconfont icon-shoucang"></i>
        </template>
        <template #text>
          <span class="text">收藏</span>
        </template>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <template #icon>
          <i class="iconfont icon-lishi"></i>
        </template>
        <template #text>
          <span class="text">历史</span>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell is-link title="消息通知" />
    <van-cell class="md-9" is-link title="小智同学" />
    <van-cell class="logout" v-if="user" @click="onLogout" title="退出登录" clickable />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 退出登录
    onLogout () {
      this.$dialog.confirm({
        title: '确认退出吗？',
        cancelButtonColor: '#eb5253'
      }).then(res => {
        this.$store.commit('setUser', null)
        this.userInfo = {}
      }).catch(() => {
      })
    },
    // 获取用户信息
    async loadUserInfo () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data: { data } } = await getUserInfo()
        this.userInfo = data
        this.$toast.success('加载成功')
      } catch (error) {
        this.$toast.fail('获取失败')
      }
    }
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .hearer {
    height: 366px;
    background-image: url('~@/assets/banner.png');
    background-size: cover;
  }

  .not-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .login-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .pic {
        width: 132px;
        height: 132px;
      }

      .text {
        margin-top: 15px;
        color: #fff;
        font-size: 28px;
      }
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
  }

  .base-info {
    height: 231;
    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      .pic {
        width: 132px;
        height: 132px;
      }

      .name {
        margin-left: 22px;
        color: #fff;
        font-size: 29px;
      }
    }
  }

  .data-stats {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 0 22px;

    .data-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;

      .count {
        font-size: 36px;
        margin-bottom: 20px;
      }

      .text {
        font-size: 26px;
      }
    }
  }

  .grid-item {
    height: 140px;

    i.iconfont {
      font-size: 45px;
    }

    span.text {
      margin-top: 16px;
      font-size: 28px;
      color: #333333;
    }

    i.icon-shoucang {
      color: #eb5253;
    }

    i.icon-lishi {
      color: #ff9d1d;
    }
  }

  .logout {
    text-align: center;
    color: #d86262;
  }
}
</style>
