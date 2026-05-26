const fs = require('fs');

const targetPath = './public/config.json';

const envConfigFile = JSON.stringify({
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_KEY || ''
}, null, 2);

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(`Angular config.json generated correctly`);
  }
});