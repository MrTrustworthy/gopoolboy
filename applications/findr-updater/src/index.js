const {indexCrumb} = require("./elastic");
const {consume, topics} = require("./kafka");

consume(topics.CRUMBS_TOPIC, indexCrumb);






