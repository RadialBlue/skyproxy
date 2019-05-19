const Monitor = require('ping-monitor')

const util = require('util')
const exec = util.promisify(require('child_process').exec)

/**
 * 
 */
const STATUS = {
  sc_online: false,
  fc_online: false,
}

/**
 * 
 */
const sc_mon = new Monitor({
  address: '192.168.53.1',
  port: '9050',
  interval: (1 / 60) * 5, // every ten seconds
})

let sc_status_updater
function sc_update () {

}

sc_mon.on('up', async function (response, state) {
  if (STATUS.sc_online) return

  console.info('SC Appears to be online, performing device configuration...')
  STATUS.sc_online = true

  let result
  while (true) {
    try {
      console.info("Attempting to connect to SC device ADB...")
      result = await exec('adb connect 192.168.53.1:9050')
      break
    } catch (e) {
      console.warn(e)
    }
  }

  // Setup C.H.U.C.K NAT routing in SC through ADB shell
  result = await exec('adb -s 192.168.53.1:9050 shell iptables -t nat --flush')
  result = await exec('adb -s 192.168.53.1:9050 shell iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE')

  // Enable ip forwarding on SC through ADB shell
  result = await exec('adb -s 192.168.53.1:9050 shell "echo 1 > /proc/sys/net/ipv4/ip_forward"')

  // Setup C.H.U.C.K. route.
  try {
    result = await exec('ip route add 192.168.42.1 via 192.168.53.1 dev usb0')
  } catch (e) {
    // Ignoring RTNETLINK answers: File exists
  }

  await exec('adb -s 192.168.53.1:9050 shell /usr/bin/mpp_bb_cli on 8')

  STATUS.sc_status = { configured: true }

  // Start SC state updater
  if (sc_status_updater) clearInterval(sc_status_updater)
  sc_status_updater = setInterval(sc_update, 4000)
})

sc_mon.on('down', function (response) {
  if (STATUS.sc_online) {
    console.info('SC OFFLINE')
    STATUS.sc_online = false
    STATUS.sc_status = undefined
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

/**
 * 
 */
const fc_mon = new Monitor({
  address: '192.168.42.1',
  port: '8888',
  interval: (1 / 60) * 5, // every ten seconds
})

fc_mon.on('up', async function (response, state) {
  if (!STATUS.fc_online) {
    console.info('FC ONLINE')
    STATUS.fc_online = true

    let result
    while (true) {
      try {
        console.info("Attempting to connect to FC device ADB...")
        result = await exec('adb connect 192.168.42.1:9050')
        break
  
      } catch (e) {
        STATUS.fc_status = {
          error: 'Developer mode required, short press Disco power button two times.',
        }
      }
    }

    // Setup C.H.U.C.K NAT routing in SC through ADB shell
    result = await exec('adb -s 192.168.42.1:9050 shell iptables -t nat --flush')
    result = await exec('adb -s 192.168.42.1:9050 shell iptables -t nat -A POSTROUTING -o usb0 -j MASQUERADE')

    // Enable ip forwarding on SC through ADB shell
    result = await exec('adb -s 192.168.42.1:9050 shell "echo 1 > /proc/sys/net/ipv4/ip_forward"')


    // Setup Avionics module route.
    try {
      let result = await exec('ip route add 192.168.15.1 via 192.168.42.1 dev usb0')
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

/**
 * 
 */
const express = require('express')

const app = express()
app.use(require('body-parser').json())

app.get('/status', (req, res) => {
  return res.status(200).json(STATUS)
})

const port = process.env.PORT || 6400
app.listen(port, () => {
  console.info('Service listening on http://0.0.0.0:' + port)
})