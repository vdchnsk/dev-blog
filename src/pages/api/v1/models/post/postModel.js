import { Schema, model, models } from 'mongoose'

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    liked: {
        type: Number,
        requiered: false,
        default: 0,
    },
    watched: {
        type: Number,
        requiered: false,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    bodyPreview: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
        default: [],
    },
})

module.exports = models.Post || model('Posts', PostSchema)
