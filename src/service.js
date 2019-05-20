const Monitor = require('ping-monitor')

const util = require('util')
const exec = util.promisify(require('child_process').exec)

const os = require('os')
const ARController = require('../arsdk/src/controller.js')

const SC_ADDR = '192.168.53.1'
const SC_ADB_PORT = 9050
const SC_ADB_HOST = `${SC_ADDR}:${SC_ADB_PORT}`

const FC_ADDR = '192.168.42.1'
const FC_PORT = 8888
const FC_ADB_PORT = 9050
const FC_ADB_HOST = `${FC_ADDR}:${FC_ADB_PORT}`

const CP_ADDR = '192.168.15.1'

/**
 * 
 */
const STATUS = {
  sc_online: false,
  fc_online: false,
  arsdk_online: false,
}

let sc_status_updater
function sc_update () {

}

/**
 * 
const sc_mon = new Monitor({
  address: SC_ADDR,
  port: SC_ADB_PORT,
  interval: (1 / 60) * 5, // every ten seconds
})

sc_mon.on('up', async function (response, state) {
  if (STATUS.sc_online) return

  console.info('SC Appears to be online, performing device configuration...')
  STATUS.sc_online = true

  // Attempt connection to SC2 ADB, retry indefinitely until connected.
  while (true) {
    try {
      console.info("Attempting to connect to SC device ADB...")
      var result = await exec(`adb connect ${SC_ADB_HOST}`)
      break
    } catch (e) {
      console.warn(e)
    }
  }

  // Setup C.H.U.C.K NAT routing in SC through ADB shell
  result = await exec(`adb -s ${SC_ADB_HOST} shell iptables -t nat --flush`)
  result = await exec(`adb -s ${SC_ADB_HOST} shell iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE`)

  // Enable ip forwarding on SC through ADB shell
  result = await exec(`adb -s ${SC_ADB_HOST} shell "echo 1 > /proc/sys/net/ipv4/ip_forward"`)

  // Setup C.H.U.C.K. route.
  try {
    result = await exec(`ip route add ${FC_ADDR} via ${SC_ADDR} dev usb0`)
  } catch (e) {
    // Ignoring RTNETLINK answers: File exists
  }

  await exec(`adb -s ${SC_ADB_HOST} shell /usr/bin/mpp_bb_cli on 8`)

  STATUS.sc_status = { configured: true }

  // Start SC status updater
  if (sc_status_updater) clearInterval(sc_status_updater)
  sc_status_updater = setInterval(sc_update, 4000)
})

sc_mon.on('down', function (response) {
  if (STATUS.sc_online) {
    console.info('SC OFFLINE')
    STATUS.sc_online = false
    STATUS.sc_status = undefined

    // Stop SC status updater
    if (sc_status_updater) {
      clearInterval(sc_status_updater)
      sc_status_updater = null
    }
  }
})

sc_mon.on('stop', function (mon) {
  console.warn('SC MONITOR STOPPED')
})

sc_mon.on('error', function (err) {
  if (STATUS.sc_online) {
    console.info('SC OFFLINE')
    STATUS.sc_online = false
    STATUS.sc_status = undefined
  }
})
 */

/**
 * 
const fc_mon = new Monitor({
  address: FC_ADDR,
  port: FC_PORT,
  interval: (1 / 60) * 5, // every ten seconds
})

fc_mon.on('up', async function (response, state) {
  if (!STATUS.fc_online) {
    console.info('FC ONLINE')
    STATUS.fc_online = true

    while (true) {
      try {
        console.info("Attempting to connect to FC device ADB...")
        var result = await exec(`adb connect ${FC_ADB_HOST}`)
        break
  
      } catch (e) {
        STATUS.fc_status = {
          error: 'Developer mode required, short press Disco power button two times.',
        }
      }
    }

    // Setup C.H.U.C.K NAT routing in SC through ADB shell
    result = await exec(`adb -s ${FC_ADB_HOST} shell iptables -t nat --flush`)
    result = await exec(`adb -s ${FC_ADB_HOST} shell iptables -t nat -A POSTROUTING -o usb0 -j MASQUERADE`)

    // Enable IP forwarding on SC through ADB shell
    result = await exec(`adb -s ${FC_ADB_HOST} shell "echo 1 > /proc/sys/net/ipv4/ip_forward"`)

    // Setup Avionics module route.
    try {
      let result = await exec(`ip route add ${CP_ADDR} via ${FC_ADDR} dev usb0`)
    } catch (e) {
      // Ignoring RTNETLINK answers: File exists
    }

    STATUS.fc_status = { configured: true }
  }
})

fc_mon.on('down', function (response) {
  if (STATUS.fc_online) {
    console.info('FC OFFLINE')
    STATUS.fc_online = false
    STATUS.fc_status = undefined
  }
})

fc_mon.on('stop', function (mon) {
  console.warn('FC MONITOR STOPPED')
})

fc_mon.on('error', function (err) {
  if (STATUS.fc_online) {
    console.info('FC OFFLINE')
    STATUS.fc_online = false
    STATUS.fc_status = undefined
  }
})
 */

/**
 * Setup JS/ARSDK controller to connect to SC2
 */
let arsdk
let arsdk_file = {}

const sleep = (delay) => new Promise((resolve, reject) => setTimeout(resolve, delay))

ARController('js-arsdk', os.hostname())
  .then(async controller => {
    while(true) {
      try {
        const connection = await controller.connectTo('192.168.53.1', 44444)
        arsdk = connection
        console.info("Controller successfully connected to device.")

        STATUS.arsdk_online = true

        connection.on('navdata', navdata => {
          arsdk_file = connection.getAll()
        })

        connection.sendCommand('common/Common/AllStates')
        connection.sendCommand('common/Settings/AllSettings')

        connection.sendCommand('skyctrl/Common/AllStates')
        connection.sendCommand('skyctrl/Settings/AllSettings')

        /**
         * Wait in loop until we get disconnected or an error occurs.
         */
        await new Promise((resolve, reject) => {
          connection.on('error', () => {
            console.info("Connection error:", error)
            arsdk = null
            STATUS.arsdk_online = false
            resolve()
          })

          connection.on('disconnect', () => {
            console.info("Connection disconnected...")
            arsdk = null
            STATUS.arsdk_online = false
            resolve()
          })
        })
      } catch (e) {
        console.error(e)
        arsdk = null
        STATUS.arsdk_online = false
        await sleep(1000)
      }
    }
  })
  .catch(console.error)

/**
 * 
 */
const express = require('express')

const app = express()
app.use(require('body-parser').json())

app.get('/status', (req, res) => {
  return res.status(200).json(STATUS)
})

app.get('/arsdk', (req, res) => {
  return res.status(200).json(arsdk_file)
})

const port = process.env.PORT || 6400
app.listen(port, () => {
  console.info('Service listening on http://0.0.0.0:' + port)
})