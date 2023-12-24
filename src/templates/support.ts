export const support = (message: string, userData) => {
  const { name, id, email, role } = userData;

  return `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          line-height: 1.6;
          color: #333;
        }

        p {
          padding: 0px;
          margin: 0px
        }


        h1 {
          color: #1E90FF;
          text-align: center;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 15px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .section {
          border-radius: 10px;
          padding: 10px;
          border: 2px solid #1E90FF;
        }

        .footer {
          margin-top: 20px;
          text-align: center;
          font-weight: bold;
        }
      </style>
    </head>

    <body>
      <div class="container">
        <h1>Mensaje de Ayuda y Soporte</h1>

        <h3>Información del Usuario:</h3>

        <section class="section">
          <p><strong>Id de Usuario:</strong> ${id}</p>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Rol:</strong> ${role}</p>
        </section>

        <h3>Mensaje:</h3>

        <section class="section">
          <p>${message}</p>
        </section>

        <p class="footer">Ayuda y Soporte - Bus On Time!</p>
      </div>
    </body>
  </html>
  `;
};
