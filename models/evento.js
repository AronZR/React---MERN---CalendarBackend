const {Schema, model} = require('mongoose');

const eventoSchema= Schema({

    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    }

});

eventoSchema.method('toJSON',function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('evento', eventoSchema);