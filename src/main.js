import './css/base.css'
import './css/style.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './js/axios_config.js';
import api from './js/api_config.js';
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
Vue.config.productionTip = false



import { Layout, Button, Icon, Select, Dropdown, Menu, Input, Tree, TreeSelect, Breadcrumb, Table, DatePicker, Switch, Popconfirm, Modal, message, Radio, Upload, Steps, Tabs, InputNumber, ConfigProvider } from 'ant-design-vue';

Vue.use(Dropdown);
Vue.use(Layout);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Select);
Vue.use(Menu);
Vue.use(Input);
Vue.use(Tree);
Vue.use(TreeSelect);
Vue.use(Breadcrumb);
Vue.use(Table);
Vue.use(DatePicker);
Vue.use(Switch);
Vue.use(Popconfirm);
Vue.use(Modal);
Vue.prototype.$message = message
Vue.use(Radio);
Vue.use(Upload);
Vue.use(Steps);
Vue.use(Tabs);
Vue.use(InputNumber);
Vue.use(ConfigProvider);




let bb = window.location.href.split('/#')

axios.interceptors.response.use(
  response => {
      try {
          let aa = JSON.parse(localStorage.getItem('data'))
          aa.token = response.headers.token
          localStorage.setItem('data', JSON.stringify(aa))
          if (response.data.code == "20100") {
              message.error("令牌错误，请重新登录")
              window.location.href = bb[0]

          }
          if (response.data.code == "20101") {
              message.error("未登录，请先登录")
              window.location.href = bb[0]
          }
          if (response.data.code == "20102") {
              message.error("你的账号已在其他地方登录，请重新登录")
              window.location.href = bb[0]
          }
          if (response.data.code == "20103") {
              message.error("登录已过期，请重新登录！")
              window.location.href = bb[0]
          }
          if (response.data.code == "20104") {
              message.error("登录已失效，请重新登录！")
              window.location.href = bb[0]
          }
          if (response.data.code == "20105") {
              message.error("登录已失效，请重新登录！")
              window.location.href = bb[0]
          }
      } catch (error) {

      }
      return response;
  },
  error => {
      if (error.response) {
          console.log(error, 'errorerrorerrorerror');
          console.log(error.response, 'errorerrorerrorerror');
          switch (error.response.status) {
              case 404:
                  router.replace({
                      path: '/error404',
                      query: {
                          redirect: router.currentRoute.fullPath
                      }
                  })
              case 504:
                  router.replace({
                      path: '/error504',
                      query: {
                          redirect: router.currentRoute.fullPath
                      }
                  })
              case 500:
                  router.replace({
                      path: '/error500',
                      query: {
                          redirect: router.currentRoute.fullPath
                      }
                  })
              case 504:
                  router.replace({
                      path: '/error504',
                      query: {
                          redirect: router.currentRoute.fullPath
                      }
                  })
              case 403:
                  router.replace({
                      path: '/error403',
                      query: {
                          redirect: router.currentRoute.fullPath
                      }
                  })
          }
      }
      return Promise.reject(error.response.data)
  }
)





Vue.prototype.setCookie = function (name, value, day) {
  if (day !== 0) { //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    var curDate = new Date();
    var curTamp = curDate.getTime();
    var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
    var passedTamp = curTamp - curWeeHours;
    var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
    var leftTime = new Date();
    leftTime.setTime(leftTamp + curTamp);
    document.cookie = name + "=" + escape(value) + ";expires=" + leftTime.toGMTString();
  } else {
    document.cookie = name + "=" + escape(value);
  }

}

Vue.prototype.getCookie = function (name) {

  var arr;

  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  if (arr = document.cookie.match(reg))

      return unescape(arr[2]);

  else

      return null; ocument.cookie = name + "=" + escape(value);

  }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
