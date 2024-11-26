import mongoose from "mongoose";

const monthSchema = new mongoose.Schema({
    indexAncien: { type: String,default:" " },
    indexNouveau: { type: String,default:" " },
    consom: { type: String,default:" " },
    periodeDeConsommation: { type: String,default:" " },
    montant: { type: String,default:" " }
});

const stegSchema = new mongoose.Schema({
    nomSite: { type: String },
    reference: { type: String },
    ID_compteur: { type: String },
    STEG: { type: String },
    adresse_installation: { type: String },
    structure_de_paiment: { type: String },
    nature_Site: { type: String },
    Proprietaire: { type: String },
    nature_equipe: { type: String },
    janvier: monthSchema,
    février: monthSchema,
    mars: monthSchema,
    avril: monthSchema,
    mai: monthSchema,
    juin: monthSchema,
    juillet: monthSchema,
    août: monthSchema,
    septembre: monthSchema,
    octobre: monthSchema,
    novembre: monthSchema,
    décembre: monthSchema,
    Total: {
        consomTotal: { type: String },
        montantTotal: { type: String }
    }
});

const Steg = mongoose.model("Steg", stegSchema);
export default Steg;
