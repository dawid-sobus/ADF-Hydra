const express = require('express')
const clientController = require('../controllers/clientsControllers')
const router = express.Router()

var { verifyToken } = require('./loginRegisterHomeRoutes')

router.get('/', verifyToken, clientController.viewClients)

router.get('/:id', verifyToken, clientController.detailsClientsTasks)

router.post('/:id', clientController.postDetailsClientsTasks)

router.get('/:id/dodaj_usluge', verifyToken, clientController.addTask)

router.post('/:id/dodaj_usluge', clientController.postAddTask)

router.get('/:id/edytuj_klienta', verifyToken, clientController.editClient)

router.post('/:id/edytuj_klienta', clientController.postEditClient)

router.get('/:id/usun_klienta', verifyToken, clientController.deleteClient)

router.delete('/:id/usun_klienta', clientController.deleteClientDelete)

router.get('/:id/:taskId/dodaj_powiazana_usluge', verifyToken, clientController.addRelatedTask)

router.post('/:id/:taskId/dodaj_powiazana_usluge', clientController.postAddRelatedTask)

router.get('/:id/:taskId/edytuj_usluge', verifyToken, clientController.editTask)

router.post('/:id/:taskId/edytuj_usluge', clientController.postEditTask)

router.get('/:id/:taskId/edytuj_pliki', verifyToken, clientController.editFiles)

router.post('/:id/:taskId/edytuj_pliki', clientController.postEditFiles)

router.get('/:id/:taskId/usun_usluge', verifyToken, clientController.deleteTask)

router.post('/:id/:taskId/usun_usluge', clientController.deleteTaskDelete)

router.get('/:id/:taskId/edytuj_pliki/:file', verifyToken, clientController.deleteFiles)

router.delete('/:id/:taskId/edytuj_pliki/:file', clientController.deleteFilesDelete)

router.get('/:id/:taskId/:invoice', verifyToken, clientController.viewPdfInv)

router.get(':id/:taskId/:postWarrantyProtocols', verifyToken, clientController.viewPdfProt)

module.exports = router