const midtransClient = require('midtrans-client');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// Create Snap API instance
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.serverKey,
  clientKey: process.env.clientKey,
});

module.exports = snap