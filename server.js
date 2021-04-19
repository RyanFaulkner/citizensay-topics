export * from "./lib/api/index";

import { Groups, Tiles } from "meteor/citizensay:core";

Meteor.startup(() => {

    const group = "learn",
          _id = "topics";

    if (!Groups.findOne(group))
        Groups.insert({_id: group});

    if (!Tiles.findOne(_id))
        Tiles.insert({
            _id,
            group,
            icon: "list",
            color: "rgb(56,170,61)",
            size: "xlarge"
        });

});