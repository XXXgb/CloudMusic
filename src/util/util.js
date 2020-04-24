// 判断arr是否为一个数组，返回一个bool值
function isArray (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
};

export default {

  // 检查值是否为特定类型 isType(Array, [1]); // true
  isType(type, val) {
    return ![, null].includes(val) && val.constructor === type
  },

  // 滚动到顶部
  // 使用document.documentElement.scrollTop 或 document.body.scrollTop 获取到顶部的距离，从顶部滚动一小部分距离。使用window.requestAnimationFrame()来滚动。
  scrollToTop() {
    var c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  },

  // 判断是否以某个字符串开头
  isStart(s) {
    return this.indexOf(s) == 0;
  },

  // 时间个性化输出功能
  /*
    1、< 60s, 显示为“刚刚”
    2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
    3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
    4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
    5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
*/
  timeFormat(time) {
    var date = new Date(time),
      curDate = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 10,
      day = date.getDate(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      curYear = curDate.getFullYear(),
      curHour = curDate.getHours(),
      timeStr;

    if (year < curYear) {
      timeStr = year + "年" + month + "月" + day + "日 " + hour + ":" + minute;
    } else {
      var pastTime = curDate - date,
        pastH = pastTime / 3600000;
      if (pastH > curHour) {
        timeStr = month + "月" + day + "日 " + hour + ":" + minute;
      } else if (pastH >= 1) {
        timeStr = "今天 " + hour + ":" + minute + "分";
      } else {
        var pastM = curDate.getMinutes() - minute;
        if (pastM > 1) {
          timeStr = pastM + "分钟前";
        } else {
          timeStr = "刚刚";
        }
      }
    }
    return timeStr;
  },

  //横线转驼峰命名 ab-cd-ef ==> abCdEf
  camelize(str) {
    return str.replace(/-(\w)/g, function (_, c) {
      return c ? c.toUpperCase() : '';
    })
  },

  //驼峰命名转横线命名 abCd ==> ab-cd
  hyphenate(str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase()
  },

  //下划线转驼峰：camelCase('USER_ROLE',false) => userRole
  camelCase(str, firstUpper) {
    let ret = str.toLowerCase();
    ret = ret.replace(/_([\w+])/g, function (all, letter) {
      return letter.toUpperCase();
    });
    ret = ret.replace('_', '');
    if (firstUpper) {
      ret = ret.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
        return $1.toUpperCase() + $2;
      });
    }
    return ret;
  },

  //驼峰转下划线
  toLine(name) {
    return name.replace(/([A-Z])/g, '_$1').toLowerCase();
  },

//深度克隆
  pxdeepCopy(source) {
    var result;
    (source instanceof Array) ? (result = []) : (typeof(source) === "object") ? (source === null ? (result = "") : (result = {})) : (result = source);
    for (var key in source) {
      result[key] = (typeof source[key] === 'object') ? this.pxdeepCopy(source[key]) : source[key];
    }
    return result;
  },

  // 格式化时间 dateFormater('YYYY-MM-DD HH:mm', t) ==> 2019-06-26 18:30
  dateFormater(formater, t) {
    let date = t ? new Date(t) : new Date(),
      Y = date.getFullYear() + '',
      M = date.getMonth() + 1,
      D = date.getDate(),
      H = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds();
    return formater.replace(/YYYY|yyyy/g, Y)
      .replace(/YY|yy/g, Y.substr(2, 2))
      .replace(/MM/g, (M < 10 ? '0' : '') + M)
      .replace(/DD/g, (D < 10 ? '0' : '') + D)
      .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
      .replace(/mm/g, (m < 10 ? '0' : '') + m)
      .replace(/ss/g, (s < 10 ? '0' : '') + s)
  },

  //去除对象内的为  ''  、 null 、 undefined的字段
  removeNull(params) {
    for (let i in params) {
      if (params[i] === '' || params[i] === null || params[i] === undefined) {
        delete params[i]
      }
    }
    return params
  },

  //替换对象内的为  ''  、 null 、 undefined的字段
  removeNullNO(params) {
    for (let i in params) {
      if (params[i] === "" || params[i] === null || params[i] === undefined) {
        params[i] = "不详"
      }
    }
    ;
    return params
  },

  //获得星期
  timeWeek(val) {
    let week = new Date(val).getDay();
    switch (week) {
      case 0:
        week = '星期日';
        break;
      case 1:
        week = '星期一';
        break;
      case 2:
        week = '星期二';
        break;
      case 3:
        week = '星期三';
        break;
      case 4:
        week = '星期四';
        break;
      case 5:
        week = '星期五';
        break;
      case 6:
        week = '星期六';
        break;
      default:
        week = '未知'
    }
    ;
    return week;
  },

  // 将base64的图片转换为file文件
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  },

  //UX交互特效
  setUX(index) {
    if (index < 20) {
      var myFish = String(index).split('');
      var popped = myFish.pop();
      var time = myFish.toString().replace(/[,]/g, "") + '.' + popped;
    } else {
      var time = 0;
    }
    return {
      "animation-delay": time + "s",
      "-webkit-animation-delay": time + "s"
    }
  },



}
