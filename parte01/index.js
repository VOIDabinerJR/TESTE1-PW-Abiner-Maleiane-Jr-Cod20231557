let users = [];
let editId = null;

const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const imageInput = document.getElementById("image");
const userList = document.getElementById("userList");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value;
  const file = imageInput.files[0];

  function generateRandomCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
  
  if (editId !== null) {
   
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageUrl = e.target.result;
        updateUser(editId, name, imageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      
      const user = users.find(u => u.id === editId);
      updateUser(editId, name, user.image);
    }
  } else {
   
    if (!file) return alert("Por favor, selecione uma imagem.");
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageUrl = e.target.result;
      createUser(name, imageUrl);
    };
    reader.readAsDataURL(file);
  }

  form.reset();
  editId = null;
});

function generateRandomCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
function createUser(name, image) {
  const newUser = {
    id: Date.now() || generateRandomCode(),
    name,
    image
  };
  console.log(newUser)
  users.push(newUser);
  console.log(users)
  renderUsers();
}

function updateUser(id, name, image) {
  const index = users.findIndex(u => u.id === id);
  console.log(index)
  if (index !== -1) {
    users[index].name = name;
    users[index].image = image;
    renderUsers();
  }
 
}

function deleteUser(id) {
  users = users.filter(u => u.id !== id);
  console.log(users)
  renderUsers();
}

function editUser(id) {
  const user = users.find(u => u.id === id);
  console.log(user)
  if (user) {
    nameInput.value = user.name;
    imageInput.value = ''; 
    editId = user.id;
  }
}

function renderUsers() {
  userList.innerHTML = "";
  users.forEach(user => {
    const div = document.createElement("div");
    div.className = "user-card";
    div.innerHTML = `
      <img src="${user.image}" alt="Imagem de ${user.name}">
      <div>
        <strong>${user.name}</strong><br>
        <button onclick="editUser(${user.id})">Editar</button>
        <button onclick="deleteUser(${user.id})">Eliminar</button>
      </div>
    `;
    userList.appendChild(div);
  });
}
