$(document).ready(function () {
  getPictures();
});
function getPictures() {
  $.ajax({
    type: 'GET',
    url: `/pictures`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {},
    success: function (response) {
      response.forEach((element) => {
        let temp_html = `<div class="col-4">
            <a href="/uploads/${element.fileName}" class="gal-item" data-fancybox="gal"><img src="/uploads/${element.fileName}" alt="Image" class="img-fluid" style="max-height: 350px;"></a>
          </div>`;
        $('#pictures').append(temp_html);
      });
    },
    error: function (error) {
      window.location.replace('/login');
    },
  });
}
