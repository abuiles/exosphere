import CreateAsset from  '../assets/create'

const creator = new CreateAsset()

creator.run().then((info) => {
  console.log('--------------------------------------------------------------------------------')
  console.log(info)
  console.log('--------------------------------------------------------------------------------')
}, (error) => {
  console.log('Error!', error)
})
