const { async } = require("rxjs");

function writeDiary() {
  const date = document.getElementById('date').value + ''
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  console.log(date)

  $.ajax({
    type: 'POST',
    url: `/boards`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: { title, content, createdAt: date },
    success: async function (response) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'center-center',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
  
      await Toast.fire({
        icon: 'success',
        title: 'A spoon of memories.',
      });
      window.location.reload()
    },
    error: function (error) {
      if(error.status === 401) {
        return window.location.replace('/login')
      }
    },
  });
}
