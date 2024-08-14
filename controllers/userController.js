const UserModel = require('../models/user');
const User = require('../models/user'); 

exports.getClients = async (req, res) => {
    try {
      const clients = await UserModel.find({ role: 'client' });
      res.status(200).json(clients, clients.cId , clients.address);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching clients', error });
    }
  };

exports.getSiteeng = async (req, res) => {
    try {
      const clients = await UserModel.find({ role: 'siteeng' });
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching clients', error });
    }
  };