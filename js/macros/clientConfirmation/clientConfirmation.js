(function (m) {
  function dosomething() {
    let self = this;
    function downloadAnyFile(obj) {
      self.$store.commit("loading", true);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", obj.url);
      xhr.timeout = 40000000;
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.responseType = "blob";
      xhr.onload = function () {
        if (this.status === 200) {
          var blob = new Blob([xhr.response]);
          const url = window.URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = obj.filename;
          a.click();
          setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(obj.data)
              , 100
          })
          self.$store.commit("loading", false);
        }
        else
          self.$store.commit("loading", false);
      };
      xhr.send(obj.data);
    }
    let tempArry = [];
    this.checkedItemList.map((el, index) => {
      let tempObj = {};
      tempObj.ORDER_ID = el.ORDER_ID;
      tempArry.push(tempObj);
    });
    let vObj = {
      data: []
    };
    (function fn() {
      (vObj["_ignore_prc_con"] = this.ignore_prc_con),
        this.$store.commit("loading", true);
      this.$credCAPI
        .collection(
          `etf/order/report_detail/${tempArry[0].ORDER_ID}`
        )
        .create({ body: vObj })
        .then((response) => {
          const vDownloadObj = {};
          let reportid = response.reportid;
          let v_reporttype = "pdf";
          let v_refreshfunc = response.refreshfunc;
          let sessionid = sessionStorage.getItem("sessionid");
          let paramdata = JSON.stringify(response.JString);
          let v_repname = "ConfirmationReport".replace(/[!@#/$%^&*(),.?":{}|<>]/g, " ");
          var vData =
            "reportid=" +
            reportid +
            "&sessionid=" +
            sessionid +
            "&JString=" +
            paramdata +
            "&reportType=" +
            v_reporttype +
            "&refreshfunc=" +
            v_refreshfunc +
            "&isSQL=1&filter=[]";
          vDownloadObj.data = vData;
          vDownloadObj.filename = v_repname + "." + v_reporttype;
          vDownloadObj.url = "/IWEBZ/Framewrk/Reporting_new.jsp";
          downloadAnyFile(vDownloadObj);
          this.$store.commit("loading", false);
        })
        .catch((error) => console.error(error));
    }.call(this));
  }
  m.register('clientConfirmation', dosomething)
})(_macro)
