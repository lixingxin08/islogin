<template>
  <div class="fa_box">
    <div class="homebg">
      <img src="../assets/homeimg/bg.png" alt />
    </div>
    <div class="ishead flex_b">
      <img src="../assets/homeimg/logo.png" alt />
      <div class="top_c">照明物联网大数据平台</div>
      <div class="top_r flex_b">
        <div v-if="seltype">
          <a-select
            style="
              width: 200px;
              margin-right: 20px;
              height: 36px;
              border-radius: 8px;
            "
            v-model="iscustomerName"
            @change="handleChange"
          >
            <a-select-option
              v-for="(item, index) in ismaintenancelist"
              :key="index"
              :value="item.customerId"
              >{{ item.customerName }}</a-select-option
            >
          </a-select>
        </div>
        <div v-if="!seltype">
          <a-select
            style="
              width: 200px;
              margin-right: 20px;
              height: 36px;
              border-radius: 8px;
            "
          >
          </a-select>
        </div>
        <div style="margin-right: 10px">{{ listdata.realName }}</div>
        <img
          class="top_rimg"
          @click="loginout()"
          src="../assets/homeimg/icon_tuichu.png"
          alt
        />
      </div>
    </div>
    <div class="content" v-if="menutype">
      <div class="c_list">
        <div class="isrow row_l" @click="toleft()" v-if="showrow">
          <img src="../assets/homeimg/ant_zuo.png" alt />
        </div>
        <div class="isrow row_r" @click="toright()" v-if="showrow">
          <img src="../assets/homeimg/ant_you.png" alt />
        </div>
        <div class="menu_box">
          <div class="menu_box_chi">
            <div
              class="menu_fa flex_f"
              ref="menu_fa"
              :class="menulist.length >= 5 ? '' : 'flex_a menu_fa2'"
            >
              <div
                class="menu_list"
                v-for="(item, index) in menulist"
                :key="index"
              >
                <div class="list_box" @click="getmenulist(item)">
                  <img src="../assets/homeimg/icon_shouquan.png" alt />
                  <div>{{ item.menuName }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="menu_dec">
        <div class="menu_dec_t">授权服务子系统</div>
        <div
          class="menu_dec_b"
        >授权服务子系统的注释授权服务子系统的注释授权服务子系统的注释授权服务子系统的注释授权服务子系统的注释授权服务子系统的注释授权服务子系统的注释授权服务子系统的注释授权服务子系统的注释授权服务子系统的注释授权服务子系统的注释授权服务子系统的注释授权服务子系统的注释授权服务子系统的注释授权服务子系统的注释</div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listdata: "",
      type: false,
      seltype: false,
      isurl: "",
      loginurl: "",
      rowid: 0,
      iscustomerName: "",
      menulist: [
        // { menuName: "111" },
        // { menuName: "2" },
        // { menuName: "3" },
        // { menuName: "4" },
        // { menuName: "555" },
        // { menuName: "555" },
        // { menuName: "555" },
      ],

      menutype: true,
      maintenanceparam: {
        customerId: "",
      },

      ismaintenancelist: "",
      menuparam: {
        systemId: "",
      },
    };
  },
  computed: {
    showrow() {
      return this.menulist.length >= 5 ? true : false;
    },
  },
  created() {
    this.menutype = false;
    console.log(3333);
    this.listdata = JSON.parse(localStorage.getItem("data"));
    let aa = window.location.href;
    let bb = aa.split("/#");
    this.isurl = bb[0];

    if (bb[1].search("customerId") !== -1) {
      let cc = bb[1].split("customerId=");
      this.maintenanceparam.customerId = cc[1];
      this.getmaintenanceagent();
      if (localStorage.getItem("ismaintenancelist")) {
        let a = JSON.parse(localStorage.getItem("ismaintenancelist"));
        for (let i = 0; i < a.length; i++) {
          if (a[i].customerId == this.maintenanceparam.customerId) {
            this.iscustomerName = a[i].customerName;
          }
        }
        console.log(777555);
      }
    } else {
      this.getmenusystemlist();
      this.getmaintenancelist();
    }
  },
  methods: {
    //登出
    async loginout() {
      let res = await this.$http({
        url: this.$api.logout,
        headers: {
          token: JSON.parse(localStorage.getItem("data")).token,
        },
        method: "post",
      });
      if (res.data.resultCode == "10000") {
        this.$message.success("退出成功");
      } else {
        this.$message.error(res.data.resultMsg);
        // alert(res.data.resultMsg);
      }
      window.location.href = this.isurl;
    },
    async getmaintenancelist() {
      this.seltype = false;
      let res = await this.$http({
        url: this.$api.maintenancelist,
        headers: {
          token: JSON.parse(localStorage.getItem("data")).token,
        },
        method: "post",
      });
      if (res.data.resultCode == "10000") {
        this.ismaintenancelist = res.data.data;
        if (this.ismaintenancelist.length > 0) {
          localStorage.setItem(
            "ismaintenancelist",
            JSON.stringify(this.ismaintenancelist)
          );
        }
        this.seltype = true;
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    //子系统列表
    async getmenusystemlist() {
      this.menutype = false;
      let res = await this.$http({
        url: this.$api.menusystemlist,
        headers: {
          token: JSON.parse(localStorage.getItem("data")).token,
        },
        method: "post",
      });
      if (res.data.resultCode == "10000") {
        this.menulist = res.data.data;
      } else {
        this.$message.error(res.data.resultMsg);
      }
      this.menutype = true;
    },
    //代维客户接口子系统token转化
    async getmaintenanceagent() {
      this.menutype = false;
      let res = await this.$http({
        url: this.$api.maintenanceagent,
        headers: {
          token: JSON.parse(localStorage.getItem("data")).token,
        },
        data: this.maintenanceparam,
        method: "post",
      });
      if (res.data.resultCode == "10000") {
        this.getmenusystemlist()
      } else {
        this.$message.error(res.data.resultMsg);
      }
      this.menutype = true;
    },
    //子系统nav菜单
    async getmenulist(val) {
   let thisurl = window.location.href.split('#/')
      this.menuparam.systemId = val.menuId;
      let res = await this.$http({
        url: this.$api.menulist,
        headers: {
          token: JSON.parse(localStorage.getItem("data")).token,
        },
        data: this.menuparam,
        method: "post",
      });
      if (res.data.resultCode == "10000") {
        let aa = this.listdata;
        aa.token = JSON.parse(localStorage.getItem("data")).token;
        aa.navlist = res.data.data;
        let frameurl =thisurl[0]+val.linkURL;
        localStorage.setItem("usermsg", JSON.stringify(aa), 10000000000000);
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].linkURL.search("/") == -1) {
            if (res.data.data[i].linkURL !== "") {
              frameurl = frameurl + res.data.data[i].linkURL;
              break;
            }
          }
        }
        console.log(frameurl, "frameurlframeurlframeurl");
        var iframe = document.createElement("iframe");
        iframe.id = "receivePage";
        iframe.src = frameurl;
        iframe.style =
          "visibility: hidden;width:0px;height:0px;position: absolute;";
        document.body.appendChild(iframe);
        iframe.onload = function () {
          document
            .getElementById("receivePage")
            .contentWindow.postMessage(aa, frameurl);
          setTimeout(function () {
            window.location.href = frameurl;
          }, 2500);
        };
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },

    toleft() {
      this.rowid--;
      if (this.rowid <= 0) {
        this.rowid = 0;
      }
      this.$refs.menu_fa.style.left = -343 * this.rowid + "px";
    },
    toright() {
      if (this.rowid >= this.menulist.length - 5) {
        this.$refs.menu_fa.style.left = -343 * this.rowid + "px";
        this.$refs.menu_fa.style.visible = "hidden";
        this.$refs.menu_fa.style.left = 0 + "px";
        this.$refs.menu_fa.style.visible = "visible";
        return;
      }
      this.rowid++;
      this.$refs.menu_fa.style.left = -343 * this.rowid + "px";
    },
    handleChange(value) {
      this.maintenanceparam.customerId = value;
      this.getmaintenanceagent();
    },
  },
};
</script>
<style scoped>
.fa_box {
  width: 100%;
  height: 100%;
  position: relative;
}
.homebg {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
}
.homebg img {
  width: 100%;
  height: 100%;
}
.ishead {
  width: 100%;
  height: 80px;
  padding-left: 21px;
  padding-right: 50px;
  color: #fff;
  box-sizing: border-box;
}
.top_r {
  min-width: 300px;
  height: 80px;
}

