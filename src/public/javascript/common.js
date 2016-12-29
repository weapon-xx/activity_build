//window.config = 'http://192.168.1.52:8080';

//window.share_config = 'http://192.168.1.52:8003';

// console.log(`当前分支:${process.env.branch}`);

import md5 from './md5.min.js'

window.stamp = 2580;

window.iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

window.ajaxCommonParams = {
  'plat_form': '3',
  'version': '1'
};

window.forAjax = function(data) {

  var isImage = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  var calMD5 = function calMD5(data) {
    var ksort = function ksort(obj) {
      var keys = Object.keys(obj).sort();
      var str = '';
      for (var i in keys) {
        str += obj[keys[i]];
      }
      return str;
    };

    return md5(ksort(data));
  };

  function mergeObj(o1, o2) {
    for (var key in o2) {
      o1[key] = o2[key]
    }
    return o1;
  }
  var data = mergeObj(data, ajaxCommonParams);

  if (isImage) {
    data['ck'] = calMD5(data);
    var formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    data = formData;
  } else {
    data['ck'] = calMD5(data);
  }
  // console.log(data)
  return data;
};

window.queryString = function() {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}()

var callNative = function(src) {
  var iframe = document.createElement('iframe')
  iframe.src = src
  document.body.appendChild(iframe)
}

// parse params
function parseParams(){
  var arr,
      obj = {},
      str =  location.search
  str = str.substring(1,str.length)
  arr = str.split('&');
  arr.forEach(function(item){
    obj[item.split('=')[0]] = item.split('=')[1];
  })
  return obj
}

export default {
  parseParams : parseParams,
  callNative  : callNative,
  forAjax : forAjax
}
