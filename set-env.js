const fs = require('fs');

const targetPath = './src/app/environments/environment.prod.ts';
// Puedes cambiar a './public/config.json' si prefieres generar el json.

const envConfigFile = `export const environment = {
  production: true,
  supabaseUrl: '${process.env.SUPABASE_URL || ''}',
  supabaseKey: '${process.env.SUPABASE_KEY || ''}'
};
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(`Angular environment.prod.ts generated correctly`);
  }
});