document.addEventListener('DOMContentLoaded', function() {
  const bouton = document.querySelector('button');

  if (bouton) {
    bouton.addEventListener('click', function() {
      window.location.href = "dashboard.html";
    });
  }
});