import '../estilos/piePagina.css';

function PiePagina() {
  return (
    <footer className='pie footer'>
      <div className="tarjeta-footer creditos">
        <div className="creditos-creativos">
          <p><strong>Dirección Creativa:</strong> Estudio Hermanos</p>
          <p><strong>Diseño:</strong> María Fernanda López</p>
          <p><strong>Fotografía:</strong> Santiago Ciuffo</p>
          <p><strong>Redacción:</strong> Carolina Mendez</p>
          <p><strong>Tipografía:</strong> Inter por Rasmus Andersson</p>
        </div>

        <p>&copy; 2025 Hermanos Jota · Buenos Aires</p>
        <p>Hecho con materiales nobles y manos expertas</p>
      </div>

      <div className="contacto">
        <h1 className="footer-title">Contacto Digital</h1>
        <div className="contacto-item">
          <img src="../../public/MdiGmail.svg" alt="Gmail" />
          <p>info@hermanosjota.com</p>
        </div>
        <div className="contacto-item">
          <img src="../../public/MdiWhatsapp.svg" alt="Whatsapp" />
          <p>+54 11 4567-8900</p>
        </div>
        <div className="contacto-item">
          <img src="../../public/MdiInstagram.svg" alt="Instagram" />
          <p>@hermanosjota_ba</p>
        </div>
      </div>

      <div className="Sucursales">
        <h1>Sucursales</h1>
        <p><strong>Hermanos Jota — Casa Taller</strong></p>
        <p>
          Av. San Juan 2847<br />
          C1232AAB — Barrio de San Cristóbal<br />
          Ciudad Autónoma de Buenos Aires<br />
          Argentina
        </p>
        <p>
          <strong>Horarios:</strong><br />
          Lunes a Viernes: 10:00 - 19:00<br />
          Sábados: 10:00 - 14:00
        </p>
      </div>
    </footer>
  );
}

export default PiePagina;
