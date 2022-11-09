
import _ from 'underscore'

exports.customer = {
    name: 'Kikinha',
    email: 'kikinhadopix@pix.com',
    password: 'pwd123',
    is_provider: false
}

exports.provider = {
    name: 'Gigi Maria',
    email: 'gigimariadopix@pix.com',
    password: 'pwd123',
    is_provider: true  
}

exports.appointment = {
    hour: _.sample(['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'])
}

