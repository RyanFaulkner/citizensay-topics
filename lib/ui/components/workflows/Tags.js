import React from "react";

import { useTranslation } from "react-i18next";

import { useTracker } from "meteor/react-meteor-data";
import { Topics } from "meteor/citizensay:topics";

import { Form } from "react-bootstrap";
import Select from "react-select";

export const Tags = ({ workflow }) => {

    const { t } = useTranslation("editors");

    const { topics } = useTracker(() => {
        Meteor.subscribe("topics");
        return {
            topics: Topics.find().fetch()
        }
    });

    return (
        <>
            <br/>
            <Form.Group>
                <Form.Label>
                    { t("relatedTopics") }
                </Form.Label>
                <Select
                    options={topics.map(t => ({label: t.text, value: t._id}))}
                    value={workflow.topics}
                    onChange={topics => Meteor.call("workflows.update", workflow._id, { topics })}
                    isMulti
                    isSearchable
                />
            </Form.Group>
        </>
    );
};