import React from 'react';

import { useTracker } from 'meteor/react-meteor-data';
import { Workflows } from 'meteor/citizensay:workflows';

import { useHistory } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { Votes } from 'meteor/citizensay:core';
import { Button, ListGroup } from 'react-bootstrap';


export const TopicItem = ({ topic }) => {
    if(!topic)
        return null;

    const { t } = useTranslation("topics");
    let history = useHistory();

    let { workflows } = useTracker(() => {
        Meteor.subscribe("workflows");
        return {
            workflows: Workflows.find({'topics.label': topic.text}).fetch()
        };
    });

    return (
        <>
            <h4>{ topic.text }</h4>
            <p>{ topic.description }</p>
            <span>
                { t('like', {count: Array.isArray(topic.likes) ? topic.likes.length : 0}) },
                {
                    topic.likes &&
                        <Votes ids={topic.likes}/>
                }
            </span>
            {
                (Array.isArray(workflows) && workflows.length > 0) &&
                    <>
                        <br/>
                        <hr/>
                        <strong>{ t('relatedWorkflows') }</strong>
                        <ListGroup>
                            {
                                workflows.map(workflow =>
                                    <ListGroup.Item key={workflow._id}>
                                        { workflow.title }
                                        <Button
                                            size="sm"
                                            variant="outline-success"
                                            style={{float: "right"}}
                                            onClick={() => history.push("/active/" + workflow._id)}
                                        >
                                            { t('participate') }
                                        </Button>
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </>
            }
        </>
    );
};