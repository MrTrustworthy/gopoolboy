const {indexCrumb, voteCrumb} = require("./elastic");
const {consume, topics} = require("./kafka");
const {logger} = require("./log");

logger.info("Starting consumer", {topics});


consume({
    [topics.CRUMBS_TOPIC]: indexCrumb,
    [topics.VOTES_TOPIC]: voteCrumb
});






