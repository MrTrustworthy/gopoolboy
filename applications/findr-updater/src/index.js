const {indexCrumb, voteCrumb} = require("./elastic");
const {consume, topics} = require("./kafka");

consume({
    [topics.CRUMBS_TOPIC]: indexCrumb,
    [topics.VOTES_TOPIC]: voteCrumb
});






