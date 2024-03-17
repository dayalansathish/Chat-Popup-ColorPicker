const express = require('express')
const { saveColor, getColor } = require('../Controller/color.controller')

const router = express.Router()

router.route('/saveColor').post(saveColor)
router.route('/getColor').get(getColor)

module.exports = router