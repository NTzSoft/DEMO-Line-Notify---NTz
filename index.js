const request = require('request');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();
const url_line_notification = "https://notify-api.line.me/api/notify";
const BTC_PRICE_URL = 'https://api.coingecko.com/api/v3/coins/bitcoin?localization=THB';


function sendNotification(message) {
request({
    method: 'POST',
    uri: url_line_notification,
    header: {
        'Content-Type': 'multipart/form-data',
    },
    auth: {
        bearer: process.env.TOKEN,
    },
    form: {
        message: message
    },
}, (err, httpResponse, body) => {
    if (err) {
        console.log(err)
    } else {
        console.log(body)
    }
});
}

function getBTCPrice() {
    request(BTC_PRICE_URL, (err, res, body) => {
      if (err) {
        console.error(err);
      } else {
        const data = JSON.parse(body);
        const priceThb = data.market_data.current_price.thb;
        sendNotification(`ราคา BTC ตอนนี้ ${priceThb} บาท `);
      }
    });
  }
getBTCPrice();
