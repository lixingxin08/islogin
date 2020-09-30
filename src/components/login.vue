<template>
  <div id="bg">
    <div class="login">
      <div class="title">合安科技照明物联网大数据平台</div>
      <div class="login_t flex_f">
        <div class="login_h" :class="logintyoe==1?'login_hg':''" @click="change(1)">用户名称</div>
      </div>
      <div class="login_item" v-if="logintyoe==1">
        <input
          type="text"
          placeholder="请输入用户名称"
          v-model="form.userName"
        />
      </div>
      <div class="login_item" v-if="logintyoe==2">
        <input
          type="text"
          placeholder="请输入手机号码"
          v-model="form.userName"
        />
      </div>
      <div class="login_item" v-if="logintyoe==3">
        <input
          type="text"
          placeholder="请输入电子邮箱"
          v-model="form.userName"
        />
      </div>
      <div class="login_item">
        <input
          type="password"
          placeholder="请输入密码"
          v-model="form.cipher"
        />
      </div>
      <div class="login_item">
        <div class="flex_f code_box">
          <input
            type="text"
            class="code_inp"
            placeholder="请输入验证码"
            maxlength="6"
            v-model="form.validateCode"
          />
          <div class="code" @click="getcode()" v-if="imgtype">
            <div>获取验证码</div>
          </div>
          <div class="code" v-if="!imgtype2&&!imgtype" @click="getcode()">
            <div>{{istime}}</div>
          </div>
          <div class="code" v-if="imgtype2" @click="getcode2()">
            <img id="img" :src="imgdata" style="width:160px;height:50px;cursor: pointer;" @keydown.enter="login()" />
          </div>
        </div>
      </div>
      <div class="login_item submit" @click="login()">登录</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      logintyoe: 1,
      imgtype: true,
      imgtype2: false,
      imgdata: "",
      tip: "",
      tiptype: 0,
      sessionId: "",
      flag: 0,
      form: {
        cipher: "",
        userName: "",
        validateCode: "",
      },
      timer: null,
      istime: 60,
    };
  },
  mounted() {
      // this.getcode()
      console.log(222222);
  },
  methods: {
    gettest() {
      console.log(this.$api,1122);
      this.imgtype2 = false;
      this.$http({
        url: this.$api.getValidateCode,
        method: "get",
        withCredentials: true,
        data: {},
        responseType: "blob",
      }).then((response) => {
        console.log(response);
        if (response.status == 200) {
          console.log(response);
          clearInterval(this.timer);
          this.timer = null;
          const src = window.URL.createObjectURL(response.data);
          this.imgdata = src;
          this.imgtype2 = true;
          this.sessionId = response.headers.sessionid;
          this.setCookie("iscookie", this.sessionId, 100);
        } else {
          alert("获取验证码失败，请重新获取");
          this.imgtype2 = false;
          this.imgtype1 = true;
        }
      });
    },
    change(type) {
      this.logintyoe = type;
      this.form.userName = "";
      this.form.psw = "";
      this.form.validateCode = "";
    },
    //登录
    login() {
      let _that = this;
      this.getCookie("iscookie");
      this.$http({
        headers: {
          sessionId: _that.sessionId,
        },
        url: this.$api.login,
        method: "post",
        data: this.form,
      }).then((res) => {
        if (res.data.resultCode == "10000") {
          let isdata=res.data.data
          isdata.token=res.headers.token
          localStorage.setItem("data", JSON.stringify(isdata));
         let aa=setTimeout( _that.$router.push({ name: "home" }),100)
        } else {
          this.getcode()
          alert("登录失败," + res.data.resultMsg);
        }
      });

      console.log(this.tiptype !== 0);
      if (this.tiptype !== 0) {
        this.$message.error("请输入正确的登录信息", 2);
        return;
      }
    },
    getcode() {
      let _that = this;
      this.istime = 60;
      this.timer = setInterval(() => {
        _that.istime--;
        if (_that.istime <= 1) {
          clearInterval(this.timer);
          this.timer = null;
          _that.istime = "重新获取验证码";
        }
      }, 1000);
      this.imgtype = false;
      this.imgtype2 = true;
      this.gettest();
    },
    getcode2() {
      console.log(222);
      this.imgtype2 = false;
      setTimeout(() => {
        this.imgtype2 = true;
      }, 10);
      this.gettest();
    },
    //验证密码
    verpsw(str) {
      if (str == "") {
        this.tiptype = 0;
        this.tip = "";
        return;
      }
      if (str.length < 6 || str.length > 32) {
        this.tiptype = 4;
        this.tip = "密码长度为【6-32个字符】";
      } else {
        this.tiptype = 0;
        this.tip = "";
      }
    },
    //验证用户名
    verifyUsername(str) {
      if (str == "") {
        this.tiptype = 0;
        this.tip = "";
        return;
      }
      let re = /^[a-z_][a-z0-9]{5,31}$/;
      if (re.test(str) !== true) {
        this.tiptype = 1;
        this.tip =
          "以字母或英文下划线开头由字母、数字和英文下划线组成【6-32个字符】";
      } else {
        this.tiptype = 0;
        this.tip = "";
      }
    },
    //校验手机号
    IsPhone(str) {
      if (str == "") {
        this.tiptype = 0;
        this.tip = "";
        return;
      }
      let myreg = /^1[3456789]\d{9}$/;
      if (myreg.test(str) !== true) {
        this.tiptype = 2;
        this.tip = "请输入正确的手机号码";
      } else {
        this.tiptype = 0;
        this.tip = "";
      }
    },
    //验证邮箱
    verEmail(str) {
      if (str == "") {
        this.tiptype = 0;
        this.tip = "";
        return;
      }
      let re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      if (re.test(str) !== true) {
        this.tiptype = 3;
        this.tip = "请输入正确的电子邮箱";
      } else {
        this.tiptype = 0;
        this.tip = "";
      }
    },
  },
};
</script>


<style scope>
@import url("./login.css");
</style>