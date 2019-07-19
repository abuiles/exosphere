import StellarSdk from 'stellar-sdk'
import request from 'request-promise'
import fs from 'fs';

const STELLAR_HOST = 'https://horizon-testnet.stellar.org'
StellarSdk.Network.useTestNetwork();

/**
 * Creates a new asset and seed the base account in the config with
 * the specified quantity.
 *
 */
export default class Create {
  constructor() {
    this.server = new StellarSdk.Server(STELLAR_HOST);
    const file = fs.readFileSync('./.env.json', { encoding: 'utf-8' });

    this.env = JSON.parse(file)
  }

  async createTrustline(asset, receiverKeys, fee) {
    const server = this.server
    const receiver = await server.loadAccount(receiverKeys.publicKey())

    var transaction = new StellarSdk
        .TransactionBuilder(receiver, {
          fee
        })
        .addOperation(
          // The `changeTrust` operation creates (or alters) a trustline
          // The `limit` parameter below is optional
          StellarSdk.Operation.changeTrust({
            asset
          }))
        .setTimeout(30)
        .build();

    transaction.sign(receiverKeys)

    console.log(`creating trusline between ${receiverKeys.publicKey()} and ${asset.getCode()}`)

    const result = await server.submitTransaction(transaction)

    console.log(`trusline created ${JSON.stringify(result)}`)

    return result
  }
  /**
   * @returns {Promise} returns a promise with the result of server.submitTransaction
   *
   */
  async run(){
    const env = this.env
    const server = this.server

    const fee = await server.fetchBaseFee()

    var issuingKeys = StellarSdk.Keypair.fromSecret(env.issuer.seed)
    var receivingKeys = StellarSdk.Keypair.fromSecret(env.base.seed)
    var usersKeys = StellarSdk.Keypair.fromSecret(env.users.seed)

    // Create an object to represent the new asset
    var asset = new StellarSdk.Asset(
      env.asset.code,
      issuingKeys.publicKey()
    );

    console.log('creating new asset')

    try {
      await this.createTrustline(asset, receivingKeys, fee)
      await this.createTrustline(asset, usersKeys, fee)

      // Second, the issuing account actually sends a payment using the asset
      const issuer = await  server.loadAccount(issuingKeys.publicKey())

      const transaction = new StellarSdk.
            TransactionBuilder(issuer, {
              fee
            })
            .addOperation(
              StellarSdk.Operation.payment({
                destination: receivingKeys.publicKey(),
                asset: asset,
                amount: env.asset.amount
              })
            )
            .setTimeout(30)
            .build()
      console.log(`seeding base account with ${env.asset.amount} ${asset.getCode()}`)
      transaction.sign(issuingKeys)

      const result = await server.submitTransaction(transaction)

      return result
    } catch(error) {
      console.error('Error!', error);

      throw error;
    }
  }
}
