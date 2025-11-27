import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import axios from 'axios';

export default function Login() {

  const [form, setForm] = useState({ email: '', contraseña: '' });
  const navigate = useNavigate();
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:3000/api/users/login', form);

    // Guardar datos en localStorage
    console.log(res)
    localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('rol', res.data.usuario.rol);
    localStorage.setItem('nombre', res.data.usuario.nombre);

    // Redirigir según el rol
    if (res.data.usuario.rol === 'admin') {
      navigate('/admin');
    } else {
      navigate('/productos');
    }
  } catch (err) {
    toast.error(`Error al iniciar sesión: ${err.response?.data?.error || 'Error desconocido'}`);
    ('Error al iniciar sesión', err.status);
  }
};


  return (
    <>
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="contrasenia" type="password" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit" >Ingresar</button>
    </form>

    <p>¿No tenés una cuenta?</p>

    <a onClick={() => navigate("/auth/registro")}>Registrate</a>

    </>
  );
}