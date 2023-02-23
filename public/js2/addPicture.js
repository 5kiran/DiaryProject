function writeDiary() {
  const date = document.getElementById('date').value + '';
  const file = $('#file')[0];
  const formData = new FormData();
  formData.append('file', file.files[0]);
  formData.append('date', date);
  $.ajax({
    type: 'POST',
    url: `/pictures`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    processData: false,
    contentType: false,
    data: formData,
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
      window.location.reload();
    },
    error: function (error) {
      if (error.status === 401) {
        return window.location.replace('/login');
      }
    },
  });
}
