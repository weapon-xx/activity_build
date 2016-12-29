<template>
  <div class="">
    <transition name="fade">
      <div class="tmt-msgbox" v-show="value">
        <p class="tmt-msgbox-title">{{title}}</p>
        <div class="tmt-msgbox-content">
          <div class="wif tmt-msgbox-icon" :class="icon" v-show="icon"></div>
          <p :class="{noIcon : !icon }" >
            {{message}}
          </p>
        </div>
        <div class="tmt-msgbox-btns" >
          <button class="tmt-msgbox-cancel" @click="handleAction('cancel')" v-show="showCancelButton">
            {{ cancelButtonText }}
          </button>
          <button class="tmt-msgbox-confirm" @click="handleAction('confirm')" v-show="showConfirmButton">
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
      <!-- <div class="tmt-msgbox-mask"></div> -->
    </transition>
  </div>
</template>

<script>
let CONFIRM_TEXT = '确定';
let CANCEL_TEXT = '取消';
import Popup from 'vue-popup';
export default {
  mixins: [ Popup ],
   data(){
     return {
       message : '',
       title : '',
       icon : '',
       title : '提示',
       confirmButtonText : CONFIRM_TEXT,
       confirmCallback : '',
       cancelButtonText : CANCEL_TEXT,
       cancelCallback : '',
       showCancelButton : false,
       showConfirmButton : true
     }
   },
   props : {
     modal: {
       default: true
     },
     showClose: {
       type: Boolean,
       default: true
     },
     lockScroll: {
       type: Boolean,
       default: false
     },
     closeOnClickModal: {
       default: true
     },
     closeOnPressEscape: {
       default: true
     },
     inputType: {
       type: String,
       default: 'text'
     }
   },
   computed: {
      sonShow : function(){
        return this.show
      }
    },
   methods : {
     doClose() {
       this.value = false;
       this._closing = true;
       this.onClose && this.onClose();
       setTimeout(() => {
         if (this.modal && this.bodyOverflow !== 'hidden') {
           document.body.style.overflow = this.bodyOverflow;
           document.body.style.paddingRight = this.bodyPaddingRight;
         }
         this.bodyOverflow = null;
         this.bodyPaddingRight = null;
       }, 200);
       this.opened = false;
       if (!this.transition) {
         this.doAfterClose();
       }
     },
     handleAction(action) {
       if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
         return;
       }
       this.value = false;

       if(action === 'confirm'){
         this.confirmCallback(action);
       }else if(action === 'cancel'){
         this.cancelCallback(action)
       }
       this.callback(action);
     },
   },
   watch : {

   }
}
</script>

<style src="vue-popup/lib/popup.css"></style>
<style lang="css">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.tmt-msgbox{
  position: fixed;
  background-color: #fff;
  width: 85%;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: 5px;
  border: 1px solid #ccc;
  z-index: 10;
  text-align: center;
  padding-top: 10px;
}

.tmt-msgbox-title{
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

.tmt-msgbox-content{
  padding: 10px 20px 15px;
  min-height: 36px;
  display: inline-block;
}

.tmt-msgbox-content p{
  float: left;
  font-size: 30px;
  color: #535353;
}

p.noIcon{
  width: 100%;
  text-align: center;
}

.tmt-msgbox-icon{
  /*margin: .3rem 0;*/
  /*margin-left: 1.8rem;*/
  font-size: 1.2rem;
  text-align: center;
  color: #ff0035;
  float: left;
  margin-right: 0.4rem;
}

.tmt-msgbox-remark{
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
  color: #ff0035;
  font-size: 0.32rem;
  line-height: 1rem;
  height: 1rem;
}

.tmt-msgbox-btns{
  display: flex;
  width: 100%;
  text-align: center;
  color: #26a2ff;
  line-height: 40px;
  height: 40px;
  border-top: 1px solid #ccc;
}

.tmt-msgbox-btns button{
  width: 50%;
  text-align: center;
  display: block;
  border: none;
  background-color: #fff;
  font-size: 14px;
  outline: none;
  flex: 1;
}

button.tmt-msgbox-cancel{
  border-right: 1px solid #ccc;
}

button.tmt-msgbox-confirm{
  color: #26a2ff;
}

.tmt-msgbox-mask{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: .5;
  left: 0;
  top: 0;
  z-index: 9;
}

.tmt-msgbox-header{
  display: block;
  width: 100%;
}

.tmt-msgbox-close{
  position: absolute;
  width: 1rem;
  height: 1rem;
  right: 0.16rem;
  top: 0.16rem;
  z-index: 11;
  color: #fff;
  text-align: right;
  font-size: 0.4rem;
}
</style>
