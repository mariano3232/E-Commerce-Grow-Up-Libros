import Swal from "sweetalert2";

const Alert = (title, type) => {
  let color;
  switch (type) {
    case "success": {
      color = "#388E3C";
      break;
    }
    case "error": {
      color = "#D32F2F";
      break;
    }
    case "warning": {
      color = "#F57C00";
      break;
    }
    case "info": {
      color = "#0288D1";
      break;
    }
  }
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 4000,
    background: color,
    iconColor: "white",
    color: "white",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: type,
    title: title,
  });
};

export default Alert;
