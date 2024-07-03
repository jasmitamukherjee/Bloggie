const mongoose= require("mongoose");
const profanityFilterSchema = mongoose.Schema({
    bannedWords:[String],
});
module.exports=mongoose.model("ProfanityFilter",profanityFilterSchema);
