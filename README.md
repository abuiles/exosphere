# Exosphere

A friendly layer between humans and Stellar.

## Tech

1. NodeJS with https://github.com/stellar/js-stellar-sdk

## Goals

1. Deploy an anchor to Stellar network
   1 Create new Anchor: `yarn run anchor:create`

2. Create a new asset and seed your anchor account with it.

3. Build phone based Federation
   1. Create a new account via sms or phone call
   2. Issue credits to federated accounts
   3. Allow count to send transactions

4. Stellar best practices out of the box https://www.stellar.org/developers/guides/issuing-assets.html#best-practices
   1. Requiring or Revoking Authorization
   2. Check Trust Before Paying


## Creating a new anchor

> Anchors are entities that people trust to hold their deposits and issue credits into the Stellar network for those deposits.

As an Anchor, you should maintain at least two *accounts*:

- An issuing account used only for issuing and destroying assets.
- A base account used to transact with other Stellar accounts. It holds a balance of assets issued by the issuing account.

Create your issuing and base account by running

```
yarn run anchor:create
```

This will output an object like the following.

```
{
  "base": {
    "id": "some-id",
    "seed": "some-seed"
  },
  "issuer": {
    "id": "some-id",
    "seed": "some-seed"
  }
}
```

They keys above will be used to issue new asset or create new accounts
for your customers. Save that in .env.json will use it as the base accounts for new commands.

## Issuing assets

Once the issuer and base account have been created, the next step is
to create an asset and seed the base account with it for operations.

Add the information for your asset in the `.env.json` file:


```
{
  "asset": {
    "code": "COP"
  },
  "base":....
}
```

And then run:

```
yarn run asset:create
```

## Creating customer accounts

> Based on https://www.stellar.org/developers/guides/anchor/#customer-accounts

We'll use federation and the memo field in transactions to send and
receive payments on behalf of our customers. In this approach,
transactions intended for your customers are all made using our base
account. The memo field of the transaction is used to identify the
actual customer a payment is intended for.

> Using a single account requires you to do additional bookkeeping, but
> means you have fewer keys to manage and more control over accounts. If
> you already have existing banking systems, this is the simplest way to
> integrate Stellar with them.
