module.exports = {
  reg: {
    isNumber(val) {
      const iosReg = /\d+/i;
      return iosReg.test(val);
    },
  },

};
