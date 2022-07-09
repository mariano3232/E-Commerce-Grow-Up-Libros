import { useDispatch } from 'react-redux'
import { setOrderStatus, getAllOrders} from '../../../../actions'
import styles from '../../../../Styles/Button.module.css'

export default function AdminOrderStatusCreated({ orders, setChanged, changed }) {
  const dispatch = useDispatch()
  console.log('TTTT:',orders)

  var ordersIds = []

  function toogleAdmin(e, orders) {
    orders.map((order) => {
      ordersIds.push(order._id)
    })
    dispatch(setOrderStatus({ordersIds,status:'Creada'}))

    setTimeout(function () {
      dispatch(getAllOrders())
    }, 1000)

    setChanged(!changed)

    ordersIds = []
  }

  return (
    <div>
      <button className={styles.button} onClick={(e) => toogleAdmin(e, orders)}>
        Creada
      </button>
    </div>
  )
}