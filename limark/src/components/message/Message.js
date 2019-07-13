"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

let React = _interopRequireWildcard(require("react"));

let _RcNotification = _interopRequireDefault(require("../Notification/RcNotification"));

let _index = _interopRequireDefault(require("../Icon/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { let newObj = {}; if (obj != null) { for (let key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { let desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/* global Promise */
let defaultDuration = 3;
let defaultTop;
let messageInstance;
let key = 1;
let prefixCls = 'fishd-message';
let transitionName = 'move-up';
let getContainer;
let maxCount;

function getMessageInstance(callback) {
  if (messageInstance) {
    callback(messageInstance);
    return;
  }

  _RcNotification.default.newInstance({
    prefixCls: prefixCls,
    transitionName: transitionName,
    style: {
      top: defaultTop
    },
    getContainer: getContainer,
    maxCount: maxCount
  }, function (instance) {
    if (messageInstance) {
      callback(messageInstance);
      return;
    }

    messageInstance = instance;
    callback(instance);
  });
}

function notice(content) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultDuration;
  let type = arguments.length > 2 ? arguments[2] : undefined;
  let onClose = arguments.length > 3 ? arguments[3] : undefined;
  let iconType = {
    info: 'hints-notification',
    success: 'hints-success',
    error: 'hints-error',
    warning: 'hints-warning',
    loading: 'load-line'
  }[type];

  if (typeof duration === 'function') {
    onClose = duration;
    duration = defaultDuration;
  }

  let target = key++;
  let closePromise = new Promise(function (resolve) {
    let callback = function callback() {
      if (typeof onClose === 'function') {
        onClose();
      }

      return resolve(true);
    };

    getMessageInstance(function (instance) {
      instance.notice({
        key: target,
        duration: duration,
        style: {},
        content: React.createElement("div", {
          className: "".concat(prefixCls, "-custom-content ").concat(prefixCls, "-").concat(type)
        }, React.createElement(_index.default, {
          type: iconType,
          spinning: type === 'loading'
        }), React.createElement("span", null, content)),
        onClose: callback
      });
    });
  });

  let result = function result() {
    if (messageInstance) {
      messageInstance.removeNotice(target);
    }
  };

  result.then = function (filled, rejected) {
    return closePromise.then(filled, rejected);
  };

  result.promise = closePromise;
  return result;
}

let _default = {
  info: function info(content, duration, onClose) {
    return notice(content, duration, 'info', onClose);
  },
  success: function success(content, duration, onClose) {
    return notice(content, duration, 'success', onClose);
  },
  error: function error(content, duration, onClose) {
    return notice(content, duration, 'error', onClose);
  },
  // Departed usage, please use warning()
  warn: function warn(content, duration, onClose) {
    return notice(content, duration, 'warning', onClose);
  },
  warning: function warning(content, duration, onClose) {
    return notice(content, duration, 'warning', onClose);
  },
  loading: function loading(content, duration, onClose) {
    return notice(content, duration, 'loading', onClose);
  },
  config: function config(options) {
    if (options.top !== undefined) {
      defaultTop = options.top;
      messageInstance = null; // delete messageInstance for new defaultTop
    }

    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }

    if (options.prefixCls !== undefined) {
      prefixCls = options.prefixCls;
    }

    if (options.getContainer !== undefined) {
      getContainer = options.getContainer;
    }

    if (options.transitionName !== undefined) {
      transitionName = options.transitionName;
      messageInstance = null; // delete messageInstance for new transitionName
    }

    if (options.maxCount !== undefined) {
      maxCount = options.maxCount;
      messageInstance = null;
    }
  },
  destroy: function destroy() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  }
};
exports.default = _default;