const { Schema, model } = require('mongoose');

const VeryCoolSchema = new Schema({
    _id: Schema.Types.ObjectId,
    ServerID: { type: String, default: '' },
    MutedRoleID: { type: String },
    MuteDurationMinute: { type: Number, default: 60 },
    PunishLogChannelID: { type: String },
    FiltredWords:  { type: Array, default: [] },
    WhiteListMembers:  { type: Array, default: [] },
    WhiteListRoles:  { type: Array, default: [] },
    WhiteListChannels:  { type: Array, default: [] },
    BlueListMembers: { type: Array, default: [] },
    BlackListMembers: { type: Array, default: [] },
    CharacterLimit: { type: Boolean, default: false }, 
    InviteGuard: { type: Boolean, default: false }, 
    LinkGuard: { type: Boolean, default: false }, 
    MassPingGuard: { type: Boolean, default: false }, 
    BadWordGuard: { type: Boolean, default: false }, 
    SpamGuard: { type: Boolean, default: false }
});

module.exports = model('ChatGuard', VeryCoolSchema);
