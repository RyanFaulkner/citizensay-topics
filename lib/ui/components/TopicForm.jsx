import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import { Button, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Select from 'react-select';

import { NewTopic } from "./NewTopic";

export const TopicForm = ({ setters }) => {
    const [ show, setShow ] = useState(false);

    const [ setSearch, setSort ] = setters;
    const search = (e) => setSearch(e.target.value);
    const sort = (e) => setSort(e.value);

    const { t } = useTranslation("topics");
    return (
        <>
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Button
                            variant="success"
                            size="md"
                            onClick={() => setShow(true)}
                        >
                            { t("addTopic") }
                        </Button>
                    </Form.Group>
                    <Form.Group as={Col} xs={8}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <Button disabled variant="secondary">
                                    <FontAwesomeIcon icon="search"/>
                                </Button>
                            </InputGroup.Prepend>
                            <Form.Control
                                placeholder={ t("search") }
                                onChange={search}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Select
                            placeholder={ t("sortBy") }
                            onChange={sort}
                            options={[
                                {
                                    value: "",
                                    label: <FontAwesomeIcon icon="hourglass-start"/>
                                },
                                {
                                    value: "new",
                                    label: <FontAwesomeIcon icon="hourglass-end"/>
                                },
                                {
                                    value: "alphabetic",
                                    label: <FontAwesomeIcon icon="sort-alpha-down"/>
                                },
                                {
                                    value: "!alphabetic",
                                    label: <FontAwesomeIcon icon="sort-alpha-up"/>
                                },
                                {
                                    value: "popularity",
                                    label: <FontAwesomeIcon icon="heart"/>
                                }
                            ]}
                        />
                    </Form.Group>
                </Form.Row>
            </Form>
            <Modal
                show={show}
                onHide={() => setShow(false)}
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                    <NewTopic setShow={setShow}/>
                </Modal.Body>
            </Modal>
        </>
    );
};