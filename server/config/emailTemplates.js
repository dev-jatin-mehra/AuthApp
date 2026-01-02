export const REGISTER_USER_TEMPLATE = `
    <div style="font-family: Arial, sans-serif; background: #f9fafb; max-width: 600px; margin: auto; padding: 20px; border-radius: 12px;">
      <div style="text-align: center;">
        <img src="https://media.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif" 
             alt="Welcome {{name}}" 
             style="width: 120px; margin-bottom: 20px;" />
        <h2 style="color: #1f2937;">Welcome to <span style="color: #6366f1;">AuthKIT</span> 👋</h2>
        <p style="font-size: 16px; color: #4b5563;">
          We're thrilled to have you on board, {{name}} 🎉
          <br /><br />
          AuthKIT helps you securely log in, register, and manage sessions with ease. You're all set to verify your email and get started.
        </p>
        <p style="margin-top: 30px; font-size: 14px; color: #9ca3af;">
          Need help? Just reply to this email or visit our support page.
        </p>
        <p style="margin-top: 30px; font-size: 12px; color: #d1d5db;">
          © {{date}} AuthKIT. All rights reserved.
        </p>
      </div>
    </div>
  `;

export const EMAIL_VERIFY_TEMPLATE = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f5; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
      <div style="text-align: center;">
        <img src="https://media.giphy.com/media/fxsqOYnIMEefC/giphy.gif" alt="AuthKIT Logo" style="width: 80px; margin-bottom: 20px;" />
        <h2 style="color: #1f2937;">Verify Your Email Address</h2>
        <p style="color: #4b5563; font-size: 16px;">
          To complete your registration with <strong>AuthKIT</strong>, please use the verification code below:
        </p>
        <div style="margin: 30px auto; background-color: #111827; color: #ffffff; width: fit-content; padding: 15px 30px; border-radius: 8px; font-size: 24px; letter-spacing: 5px;">
          {{otp}}
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          This code is valid for a limited time. If you didn’t request this, please ignore this email.
        </p>
        <p style="margin-top: 40px; font-size: 12px; color: #9ca3af;">
          © {{date}} AuthKIT. All rights reserved.
        </p>
      </div>
    </div>
  `;

export const PASSWORD_RESET_TEMPLATE = `
    <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px;">
      <div style="text-align: center;">
        <img src="https://media.giphy.com/media/pa37AAGzKXoek/giphy.gif" alt="Logo" style="width: 60px; margin-bottom: 20px;" />
        <h2 style="color: #111827;">Reset Your Password</h2>
        <p style="color: #4b5563; font-size: 16px;">
          We received a request to reset the password for your account associated with this email.
        </p>
        <p style="margin: 20px 0; font-size: 16px; color: #1f2937;">
          Use the following OTP to proceed:
        </p>
        <div style="margin: 20px auto; background-color: #111827; color: #ffffff; display: inline-block; padding: 15px 30px; font-size: 24px; letter-spacing: 4px; border-radius: 6px;">
          {{otp}}
        </div>
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          This code is valid for a limited time. If you didn’t request this, please ignore this email.
        </p>
        <p style="margin-top: 40px; font-size: 12px; color: #9ca3af;">
          © {{date}} AuthKIT. All rights reserved.
        </p>
      </div>
    </div>
  `;
