const { Schema, model } = require('mongoose');

const SubtaskSchema = new Schema({
    text: { type: String, required: true },
    date: { type: Date, required: true },
});

const TaskSchema = new Schema({
    important: { type: Boolean, default: false },
    user: { type: String, required: true },
    text: { type: String, required: true },
    subtasks: { type: [SubtaskSchema], default: [] },
    date: { type: Date, required: true },
});

module.exports = model('Task', TaskSchema);