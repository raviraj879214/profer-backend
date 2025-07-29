module.exports = function emailFooter() {
  return `
    <div style="background-color: #f8f8f8; padding: 15px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #eaeaea;">
      © ${new Date().getFullYear()} YourCompany. All rights reserved. <br>
      <a href="${process.env.FRONTEND_PUBLIC_URL}" style="color: #007bff; text-decoration: none;">Visit our website</a>
    </div>
  `;
};
