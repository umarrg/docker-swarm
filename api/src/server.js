const mysqlDao = require('./mysqlDao')
const dbDao = new mysqlDao('localhost', 'secret', 'contactDb')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const api = express()
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({entended: true}))
api.use(cors())
api.use(morgan('tiny'))

const serverId = Math.ceil(Math.random()*10000)

api.use((req, res, next) => {
    res.set('ServerId', serverId)
    next()
})

const URL = '/api/v1'
api.get(`${URL}/`, (req, res) => {
    res.json({status: 'success', payload: 'Contact API Microservice'})
})

//Get single Contact
api.get(`${URL}/contact/:id`, async (req, res) => {
    const id = parseInt(req.params.id)
    const contact = await dbDao.getContact(id)
    res.json({status: 'success', payload: contact})
});

//Get all contacts
api.get(`${URL}/contact`, async (req, res) => {
    const contacts = await dbDao.getContacts()
    res.json({status: 'success', payload: contacts})
});

// //Add contact
// api.get(`${URL}/contact`, async (req, res) => {
//     const contacts = await dbDao.getContacts()
//     res.json({status: 'success', payload: contacts})
// });


//Add contact
api.post(`${URL}/contact`, async (req, res) => {
    const { fname, lname, phone } = req.body;
    const addContact = await dbDao.addContact(fname, lname, phone);
    res.status(200).json({status: 'success', payload: addContact});
});

//Delete contact
api.delete(`${URL}/contact/:id`, async (req, res) => {
    const id = parseInt(req.params.id);
    const delContact = await dbDao.delContact(id);
    res.status(200).json({status: 'success', payload: delContact});
});

//Update contact
api.put(`${URL}/contact/:id`, async (req, res) => {
    const id = req.params.id;
    const { fname, lname, phone } = req.body;
    const updateContact = await dbDao.updateContacts(id, fname, lname, phone);
    res.status(200).json({status: 'success', payload: updateContact});
});




api.listen(4000, () => {
    console.log('Contacts Microservice Listening on Port 4000')
})