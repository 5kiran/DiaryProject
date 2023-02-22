$(document).ready(function () {
  getDiary();
});
function getDiary() {
  let query = window.location.search;
  let param = new URLSearchParams(query);
  let id = param.get('id');
  $.ajax({
    type: 'GET',
    url: `/boards/detail/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {},
    success: function (response) {
      const info = `${response.writeName} <span class="mx-3">&bullet;</span> ${response.createdAt.split('T')[0]}`
      document.getElementById('info').innerHTML = `<h2>TITLE : ${response.title}</h2>${info}`
      document.getElementById('desc').innerHTML = response.content
    },
    error: function (error) {
      // window.location.replace('/login');
      console.log(error)
    },
  });
}
