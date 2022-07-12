import Swal from 'sweetalert2'

const Alert = (title, type) => {
  let color
  let icon
  let customClass
  switch (type) {
    case 'fav': {
      color = '#ff6b6b'
      icon = '<img src="/src/assets/imgs/favorito.png">'
      customClass = {
        icon: 'sweet-icon-fav',
        image: 'sweet-icon-fav',
        title: 'sweet-text-fav',
        container: 'sweet-text',
      }
      break
    }
    case 'cart': {
      color = '#22b8cf'
      icon = '<img src="/src/assets/imgs/carrito.png">'
      customClass = {
        icon: 'sweet-icon-cart',
        image: 'sweet-icon-cart',
        title: 'sweet-text-cart',
      }
      break
    }
    case 'warning': {
      color = '#F57C00'
      break
    }
    case 'info': {
      color = '#0288D1'
      break
    }
    case 'cart': {
    }
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 2000,
    background: color,
    color: 'white',
    timerProgressBar: true,
    iconHtml: icon,
    customClass: customClass,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })

  Toast.fire({
    title: title,
  })
}

export default Alert
