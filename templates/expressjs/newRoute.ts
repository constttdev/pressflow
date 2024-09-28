const express = require("express");
const {{componentName}} = express.Router();

{{componentName}}.get("/{{componentName}}", (req, res) => {
  res.send("Why did the C++ programmer get lost? He took the wrong branch");
});

export default {{componentName}};