.top_rimg {
  vertical-align: middle;
}
.top_c {
  width: 600px;
  color: #39d6fe;
  text-align: right;
  font-size: 40px;
}
.content {
  width: 100%;
  margin-top: 200px;
}
.c_list {
  width: 100%;
  height: 400px;
  position: relative;
  overflow-x: scroll;
}
.c_list::-webkit-scrollbar {
  display: none;
}
.isrow {
  position: absolute;
  width: 64px;
  height: 68px;
  top: 146px;
  cursor: pointer;
}
.row_l {
  left: 40px;
}
.row_r {
  right: 40px;
}
.menu_box {
  width: 100%;
  height: 400px;
}
.menu_box_chi {
  width: 1698px;
  height: 400px;
  overflow: hidden;
  position: relative;
  left: 118px;
}
.menu_fa {
  min-width: 1715px;
  position: absolute;
  left: 0;
  top: 0;
  height: 400px;
  transition: left 1s linear;
}
.menu_fa2 {
  min-width: 0;
  left: 50%;
  transform: translateX(-50%);
}
.menu_list {
  text-align: center;
  color: #39d6fe;
  width: 313px;
  height: 400px;
  font-size: 30px;
  margin-right: 30px;
}
.menu_dec {
  margin-top: 80px;
  text-align: center;
  width: 100%;
  font-size: 40px;
  color: #2fa8ce;
}
.menu_dec_b {
  font-size: 20px;
  width: 1400px;
  text-align: center;
  margin: 0 auto;
  margin-top: 40px;
}
.list_box {
  text-align: center;
  color: #39d6fe;
  width: 313px;
  height: 400px;
  font-size: 30px;
  cursor: pointer;
}
.list_box img {
  width: 313px;
  height: 356px;
}

.home {
  position: relative;
  width: 800px;
  height: 700px;
  margin: 0 auto;
  flex-wrap: wrap;
  top: 100px;
}
.item {
  width: 300px;
  height: 200px;
  text-align: center;
  border: 1px solid #1890ff;
  cursor: pointer;
}
.btn {
  position: absolute;
  right: 0;
  top: 0px;
  width: 66px;
  height: 36px;
  line-height: 36px;
  border-radius: 8px;
  background-color: #1890ff;
  font-size: 14px;
  color: #fff;
}
#receivePage {
  width: 0;
  height: 0;
  position: absolute;
  visibility: hidden;
}
</style>