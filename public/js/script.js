document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      if (!name || !email || !password) {
        event.preventDefault();
        alert('Todos los campos son obligatorios.');
      }
    });
  });
  