export * from "./lib/api/collections/Topics";

import { i18n, library, addRoute, replaceComponent } from "meteor/citizensay:core";
import { addField } from "meteor/citizensay:workflows";

import { faList, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";

import { TopicComp } from "./lib/ui/components/Topics";
import { Active } from "./lib/ui/components/workflows/Active";

import { Tags } from "./lib/ui/components/workflows/Tags";

i18n.addResource("en", "groups", "learn", "Learn")
    .addResources("en", "tiles", {
        topics: "Topics",
        topicsDesc: "My topics of interest"
    })
    .addResources("en", "topics", {
        topic: "Topic",
        topics: "Topics",

        description: "Description",

        liked: "My interests",
        explore: "Explore topics",

        addTopic: "Add Topic",
        create: "Create",

        search: "Search",
        sortBy: "Sort by",

        relatedWorkflows: "Related Workflows",
        participate: "Participate",

        like: "like",
        like_plural: "likes",
        likeWithCount: "{{count}} like",
        likeWithCount_plural: "{{count}} likes",

        more: "More"
    })
    .addResource("en", "editors", "relatedTopics", "Related Topics");

library.add(
    faList,
    faSearch,
    faTimes,
    faHeartReg
);

addRoute({
    path: "/topics",
    component: TopicComp
});

replaceComponent({
    path: "/active",
    component: Active
});

addField("basic", Tags);