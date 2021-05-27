(function (m) {
  function dosomething() {
    /*...write your code here */
    let tempArry = [];
    this.checkedItemList.map((el, index) => {
      let tempObj = {};
      tempObj.ORDER_ID = el.ORDER_ID;
      tempArry.push(tempObj);
    });
    this.$router.push(`${this.$route.path}/rbi_rate?reference=${tempArry[0].ORDER_ID}&scope=generate`);
  }
  m.register('rbi_rate', dosomething)
})(_macro)
