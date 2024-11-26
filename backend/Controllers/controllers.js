import User from '../Model/user.js';
import steg from '../Model/Steg.js';
import Conteur from '../Model/conteur.js';
import Facture from '../Model/Facture.js';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like Yahoo, Outlook, etc.
    auth: {
      user: 'rayen.hammami@esen.tn', // Your email address
      pass: 'Heroshima_123'   // Your email password or an app password
    }
  });
  
  // Email sending function
  const sendEmail = (to, subject, text) => {
    const mailOptions = {
      from: 'rayen.hammami@esen.tn',
      to: to,
      subject: subject,
      text: text,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };
  export const SendEmail = async (req, res) => {
    const { factureID, date, email } = req.body;

  sendEmail(
    email,
    'Urgent: Facture Deadline Approaching',
    `Facture ${factureID} is due soon. Deadline is ${date}.`
  );

  res.status(200).send('Email alert sent');
  }
export const createFacture = async (req, res) => {
    try {
        const { factureID,conteurID,STEG,consom,montant,periodeDeConsommation,date } = req.body;
        const facture = new Facture({ factureID,conteurID,STEG,consom,montant,periodeDeConsommation,date });
        await facture.save();
        

        res.status(201).json(facture);
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}
export const getFacture = async (req,res)=>{
    try {
        const facture = await Facture.find();
        res.status(200).json(facture);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const createConteur = async (req, res) => {
    try {
        const { conteurID, ConteurLieu, STEG } = req.body;
        const conteur =  new Conteur({ conteurID, ConteurLieu, STEG });
        await conteur.save();
        res.status(201).json(conteur);
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}

export const logIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser.password === password) {
            res.status(200).json({message: 'Login successful'});
        }else {
            res.status(404).json({message: 'Invalid credentials'});
        }
    }catch (error) {
        res.status(500).json({message: error.message});
    }

}

export const stegData = async (req, res) => {
    try {
        // Create a new instance of the Steg model with data from the request body
        const Steg = new steg(req.body);
        
        // Save the data to the database
        await Steg.save();
        
        // Send a success response
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        // Send an error response
        res.status(500).json({ message: error.message });
    }
};
export const InsertMany = async (req, res) => { try {
    const data = req.body.data;
    console.log(data);
    await steg.insertMany(data); // Insert multiple documents
    res.status(200).send('Data successfully inserted');
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Error inserting data');
  }};

  export const DeleteFacture = async (req, res) => {
    const { id } = req.params;
    console.log('Received ID for deletion:', id);
  
    try {
      // Find and delete the facture by factureID
      const result = await Facture.findOneAndDelete({ factureID: id });
  
      if (!result) {
        return res.status(404).send('No facture found with that ID');
      }
  
      res.status(200).send('Facture deleted successfully');
    } catch (error) {
      console.error('Error deleting facture:', error);
      res.status(500).send('Server error');
    }
  };
  export const getFacturebyID = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the facture by factureID
      const facture = await Facture.findOne({ factureID: id });
      res.status(200).json(facture);
    }catch (error) {
      console.error('Error fetching facture data:', error);
      res.status(500).send('Server error');
    }
  }
  export const updateFacture = async (req, res) => {
    const { id } = req.params;
    const { factureID, conteurID, STEG, consom, montant, periodeDeConsommation, date } = req.body;
  
    try {
      // Find the facture by factureID and update it
      const updatedFacture = await Facture.findOneAndUpdate(
        { factureID: id },
        { factureID, conteurID, STEG, consom, montant, periodeDeConsommation, date },
        { new: true }
      );
  
      res.status(200).json(updatedFacture);
    } catch (error) {
      console.error('Error updating facture:', error);
      res.status(500).send('Server error');
    }
  }
  export const getConteur = async (req,res)=>{
    try {
        const conteur = await Conteur.find();
        res.status(200).json(conteur);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const deleteConteur = async (req, res) => {
  const { id } = req.params;
  console.log('Received ID for deletion:', id);

  try {
    // Find and delete the facture by factureID
    const result = await Conteur.findOneAndDelete({ conteurID: id });

    if (!result) {
      return res.status(404).send('No Conteur found with that ID');
    }

    res.status(200).send('Conteur deleted successfully');
  } catch (error) {
    console.error('Error deleting facture:', error);
    res.status(500).send('Server error');
  }
}
export const getConteurbyID = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the facture by factureID
    const conteur = await Conteur.findOne({ conteurID: id }); 
    res.status(200).json(conteur);
  }catch (error) {
    console.error('Error fetching facture data:', error);
    res.status(500).send('Server error');
  }
}
export const updateConteur = async (req, res) => {
  const { id } = req.params;
  const { conteurID, ConteurLieu, STEG } = req.body;

  try {
    // Find the facture by factureID and update it
    const updatedConteur = await Conteur.findOneAndUpdate({conteurID:id},{conteurID:conteurID,conteurlieu:ConteurLieu,STEG:STEG},{new:true});
    res.status(200).json(updatedConteur);
  }catch (error) {
    console.error('Error updating facture:', error);
    res.status(500).send('Server error');
  } 
}

