import challenge from  '../operations/septen-challenge'

challenge("SDTSZTNIHYN6SKBM2KUY4PDTOW6CVICVNQSB5VN4L7CAB4P3GQIYMJE6", "GBDIT5GUJ7R5BXO3GJHFXJ6AZ5UQK6MNOIDMPQUSMXLIHTUNR2Q5CFNF", "abuiles", 1879173638).then((challenge) => {
  console.log('--------------------------------------------------------------------------------')
  console.log(challenge)
  console.log('--------------------------------------------------------------------------------')
}, (error) => {
  console.log('Error!', error)
})
