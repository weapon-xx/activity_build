import Vue from 'vue'
import msgboxVue from '../components/tmt-msgbox.vue'

var MessageBoxConstructor = Vue.extend(msgboxVue);

var msgQueue = [],
    instance,
    currentMsg;

const defaults = {
  icon : '',
  message : '',
  callback : '',
  title : '',
  callback : ''
}

var MessageBox = function(options,callback){
  if(!options instanceof Object){
    return
  }

  if(typeof Promise !== 'undefined'){
    return new Promise(function(resolve,reject){
      msgQueue.push({
        options : options,
        callback : callback,
        resolve : resolve,
        reject : reject
      });
      showNextMsg();
    })
  }else {
    msgQueue.push({
      options: Object.assign({}, defaults, options),
      callback: callback
    });

    showNextMsg();
  }
}

const defaultCallback = action => {
  if(currentMsg){
    var callback = currentMsg.callback;
    if(typeof callback === 'function'){
      callback(action);
    }
    
    if (currentMsg.resolve) {
      var $type = currentMsg.options.$type;
      if ($type === 'confirm' || $type === 'prompt') {
        currentMsg.resolve(action);
      } else {
        currentMsg.resolve(action);
      }
    }
  }
}

var showNextMsg = function(){
  if (!instance) {
    initInstance();
  }
  if (!instance.value) {
    if(msgQueue.length > 0){
      currentMsg = msgQueue.shift()

      var options = Object.assign({},defaults,currentMsg.options);
      for(var prop in options){
        instance[prop] = options[prop];
      }

      if (!options.callback) {
        instance.callback = defaultCallback;
      }

      document.body.appendChild(instance.$el);

      Vue.nextTick(() => {
        instance.value = true;
      });
    }
  }
}

var initInstance = function(){
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  });

  // instance.callback = defaultCallback;
}

export default MessageBox;
export { MessageBox };
