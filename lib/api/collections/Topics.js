import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Topics = new Mongo.Collection('topics');

Meteor.methods({
    'topics.insert'(text, description) {
        check(text, String);
        check(description, String);
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        Topics.insert({
            text,
            description,
            createdAt: new Date,
            owner: this.userId
        })
    },
    'topics.remove'(topicId) {
        check(topicId, String);
        const topic = Topics.findOne(topicId);
        if (!topic) {
             throw new Meteor.Error('Unrecognised topic id');
        }
        if (!this.userId || topic.owner !== this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        Topics.remove(topicId);
    },
    'topics.like'(topicId) {
        check(topicId, String);
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        const topic = Topics.findOne(topicId);
        if (!Array.isArray(topic.likes)) {
            Topics.update(topicId, {
                $set: {
                    likes: [ this.userId ]
                }
            });
        } else {
            Topics.update(topicId, {
                [topic.likes.includes(this.userId) ? "$pull" : "$addToSet"]: {
                    likes: this.userId
                }
            });
        }
    }
});

if (Meteor.isServer)
    Meteor.publish('topics', () => Topics.find());