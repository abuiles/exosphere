import CreateAnchor from  '../anchor/create'

const creator = new CreateAnchor()

creator.run().then((info) => {
  console.log('--------------------------------------------------------------------------------')
  console.log(JSON.stringify(info))
  console.log('--------------------------------------------------------------------------------')
})
