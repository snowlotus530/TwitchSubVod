import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import moment from 'moment';

import connectDB from '@/utils/backend/middleware/mongodb';
import Supporters from '@/utils/backend/models/supporters';

const data = qs.stringify({
  grant_type: 'client_credentials',
});

const config: AxiosRequestConfig = {
  method: 'post',
  url: `${process.env.PAYPAL_API}/v1/oauth2/token`,
  headers: {
    Authorization: `Basic ${Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
    ).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data: data,
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      const {
        timestamp,
        amount,
        email,
        kofi_transaction_id,
        from_name,
        message,
        url,
      } = JSON.parse(req.body.data);

      if (timestamp && amount && email && kofi_transaction_id) {
        // offsets data to 1 hour in the future (with -7 hours timezone offset)
        const futureDate = moment(timestamp)
          .add('6:00')
          .format('YYYY-MM-DDTHH:mm:ss-0700');

        // offsets data to 1 hour in the past (with -7 hours timezone offset)
        const pastDate = moment(timestamp)
          .subtract('8:00')
          .format('YYYY-MM-DDTHH:mm:ss-0700');

        try {
          // get PayPal token
          const paypalTokenRequest = await axios.request(config);
          const token = paypalTokenRequest.data.access_token;

          // get PayPal transactions between 2 hours of the kofi request (1 hour past and 1 hour future)
          const paypalTransactions = await axios.request({
            url: `${process.env.PAYPAL_API}/v1/reporting/transactions?start_date=${pastDate}&end_date=${futureDate}`,
            method: 'get',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // throw error if no transactions found
          if (paypalTransactions.data.total_items <= 0) {
            throw new Error('No transactions found');
          }

          // check if the kofi transaction is a Paypal one too
          const kofiTransactionExists = paypalTransactions.data.transaction_details.some(
            (transaction: any) =>
              transaction.transaction_info.invoice_id === kofi_transaction_id,
          );

          // throw error if kofi transaction isn't found in Paypal too
          if (!kofiTransactionExists) {
            throw new Error('Transaction not found');
          }

          // save data in MongoDB
          const createOrUpdateSupporter = await Supporters.findOneAndUpdate(
            { email: email },
            {
              email: email,
              $addToSet: {
                transactions: [
                  {
                    transaction: kofi_transaction_id,
                    amount: amount,
                    timestamp: timestamp,
                  },
                ],
              },
              $inc: { amount: Number(amount) },
            },
            { upsert: true, new: true },
          );

          // send discord notification via webhook
          await axios.post(`${process.env.DISCORD_WEBHOOK_URL}`, {
            username: 'pogu.live',
            avatar_url: 'https://pogu.live/android-chrome-192x192.png',
            embeds: [
              {
                title: 'New ko-fi donation',
                description: `Donation of $${amount} by ${from_name} (${email})`,
                color: 7419530,
                fields: [
                  {
                    name: `${message}`,
                    value: `${url}`,
                  },
                ],
              },
            ],
          });

          console.log('POST /webhook/kofi', createOrUpdateSupporter);
          return res.status(200).json({ success: true });
        } catch (error) {
          console.log('ERROR POST /webhook/kofi', error.message);
          return res
            .status(500)
            .json({ error: true, message: 'Something went wrong' });
        }
      } else {
        console.log('ERROR POST /webhook/kofi', 'Missing parameters');
        res.status(422).json({ error: true, message: 'Missing parameters' });
      }
      break;

    default:
      res.status(422).json({ error: true, message: 'Method not allowed' });
      break;
  }
};

export default connectDB(handler);
