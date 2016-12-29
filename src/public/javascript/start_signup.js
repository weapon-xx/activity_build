/**
*
* common.js
* vue
*
*/

import '../css/common.css'
import '../css/start_signup.css'
import Vue from 'vue'
import common from './common.js'
import loading from '../components/tmt-loading.vue'
import Msgbox from '../components/tmt-msgbox.js'
// import 'mint-ui/lib/style.css'
// import { Button } from 'mint-ui';
// Vue.component(Button.name, Button);

Msgbox({
  title : '友情提示',
  message : '12312312',
  confirmButtonText : '确定',
  confirmCallback : function(){
    console.log('confirm')
  }
}).then(action => {
  console.log(`${action}`)
});

var params = common.parseParams(),
      forAjax = common.forAjax;

var vm = new Vue({
  el : '.container',
  data : function(){
    return {
      loading_show : false,
    }
  },
  methods : {

  },
  mounted : function(){

  },
  components: {
   loading
  }
})
