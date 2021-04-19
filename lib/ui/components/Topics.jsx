import React, { useState } from "react";

import { useTracker } from "meteor/react-meteor-data";
import { Topics as T } from "../../api/collections/Topics";

import { useTranslation } from "react-i18next";
import { Tab, Tabs } from "react-bootstrap";

import { TopicForm } from "./TopicForm";
import { TopicTile } from "./TopicTile";

export const colours = [
    'MEDIUMAQUAMARINE',
    'DARKSEAGREEN',
    'MEDIUMSEAGREEN',
    'SEAGREEN',
    'LIGHTSEAGREEN',
    'DARKCYAN',
    'TEAL'
];
export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const TopicComp = () => {
    const { t } = useTranslation("topics");
    const { user, topics } = useTracker(() => {
        Meteor.subscribe("topics");
        return {
            user: Meteor.userId(),
            topics: T.find({}).fetch()
        };
    });
    const [ search, setSearch ] = useState("");
    const [ sort, setSort ] = useState("");
    const liked = topics.filter((topic) => Array.isArray(topic.likes) && topic.likes.includes(user));
    return (
        <>
            <h2>{ t("topics") }</h2>
            <TopicForm setters={[setSearch, setSort]}/>
            <Tabs defaultActiveKey="liked">
                {
                    [
                        {
                            key: "liked",
                            topics: liked
                        },
                        {
                            key: "explore",
                            topics: topics
                        }
                    ].map(tab =>
                        <Tab
                            key={tab.key}
                            eventKey={tab.key}
                            title={ t(tab.key) }
                        >
                            <div className="tile-container">
                                {
                                    tab.topics
                                        .filter(topic => topic.text.match(new RegExp(search, "i")))
                                        .sort((t1, t2) => {
                                            switch(sort) {
                                                case "popularity":
                                                    return t2.likes.length - t1.likes.length;
                                                case "alphabetic":
                                                    return t1.text.toLowerCase().localeCompare(t2.text.toLowerCase());
                                                case "!alphabetic":
                                                    return -t1.text.toLowerCase().localeCompare(t2.text.toLowerCase());
                                                case "recent":
                                                    return t1.createdAt - t2.createdAt;
                                                default:
                                                    return;
                                            }
                                        })
                                        .map(topic =>
                                            <TopicTile key={topic._id} topic={topic}/>
                                        )
                                }
                                <br style={{clear: "both"}}/>
                            </div>
                        </Tab>
                    )
                }
            </Tabs>
        </>
    );
};