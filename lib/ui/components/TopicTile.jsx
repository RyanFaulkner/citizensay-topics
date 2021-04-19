import React, { useState } from "react";

import { Badge, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { colours, randomInt } from "./Topics";
import { TopicItem } from "./TopicItem";

import { useTranslation } from "react-i18next";

export const TopicTile = ({ topic }) => {
    const [ show, setShow ] = useState(false);

    const liked = Array.isArray(topic.likes) && topic.likes.includes(Meteor.userId());

    const deleteTopic = () => Meteor.call("topics.remove", topic._id);
    const like = () => Meteor.call("topics.like", topic._id);

    const { t } = useTranslation("topics");

    return (
        <>
            <div
                className="well flip-container small"
                style={{
                    minWidth: 100,
                    minHeight: 100
                }}
            >
                <div
                    className="tile flipper"
                    style={{
                        background: colours[randomInt(0, colours.length-1)]
                    }}
                >
                    <div className="front">
                        <p style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: "1.2em"
                        }}>
                            { topic.text }
                        </p>
                        <span>
                            <Badge>{ Array.isArray(topic.likes) && topic.likes.length }</Badge>
                            <FontAwesomeIcon icon="heart"/>
                        </span>
                    </div>
                    <div className="back">
                        {
                            topic.owner === Meteor.userId() &&
                                <FontAwesomeIcon
                                    icon="times"
                                    style={{
                                        position: "absolute",
                                        top: 10, right: 10,
                                    }}
                                    onClick={deleteTopic}
                                />
                        }
                        <label>
                            <input
                                type="checkbox"
                                checked={liked}
                                hidden
                                onChange={like}
                            />
                            <FontAwesomeIcon
                                icon={[liked ? "fas": "far", "heart"]}
                                size="3x"
                                style={{
                                    filter: "drop-shadow(0px 1px 1px black)",
                                }}
                            />
                            <Button
                                variant="link"
                                style={{
                                    position: "absolute",
                                    bottom: 10, right: 10,
                                    zIndex: 100,
                                }}
                                onClick={() => setShow(true)}
                            >
                                { t("more") }
                            </Button>
                        </label>
                    </div>
                </div>
            </div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                    <TopicItem topic={topic}/>
                </Modal.Body>
            </Modal>
        </>
    );
};