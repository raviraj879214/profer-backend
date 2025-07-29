module.exports = function emailHeader() {
  return `
    <div style="background-color: #f8f8f8; padding: 20px; text-align: center; border-bottom: 1px solid #eaeaea;">
      <img src="${process.env.FRONTEND_PUBLIC_URL}/images/Logo.png" alt="YourCompany Logo" style="max-width: 150px;">
    </div>
  `;
};
