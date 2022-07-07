import { useDispatch } from 'react-redux'
import { setOrderStatus, getAllOrders} from '../../../../actions'
import styles from '../../../../Styles/Button.module.css'

export default function AdminOrderStatusCancelled({ orders, setChanged, changed }) {
  const dispatch = useDispatch()

  var ordersIds = []

  function toogleAdmin(e, orders) {
    orders.map((order) => {
      ordersIds.push(order._id)
    })
    dispatch(setOrderStatus({ordersIds,status:'Cancelada'}))

    setTimeout(function () {
      dispatch(getAllOrders())
    }, 1000)

    setChanged(!changed)

    ordersIds = []
  }

  return (
    <div>
      <button className={styles.button} onClick={(e) => toogleAdmin(e, orders)}>
      Cancelada
      </button>
    </div>
  )
}