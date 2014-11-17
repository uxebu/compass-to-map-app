var timeUtil = {
  timePassedSince: function(date) {
    return +(new Date) - +(date)
  }
};

module.exports = timeUtil;