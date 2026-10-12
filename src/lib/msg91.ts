import { logger } from "./logger";

export async function sendMsg91Otp(mobileNumber: string, customOtp: string): Promise<any> {
  const authKey = process.env.MSG91_AUTH_KEY;
  const templateId = process.env.MSG91_TEMPLATE_ID;

  if (!authKey || !templateId) {
    throw new Error('MSG91 credentials are not configured.');
  }

  // Ensure mobile contains digits only
  const cleanMobile = mobileNumber.replace(/\D/g, '');
  const mobileWithCountryCode = `91${cleanMobile}`;

  const url = `https://control.msg91.com/api/v5/otp?template_id=${templateId}&mobile=${mobileWithCountryCode}&authkey=${authKey}&otp=${customOtp}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OTP: customOtp, // Passed as variable in case the template uses {#OTP#}
      }),
    });

    const data = await response.json();
    logger.auth.info('MSG91 API response', { data });

    if (data.type === 'error') {
      throw new Error(`MSG91 Error: ${data.message || JSON.stringify(data)}`);
    }

    logger.auth.info('MSG91 OTP sent successfully', { mobile: mobileWithCountryCode });
    return data;
  } catch (error) {
    logger.auth.error('MSG91 API error', { error: error instanceof Error ? error.message : String(error) });
    throw error;
  }
}
