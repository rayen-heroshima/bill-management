import mongoose from "mongoose";
const factureSchema = new mongoose.Schema({
    factureID: { type: String, required: true },
    conteurID: { type: String, required: true },
    STEG: { type: String, required: true },
    consom: { type: String, required: true },
    montant: { type: String, required: true },
    periodeDeConsommation: { type: String, required: true },
    date: { type: Date, required: true }
}, { timestamps: true });

const Facture=mongoose.model("Facture",factureSchema);
export default Facture;
