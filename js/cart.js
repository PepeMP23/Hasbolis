const productos = {
  berry: {
    id: 'berry',
    titulo: 'Boli Berry Mix',
    precio: 10,
    imagen: 'img/Boli Berry Mix.jpg',
    descripcion: 'Mezcla refrescante de frutos rojos'
  },
  sandia: {
    id: 'sandia',
    titulo: 'Boli de Sandía',
    precio: 15,
    imagen: 'img/Boli de Sandía.jpg',
    descripcion: 'Sabor dulce y refrescante a sandía'
  },
  frambuesa: {
    id: 'frambuesa',
    titulo: 'Boli Frambuesa',
    precio: 12,
    imagen: 'img/Boli Frambuesa.jpg',
    descripcion: 'Intenso sabor a frambuesa natural'
  },
  mora: {
    id: 'mora',
    titulo: 'Boli Mora Azul',
    precio: 20,
    imagen: 'img/Boli Mora Azul.jpg',
    descripcion: 'Sabor exótico a mora azul'
  },
  naranja: {
    id: 'naranja',
    titulo: 'Boli Naranja',
    precio: 20,
    imagen: 'img/Boli Naranja.jpg',
    descripcion: 'Cítrico y refrescante sabor a naranja'
  },
  pasion: {
    id: 'pasion',
    titulo: 'Boli Pasión Tropical',
    precio: 20,
    imagen: 'img/Boli Pasión Tropical.jpg',
    descripcion: 'Exótica mezcla de frutas tropicales'
  },
  kiwi: {
    id: 'kiwi',
    titulo: 'Boli Tropical Kiwi',
    precio: 20,
    imagen: 'img/Boli Tropical Kiwi.jpg',
    descripcion: 'Combinación tropical con kiwi'
  },
  tropical: {
    id: 'tropical',
    titulo: 'Boli Tropical',
    precio: 20,
    imagen: 'img/Boli Tropical.jpg',
    descripcion: 'Mezcla refrescante de frutas tropicales'
  }
};

// Helper para obtener el carrito
const getCart = () => {
  try {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  } catch (e) {
    console.error("Error al leer el carrito:", e);
    return [];
  }
};

// Helper para guardar el carrito
const saveCart = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  } catch (e) {
    console.error("Error al guardar el carrito:", e);
  }
};

// Función para añadir al carrito
function addToCart(id) {
  if (!productos[id]) {
    console.error('Producto no encontrado:', id);
    return false;
  }

  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === id);

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].qty += 1;
  } else {
    const productToAdd = {
      id: productos[id].id,
      titulo: productos[id].titulo,
      precio: productos[id].precio,
      imagen: productos[id].imagen,
      qty: 1
    };
    cart.push(productToAdd);
  }

  saveCart(cart);
  return true;
}

// Actualizar contador del carrito
function updateCartCount() {
  const countElement = document.getElementById('cart-count');
  if (countElement) {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + (item.qty || 0), 0);
    countElement.textContent = totalItems;
  }
}

// Limpiar carrito (para pruebas)
function clearCart() {
  localStorage.removeItem('cart');
  updateCartCount();
}

// Inicialización
document.addEventListener('DOMContentLoaded', updateCartCount);