export const getSteg = async (req,res)=>{
    try {
        const Steg = await steg.find();
        res.status(200).json(Steg);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const DeleteSteg =async(req,res)=>{
  const { id } = req.params;
  console.log('Received ID for deletion:', id);
  try {
    const result = await steg.findOneAndDelete({ _id: id });
    if (!result) {
      return res.status(404).send('No Steg found with that ID');
    }
    res.status(200).send('Steg deleted successfully');
  } catch (error) {
    console.error('Error deleting Steg:', error);
    res.status(500).send('Server error');
    
  }
}
export const getStegByID = async (req, res) => {
  const { id } = req.params;
  const { nomSite, reference, ID_compteur, STEG, adresse_installation, structure_de_paiment, nature_Site, Proprietaire, nature_equipe, janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre, Total } = req.body;
  console.log("id",id);
  try {
    
    const updatedSteg = await steg.findOneAndUpdate(
      { _id: id },
      { nomSite, reference, ID_compteur, STEG, adresse_installation, structure_de_paiment, nature_Site, Proprietaire, nature_equipe, janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre, Total },
      { new: true }
    );

    res.json(updatedSteg);
  } catch (error) {
    console.error('Error updating Steg:', error);
    res.status(500).send('Server error');
  }
} 
export const updateSteg = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("the second one", req.body);

    const updatedSteg = await steg.findOneAndUpdate(
      { _id: id },
      {
        nomSite: req.body.nomSite,
        reference: req.body.reference,
        ID_compteur: req.body.ID_compteur,
        STEG: req.body.STEG,
        adresse_installation: req.body.adresse_installation,
        structure_de_paiment: req.body.structure_de_paiment,
        nature_Site: req.body.nature_Site,
        Proprietaire: req.body.Proprietaire,
        nature_equipe: req.body.nature_equipe,
        janvier: req.body.months.janvier,
        février: req.body.months.février,
        mars: req.body.months.mars,
        avril: req.body.months.avril,
        mai: req.body.months.mai,
        juin: req.body.months.juin,
        juillet: req.body.months.juillet,
        août: req.body.months.août,
        septembre: req.body.months.septembre,
        octobre: req.body.months.octobre,
        novembre: req.body.months.novembre,
        décembre: req.body.months.décembre,
        Total: req.body.Total
      },
      { new: true }
    );

    res.json(updatedSteg);
  } catch (error) {
    console.error('Error updating Steg:', error);
    res.status(500).send('Server error');
  }
};
export const getAllUser= async(req,res)=>{
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
export const deleteUser= async(req,res)=>{
  const { id } = req.params;
  console.log('Received ID for deletion:', id);
  try {
    const result = await User.findOneAndDelete({ _id: id });
    if (!result) {
      return res.status(404).send('No User found with that ID');
    }
    res.status(200).send('User deleted successfully');
  }
  catch (error) {
    console.error('Error deleting User:', error);
    res.status(500).send('Server error');
  }
}
export const addUser = async(req,res)=>{
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate({ _id:id },{ email:email, password:password },{new:true});
    res.status(200).json(updatedUser);
  }
  catch (error) {
    console.error('Error updating User:', error);
    res.status(500).send('Server error');
  }
}
