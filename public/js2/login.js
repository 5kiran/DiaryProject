function login() {
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;
  fetch('/users/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      password: password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then((res) => {
      localStorage.setItem('token', res.accessToken);
      window.location.replace('/');
    })
    .catch(async() => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'center-center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
  
      await Toast.fire({
        icon: 'error',
        title: '아무나 들어오는걸 거부한다.',
      });
      window.location.reload()
    });
}
