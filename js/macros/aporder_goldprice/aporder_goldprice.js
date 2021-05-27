
(function (m) {
  function dosomething() {
    /*...write your code here */
    let tempArry = [];
    this.checkedItemList.map((el, index) => {
      let tempObj = {};
      tempObj.ORDER_ID = el.ORDER_ID;
      tempObj.ORDER_UNIT = el.ORDER_UNIT;
      tempArry.push(tempObj);
    });
    if (tempArry[0].ORDER_UNIT !== 0) {
      this.$router.push(`${this.$route.path}/gold_price?reference=${tempArry[0].ORDER_ID}&scope=generate`);
    } else {
      this.$_showAlert(
        "Information",
        `Order unit should greter than zero`
      );
    }
  }
  m.register('aporder_goldprice', dosomething)
})(_macro)




