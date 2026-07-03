const fs = require('fs');

const targetPath = './public/config.json';

const envConfigFile = JSON.stringify({
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_KEY || '',
  recommendationsApiUrl: process.env.RECOMMENDATIONS_API_URL || 'http://localhost:3000'
}, null, 2);

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(`Angular config.json generated correctly`);
  }
});