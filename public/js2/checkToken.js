$(document).ready(function () {
  checkToken();
});
function checkToken() {
  $.ajax({
    type: 'GET',
    url: `/checkToken`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {},
    success: function (response) {},
    error: function (error) {
      window.location.replace('/login')
    },
  });
}
