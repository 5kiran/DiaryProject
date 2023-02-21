function writeDiary(){
  const date = document.getElementById('date').value
  const title = document.getElementById('title').value
  const content = document.getElementById('content').value
  fetch('/boards', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title : title,
    content : content,
    image : "gi",
    createdAt: date
  }),
}).then((response) => (
  window.location.replace('calendar')
  ));
}