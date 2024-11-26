import mongoose from "mongoose";

const ConteurSchema = new mongoose.Schema({
    conteurID: { type: String, required: true },
    ConteurLieu: { type: String, required: true },
    STEG: { type: String, required: true }},{ timestamps: true });

const Conteur = mongoose.model("Conteur", ConteurSchema);
export default Conteur;