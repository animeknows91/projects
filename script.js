// Open Login Modal
function openLoginModal() {
    const modal = document.getElementById("loginModal");
    modal.style.display = "flex";
  }
  
  // Close Login Modal
  function closeLoginModal() {
    const modal = document.getElementById("loginModal");
    modal.style.display = "none";
  }
  
  // Close modal when clicking outside the form
  window.onclick = function (e) {
    const modal = document.getElementById("loginModal");
    if (e.target === modal) {
      closeLoginModal();
    }
  };
  