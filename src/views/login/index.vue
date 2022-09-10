<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录" />
    <van-form @submit="onSubmit" validate-trigger="onSubmit" ref="loginFrom">
      <van-field v-model="user.mobile" name="mobile" clearable :rules="loginFormRules.mobile" placeholder="请输入手机号" type="number">
        <template #left-icon>
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>
      <van-field v-model="user.code" name="code" :rules="loginFormRules.code" clearable placeholder="请输入验证码" type="number">
        <template #left-icon>
          <i class="iconfont icon-yanzhengma"></i>
        </template>
        <template #button>
          <div class="send-btn-warp">
            <van-button round :disabled="isCountDownShow" @click="onSendSms" native-type="button" class="send-sms-btn" size="small" type="default">
              <van-count-down
                :time="timer.time"
                :format="timer.format"
                v-if="isCountDownShow"
                @finish="onfinish"
                />
              <template v-else>
                {{sendLabel}}
              </template>
            </van-button>
          </div>
        </template>
      </van-field>
      <div class="login-btn-warp">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'Login',
  data () {
    // 测试手机号，13911111111111
    return {
      // 表单输入相关
      user: {
        mobile: '',
        code: ''
      },
      // 登录表单校验相关
      loginFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|7|8|9]\d{9}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          }
        ]
      },
      // 定时器相关属性
      timer: {
        time: 1000 * 60,
        format: 'ss秒后重新获取'
      },
      // 发送按钮内容
      sendLabel: '获取验证码',
      // 是否显示定时器
      isCountDownShow: false
    }
  },
  methods: {
    // 倒计时结束事件
    onfinish (value) {
      // 倒计时结束，隐藏定时器
      this.isCountDownShow = false
      this.sendLabel = value || '重新获取'
    },
    // 发送验证码
    async onSendSms () {
      try {
        // 校验手机号码
        await this.$refs.loginFrom.validate('mobile')
      } catch (error) {
        return
      }

      // 验证通过开启显示定时器
      this.isCountDownShow = true

      // 发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('发送成功')
      } catch (error) {
        if (error.response.status === 429) {
          return this.$toast.fail('操作频繁，请稍后重试')
        }
        if (error.response.status === 404) {
          return this.$toast.fail('手机号不正确')
        }
        this.$toast.fail('发送失败，请稍后重试')
      }
    },
    // 登录表单提交事件
    async onSubmit () {
      // 1、获取表单信息
      const user = this.user

      // 2、TODO: 表单验证
      this.$toast.loading({ message: '登录中...', forbidClick: true, duration: 0 })
      // 3、提交登录表单
      try {
        // 用户登录
        const res = await login(user)
        // 登录成功时处理，解构数据
        const { data } = res
        // 设置用户身份令牌
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
      } catch (e) {
        // 登录失败时处理
        const { response } = e
        if (response.status === 400) {
          return this.$toast.fail('验证码错误')
        }
        return this.$toast.fail('网络超时')
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
    margin-right: 30px;
  }

  .send-btn-warp {
    border-left: 1px solid #eeeeee;
    padding-left: 20px;
  }

  .send-sms-btn {
    width: auto;
    height: auto;
    font-size: 22px;
    color: #666;
    padding: 12px 19px;
    background-color: #ededed;
  }

  .login-btn-warp {
    margin: 53px 28px;
  }

  .login-btn {
    background-color: #6db4fb;
    border-radius: 10px;
    border: 1px solid #6db4fb;
  }
}
</style>
