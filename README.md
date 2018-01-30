# Exosphere

A friendly layer between humans and Stellar.

## Tech

1. NodeJS with https://github.com/stellar/js-stellar-sdk

## Goals

1. Deploy an anchor to Stellar network
   1 Create new Anchor

2. Build phone based Federation
   1. Create a new account via sms or phone call
   2. Issue credits to federated accounts
   3. Allow count to send transactions

3. Stellar best practices out of the box https://www.stellar.org/developers/guides/issuing-assets.html#best-practices
   1. Requiring or Revoking Authorization
   2. Check Trust Before Paying


## Creating a new anchor

> Anchors are entities that people trust to hold their deposits and issue credits into the Stellar network for those deposits.

As an Anchor, you should maintain at least two accounts:

- An issuing account used only for issuing and destroying assets.
- A base account used to transact with other Stellar accounts. It holds a balance of assets issued by the issuing account.

To create a new anchor run:

```
yarn run anchor:create --issuer=issueer-account-id --issuer-seed=1235 --base=base-id --base-seed=a-seed
```
