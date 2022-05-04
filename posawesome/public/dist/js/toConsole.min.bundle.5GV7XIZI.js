(() => {
  // ../posawesome/posawesome/public/js/toConsole.js
  $(function() {
    frappe.realtime.on("toconsole", function(data) {
      data.forEach((element) => {
        console.log(element);
      });
    });
  });
})();
//# sourceMappingURL=toConsole.min.bundle.5GV7XIZI.js.map
