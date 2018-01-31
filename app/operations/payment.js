import StellarSdk from 'stellar-sdk'
import request from 'request-promise'
import fs from 'fs';

const STELLAR_HOST = 'https://horizon-testnet.stellar.org'
StellarSdk.Network.useTestNetwork();

/**
 * Send assets from one account to the other one.
 *
 */
export default class Payment {
  constructor(from, to, amount, memo) {
    this.from = from
    this.to = to
    this.amount = amount
    this.memo = memo
    this.server = new StellarSdk.Server(STELLAR_HOST);
    const file = fs.readFileSync('/Users/adolfobuiles/code/personal/exosphere/.env.json', { encoding: 'utf-8' });

    this.env = JSON.parse(file)
  }
  /**
   * @returns {Promise} returns a promise with the result of server.submitTransaction
   *
   */
  async run(){
    const env = this.env
    const server = this.server

    var senderKeys = StellarSdk.Keypair.fromSecret(env[this.from].seed)
    var receiverKeys = StellarSdk.Keypair.fromSecret(env[this.to].seed)
    var issuingKeys = StellarSdk.Keypair.fromSecret(env.issuer.seed)
    var asset = new StellarSdk.Asset(
      env.asset.code,
      issuingKeys.publicKey()
    );

    console.log('sending assets')
    try {
      const sender = await  server.loadAccount(senderKeys.publicKey())

      const transaction = new StellarSdk.
          TransactionBuilder(sender)
          .addOperation(
            StellarSdk.Operation.payment({
              destination: receiverKeys.publicKey(),
              asset: asset,
              amount: this.amount
            })
          ).addMemo(
            StellarSdk.Memo.text(this.memo)
          ).build()
      console.log(`${senderKeys.publicKey()} is sending ${this.amount} ${asset.getCode()} to ${receiverKeys.publicKey()}`)
      transaction.sign(senderKeys)

      const result = await server.submitTransaction(transaction);

      return result;
    } catch(error) {
      console.error('Payment failed!', error);

      throw error;
    }
  }
}
