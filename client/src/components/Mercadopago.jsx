import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Mercadopago = () => {
  const [successInfo, setSucessInfo] = useState(null)
  const url = window.location.href.split('?')[1]

  useEffect(() => {
    axios
      .get(
        `http://https://ecommercehenryx.herokuapp.com/mercadopago/success?${url}`
      )
      .then((res) => setSucessInfo(res.data))
  }, [])

  console.log(successInfo)

  return (
    <div>
      {successInfo && (
        <div>
          e
          <h1>
            {successInfo.produt.map((p) => {
              return (
                <div>
                  <h1>{p}</h1>
                </div>
              )
            })}
          </h1>
          <div>
            <p>Libros y cantidad</p>
            {successInfo.libros.map((lb) => (
              <div>
                <p>{lb.title}</p>
                <p>{lb.cantidad}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Mercadopago

//http://localhost:8080/feedback?collection_id=1290273508&collection_status=approved&payment_id=1290273508&status=approved&external_reference=a59b17&payment_type=credit_card&merchant_order_id=5143913058&preference_id=1152954796-49f441b2-e9d1-494f-8bdc-571a606e2a63&site_id=MCO&processing_mode=aggregator&merchant_account_id=null
