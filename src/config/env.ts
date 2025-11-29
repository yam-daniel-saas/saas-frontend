import * as z from 'zod';

const envPrefix = 'EXPO_PUBLIC_';

const createEnv = () => {
  const EnvSchema = z.object({
    BUSINESS_ID: z.string(),
    APP_URL: z.string(),
  });

  const envVars = Object.entries(process.env).reduce<Record<string, string>>((acc, curr) => {
    const [key, value] = curr;
    if (key.startsWith(envPrefix)) {
      acc[key.replace(envPrefix, '')] = value ?? '';
    }
    return acc;
  }, {});

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
The following variables are missing or invalid:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join('\n')}
`
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();
