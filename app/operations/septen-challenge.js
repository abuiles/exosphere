import StellarSdk from 'stellar-sdk'
import { Account } from "stellar-base";
import request from 'request-promise'
import fs from 'fs';

const STELLAR_HOST = 'https://horizon-testnet.stellar.org'
StellarSdk.Network.useTestNetwork();

export default async function (serverSignerSecret, clientAccountID, anchorName, timebound) {
  let server = new StellarSdk.Server(STELLAR_HOST);

  var serverKeyPair = StellarSdk.Keypair.fromSecret(serverSignerSecret)
  const account = new Account(serverKeyPair.publicKey(), "-1")
  const now = Date.now()

  const transaction = new StellarSdk.
        TransactionBuilder(account, {
          fee: StellarSdk.BASE_FEE,
          timebounds: {
            minTime: now,
            maxTime: now + 300 // transaction will ba valid for 5 minute
          }
        })
        .addOperation(
          StellarSdk.Operation.manageData({
            name: `${anchorName} auth`,
            value: '1234',
            source: clientAccountID
          })
        )
        .build()

  transaction.sign(serverKeyPair)

  return transaction.toEnvelope().toXDR('base64')
}
