import { registerAs } from '@nestjs/config';

export default registerAs('configuration', () => ({
  PORT: parseInt(process.env.PORT, 10) || 8080,
  TIMEOUT: parseInt(process.env.TIMEOUT, 10),
  APM: {
    HOST: process.env.APM_HOST,
    ENVIRONMENT: process.env.APM_ENVIRONMENT,
    ISACTIVE: process.env.APM_ISACTIVE === 'true',
  },
  URLCUSTOMER: process.env.URLCUSTOMER,
  URLESBINSPIRA: process.env.URLESBINSPIRA,
  HPE: process.env.HPE,
}));
