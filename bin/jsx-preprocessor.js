// Transform JSX to js.
// Used by Jest.
var ReactTools = require('react-tools');
module.exports = {
    process: function(src, path) {
        return ReactTools.transform(src);
    }
};
