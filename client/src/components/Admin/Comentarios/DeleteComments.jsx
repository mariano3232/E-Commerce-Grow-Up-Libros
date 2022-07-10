import { useDispatch } from 'react-redux'
import styles from '../../../Styles/Button.module.css'
import { getComments, hideComment } from '../../../actions'

export default function DeleteComments({ comments, setChanged, changed }) {
  const dispatch = useDispatch()

  var commentsIds = []

  function toogleComment(e, comments) {
   comments.map((comment) => {
    commentsIds.push(comment._id)
    })
    dispatch(hideComment(commentsIds))

    setTimeout(function () {
      dispatch(getComments())
    }, 500)

    setChanged(!changed)

    commentsIds = []
  }

  return (
    <div>
      <button className={styles.button} onClick={(e) => toogleComment(e, comments)}>
        Eliminar Comentario
      </button>
    </div>
  )
}
