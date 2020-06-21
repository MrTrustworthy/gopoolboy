const {indexCrumb, voteCrumb} = require("./elastic");
const {consume, topics} = require("./kafka");
const {logger} = require("./log");

logger.info("Starting consumer", {topics});

const handleError = (wrapped, pipe) => {
    return (...args) => {
        try {
            return wrapped(...args);
        } catch (e) {
            logger.error("Error when trying to process message", {pipe, error: e});
        }
    };
};

consume({
    [topics.CRUMBS_TOPIC]: handleError(indexCrumb, "indexCrumb"),
    [topics.VOTES_TOPIC]: handleError(voteCrumb, "voteCrumb")
});






