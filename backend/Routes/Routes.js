import express from 'express';
import { logIn,InsertMany,stegData,createConteur ,createFacture,getFacture,SendEmail,DeleteFacture,getFacturebyID,updateFacture,getConteur,deleteConteur,updateConteur,getConteurbyID,getSteg,DeleteSteg,getStegByID,updateSteg,getAllUser,addUser,deleteUser,updateUser} from '../Controllers/controllers.js';
const router = express.Router();
router.post('/sendEmailAlert', SendEmail);
router.get("/getFacture",getFacture);
router.post('/createFacture', createFacture);
router.post('/createConteur', createConteur);
router.post('/login', logIn);
router.post('/api/steg', InsertMany);
router.post('/insert', stegData);
router.delete('/deleteFacture/:id', DeleteFacture);
router.get('/getFacturebyID/:id', getFacturebyID);
router.put('/updateFacture/:id', updateFacture);
router.get('/GetConteur', getConteur);
router.delete('/DeleteConteur/:id', deleteConteur);
router.put('/updateConteur/:id', updateConteur);
router.get('/getConteurbyID/:id', getConteurbyID);
router.get('/getSteg', getSteg);
router.delete('/deleteSteg/:id',DeleteSteg );
router.get('/getStegByID/:id',getStegByID);
router.put('/updateSteg/:id',updateSteg);
router.get('/getAllUser',getAllUser);
router.post('/addUser',addUser);
router.delete('/deleteUser/:id',deleteUser);
router.put('/updateUser/:id',updateUser);
export default router;
