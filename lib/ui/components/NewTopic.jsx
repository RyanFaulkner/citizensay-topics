import React from "react";

import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const NewTopic = ({ setShow }) => {
    const { t } = useTranslation("topics");
    return (
        <Form onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            Meteor.call("topics.insert", e.target.topic.value, e.target.description.value, (e) => !(e) && setShow(false));
        }}>
            {
                ["topic", "description"].map(name =>
                    <Form.Group key={name}>
                        <Form.Label>{ t(name) }</Form.Label>
                        <Form.Control name={name}/>
                    </Form.Group>
                )
            }
            <Button
                variant="success"
                type="submit"
            >
                { t("create") }
            </Button>
        </Form>
    );
};