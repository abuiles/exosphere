import Payment from  '../operations/payment'

const from = process.argv[2]
const to = process.argv[3]
const amount = process.argv[4]
const memo = process.argv[5]

console.log(`sending ${amount} from ${from} to ${to}`)

const payment = new Payment(from, to, amount, memo)

payment.run().then((info) => {
  console.log('--------------------------------------------------------------------------------')
  console.log(info)
  console.log('--------------------------------------------------------------------------------')
}, (error) => {
  console.log('Error!', error)
})
