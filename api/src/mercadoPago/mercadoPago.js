require('dotenv').config()
const { Router } = require('express')
const router = Router()
const { ACCESS_TOKEN } = process.env

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const Books = require("../model/Books");
const Orders = require("../model/Order");
const Users = require("../model/Users");
const { Enum, EnumStatus } = require("./EmunStatus");
const mail = require("./util/successEmail");

mercadopago.configure({
  access_token: `${ACCESS_TOKEN}`,
})

router.post('/orden', async (req, res) => {
  const carrito = req.body
  const email = carrito.map((e) => e.email)
  // const user = carrito.map((e) => e.name);

  const monto = carrito
    .map((e) => {
      const montoTem = e.unit_price * e.quantity
      return montoTem
    })
    .reduce((a, b) => a + b)

  const userDB = await Users.findOne({ email: email[0] })

  const newOrder = new Orders({
    status: EnumStatus.PENDING,
    fecha: new Date(),
    usuario: userDB._id,
    produt: carrito.map((e) => e.title),
    total: monto,
    payment_id: 0,
    status_order: Enum.CREATED,
    libros: carrito.map((e) => {
      return { title: e.title, quantity: e.quantity };
    }),
  });

  await newOrder.save()
  userDB.buyBooks = userDB.buyBooks.concat(newOrder._id)
  await userDB.save()

  try {
    const itemsMp = carrito?.map((e) => ({
      title: e.title,
      unit_price: Number(e.unit_price),
      quantity: Number(e.quantity),
    }))

    let preference = {
      items: itemsMp,
      nameUser: userDB.name,
      emailUser: userDB.email,
      external_reference: `${newOrder._id}`,
      payment_methods: {
        excluded_payment_type: [
          {
            id: 'atm',
          },
        ],
        installments: 4,
      },

      back_urls: {
        success: 'http://localhost:3000/mercadopago/success',
        failure: 'http://localhost:3000/mercadopago/success',
        pending: 'http://localhost:3000/mercadopago/success',
      },
      auto_return: 'approved',
    }
    const saveOrder = await Orders.findById({ _id: newOrder._id }).populate({
      path: 'usuario',
    })

    const respuesta = await mercadopago.preferences.create(preference)

    const globalInitPoint = respuesta.body.init_point
    return res.json({ init_point: globalInitPoint, order: saveOrder })
  } catch (error) {
    return console.log('FALLO MERCADO PAGO', error)
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
    ).populate({path: 'usuario'});
    const orderSave = await order.save();
    const libros = orderSave.produt.map(async (e) => {
      const librosTem = await Books.findOne({ title: e });
      return librosTem;
    });
    const libroDB = await Promise.all(libros);
    const user = await Users.findOne({ _id: orderSave.usuario[0] });
    libroDB.forEach(async (e, i) => {
      const temp = e.title;
      if (temp === orderSave.libros[i].title) {
        e.stock = e.stock - orderSave.libros[i].quantity;
        e.soldCount += orderSave.libros[i].quantity;
        await e.save();
      }
    });
    res.json(orderSave);
    mail.enviar_mail(user.name, user.email);
  } catch (error) {
    return res.json({ msg: "FALLO SUCCESS ", error: error });
  }
})

//http://localhost:8080/feedback?collection_id=1290273508&collection_status=approved&payment_id=1290273508&status=approved&external_reference=a59b17&payment_type=credit_card&merchant_order_id=5143913058&preference_id=1152954796-49f441b2-e9d1-494f-8bdc-571a606e2a63&site_id=MCO&processing_mode=aggregator&merchant_account_id=null

// {"id":1152954796,"nickname":"TETE5687095","password":"qatest2807","site_status":"active","site_id":"MCO","description":"a description","date_created":"2022-07-01T17:25:00-04:00","date_last_updated":"2022-07-01T17:25:00-04:00"} VENDEDOR

// {"id":1152955480,"nickname":"TETE6325107","password":"qatest9152","site_status":"active","site_id":"MCO","description":"a description","date_created":"2022-07-01T17:26:17-04:00","date_last_updated":"2022-07-01T17:26:17-04:00"}

// curl -X POST \
// -H "Content-Type: application/json" \
// -H 'Authorization: Bearer TEST-5290894943630049-070117-211fea6e87d83f8ab0769bbc6f6087b0-220603994' \
// "https://api.mercadopago.com/users/test" \
// -d '{"site_id":"MCO","description" : "a description"}'

// {"id":1156545904,"nickname":"TETE2598970","password":"qatest9115","site_status":"active","site_id":"MCO","description":"a description","date_created":"2022-07-07T15:54:38-04:00","date_last_updated":"2022-07-07T15:54:38-04:00"
//test_user_18656584@testuser.com}

module.exports = router;
