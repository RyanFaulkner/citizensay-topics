import React, { useState } from "react";

import { useTracker } from "meteor/react-meteor-data";
import { Topics } from "../../../api/collections/Topics";
import { Workflows } from "meteor/citizensay:workflows";

import { useTranslation } from "react-i18next";

import { CardColumns } from "react-bootstrap";
import { WorkflowCard } from "meteor/citizensay:workflows";

import Select from "react-select";

export const Active = () => {
    const { t } = useTranslation();
    const [ filters, setFilters ] = useState([]);
    const { workflows, topics } = useTracker(() => {
        Meteor.subscribe("workflows");
        Meteor.subscribe("topics");
        return {
            topics: Topics.find().fetch(),
            workflows: Workflows.find({
                $or: [
                    { participants: "public" },
                    { owner: Meteor.userId() }
                ]
            }).fetch()
        };
    });
    return (
        <>
            <h2>{ t("explore") }</h2>

            <Select
                isMulti
                options={topics.map(topic => ({value: topic._id, label: topic.text}))}
                value={filters}
                onChange={f => setFilters(f)}
                placeholder={ t("filterByTopic") }
            />

            <CardColumns>
                {
                    workflows
                        .filter(workflow => filters.some(f => Array.isArray(workflow.topics) && workflow.topics.findIndex(topic => topic.label === f.label) > -1))
                        .map(workflow =>
                            <WorkflowCard
                                key={workflow._id}
                                workflow={workflow}
                                filters={filters}
                                setFilters={setFilters}
                            />
                        )
                }
            </CardColumns>
        </>
    );
};