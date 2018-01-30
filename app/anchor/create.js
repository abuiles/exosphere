import StellarSdk from 'stellar-sdk'
import request from 'request-promise'

/**
 * Creates two accounts in the Stellar network which you can use to
 * run your anchor.
 *
 *
 */
export default class Create {
  /**
   * @returns {object} returns an object with the account id and seed.
   */
  async create() {
    const pair = StellarSdk.Keypair.random();

    try {
      console.log('Requesting Lumens')

      const response = await request.get({
        url: 'https://horizon-testnet.stellar.org/friendbot',
        qs: { addr: pair.publicKey() },
        json: true
      })

      console.log('SUCCESS! You have a new account :)\n', response)

      return {
        seed: pair.secret(),
        id: pair.publicKey()
      }
    } catch (error) {
      console.error('ERROR creating account', error)

      throw  error
    }
  }
  /**
   * @returns {object} returns an object  like the following:
   *  {
   *    issuer: { id, seed }
   *    base: { id, seed }
   *  }
   */
  async run(){
    const issuer = await this.create()
    const base = await this.create()

    return {
      base,
      issuer
    }
  }
}
