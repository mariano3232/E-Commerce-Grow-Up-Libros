import Swal from 'sweetalert2'
import { Images } from '../assets'

const Alert = (title, type) => {
  let color
  let icon
  let customClass
  switch (type) {
    case 'fav': {
      color = '#ff6b6b'
      icon = `<img src="${Images.favorito}">`
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
      icon = `<img src="${Images.carrito}">`
      customClass = {
        icon: 'sweet-icon-cart',
        image: 'sweet-icon-cart',
        title: 'sweet-text-cart',
      }
      break
    }
    case 'updateInfo': {
      color = '#22b8cf'
      icon = `<img src="${Images.updateUser}">`
      customClass = {
        icon: 'sweet-icon-cart',
        image: 'sweet-icon-cart',
        title: 'sweet-text-cart',
      }
      break
    }
    case 'delete': {
      color = '#e03131'
      icon = `<img src="${Images.deleteAccount}">`
      customClass = {
        icon: 'sweet-icon-cart',
        image: 'sweet-icon-cart',
        title: 'sweet-text-cart',
      }
    }
    case 'updateBook': {
      color = '#22b8cf'
      icon = `<img src="${Images.books}">`
      customClass = {
        icon: 'sweet-icon-cart',
        image: 'sweet-icon-cart',
        title: 'sweet-text-cart',
      }
    }
    case 'updateCarrousel': {
      color = '#22b8cf'
      icon = `<img src="${Images.imagesFiles}">`
      customClass = {
        icon: 'sweet-icon-cart',
        image: 'sweet-icon-cart',
        title: 'sweet-text-cart',
      }
    }
    case 'updateOrder': {
      color = '#22b8cf'
      icon = `<img src="${Images.orderIcon}">`
      customClass = {
        icon: 'sweet-icon-cart',
        image: 'sweet-icon-cart',
        title: 'sweet-text-cart',
      }
    }
    case 'email': {
      color = '#22b8cf'
      icon = `<img src="${Images.email}">`
      customClass = {
        icon: 'sweet-icon-cart',
        image: 'sweet-icon-cart',
        title: 'sweet-text-cart',
      }
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
