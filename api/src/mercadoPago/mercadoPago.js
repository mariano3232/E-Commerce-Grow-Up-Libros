require("dotenv").config();
const { Router } = require("express");
const router = Router();
const { ACCESS_TOKEN } = process.env;

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const Orders = require("../model/Order");
const Users = require("../model/Users");
const { Enum, EnumStatus } = require("./EmunStatus");
const mail = require('./util/successEmail')

mercadopago.configure({
  access_token: `${ACCESS_TOKEN}`,
});

router.post("/orden", async (req, res) => {
  const carrito = req.body;
  const email = carrito.map((e) => e.email);
  // const user = carrito.map((e) => e.name);

  const monto = carrito
    .map((e) => {
      const montoTem = e.unit_price * e.quantity;
      return montoTem;
    })
    .reduce((a, b) => a + b);

  const userDB = await Users.findOne({ email: email[0] });

  const newOrder = new Orders({
    status: EnumStatus.PENDING,
    fecha: new Date(),
    usuario: userDB._id,
    produt: carrito.map((e) => e.title),
    total: monto,
    payment_id: 0,
    status_order: Enum.CREATED,
  });

  await newOrder.save();
  userDB.buyBooks = userDB.buyBooks.concat(newOrder._id);
  await userDB.save();

  try {
    const itemsMp = carrito?.map((e) => ({
      title: e.title,
      unit_price: Number(e.unit_price),
      quantity: Number(e.quantity),
    }));

    let preference = {
      items: itemsMp,
      nameUser: userDB.name,
      emailUser: userDB.email,
      external_reference: `${newOrder._id}`,
      payment_methods: {
        excluded_payment_type: [
          {
            id: "atm",
          },
        ],
        installments: 4,
      },

      back_urls: {
        success: "http://localhost:3001/mercadopago/success",
        failure: "https://ecommercehenryx.herokuapp.com/mercadopago/success",
        pending: "https://ecommercehenryx.herokuapp.com/mercadopago/success",
      },
      auto_return: "approved",
    };
    const saveOrder = await Orders.findById({ _id: newOrder._id }).populate({
      path: "usuario",
    });

    const respuesta = await mercadopago.preferences.create(preference);

    const globalInitPoint = respuesta.body.init_point;
    return res.json({ init_point: globalInitPoint, order: saveOrder });
  } catch (error) {
    return console.log("FALLO MERCADO PAGO", error);
  }
});

router.get("/success", async (req, res) => {
  const { external_reference } = req.query;
  try {  

    const order = await Orders.findOneAndUpdate(
      {
        _id: external_reference,
      },
      req.query
      );
      const orderSave = await order.save();
      const user = await Users.findOne({_id: orderSave.usuario[0]})
      console.log('ESTE ES EL USURIO', user.name, user.email)
      
      // enviar_mail(user.name, user.email)
      res.json(orderSave);
      mail.enviar_mail(user.name, user.email)
  } catch (error) {
    console.log("FALLO SUCCESS ", error);
  }
});

//http://localhost:8080/feedback?collection_id=1290273508&collection_status=approved&payment_id=1290273508&status=approved&external_reference=a59b17&payment_type=credit_card&merchant_order_id=5143913058&preference_id=1152954796-49f441b2-e9d1-494f-8bdc-571a606e2a63&site_id=MCO&processing_mode=aggregator&merchant_account_id=null

// {"id":1152954796,"nickname":"TETE5687095","password":"qatest2807","site_status":"active","site_id":"MCO","description":"a description","date_created":"2022-07-01T17:25:00-04:00","date_last_updated":"2022-07-01T17:25:00-04:00"} VENDEDOR

// {"id":1152955480,"nickname":"TETE6325107","password":"qatest9152","site_status":"active","site_id":"MCO","description":"a description","date_created":"2022-07-01T17:26:17-04:00","date_last_updated":"2022-07-01T17:26:17-04:00"}

// -H "Content-Type: application/json" \
// -H 'Authorization: Bearer TEST-5290894943630049-070117-211fea6e87d83f8ab0769bbc6f6087b0-220603994 ' \
// "https://api.mercadopago.com/users/test" \
// -d '{"site_id":"MCO","description" : "a description"}'

// const mercado={
//   {"id":1152313861,"nickname":"TESTJZQE2T8N","password":"qatest1091","site_status":"active","email":"test_user_24242501@testuser.com"}//vendedor

// {"id":1152320451,"nickname":"TESTKLOPS6H1","password":"qatest5467","site_status":"active","email":"test_user_120617@testuser.com"}

// }

module.exports = router;
