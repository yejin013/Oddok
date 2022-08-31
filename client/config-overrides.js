const { alias, configPaths } = require("react-app-rewire-alias");

const aliasMap = configPaths("./jsconfig.path.json");

module.exports = alias(aliasMap);
