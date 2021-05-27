(function (m) {
  function dosomething() {
    /*...write your code here */
    this.$showNotificationSpinner('Downloading...');
    const vObj = {
      "data": {
        "filter": []
      }
    };
    this.$credCAPI
      .collection(`interface/scheme/download/xls`)
      .read({ body: vObj })
      .then((result) => {
        console.log('result', result);
        if (result.status === "unsuccess") return;
        var blob = new Blob([result]);
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = 'data.xlsx';
        a.click();
        this.$closeNotificationSpinner();
      })
      .catch((error) => {
        this.$closeNotificationSpinner();
        console.error(error)
      });
  }
  m.register('downloadreport', dosomething)
})(_macro)
