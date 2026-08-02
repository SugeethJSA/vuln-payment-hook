const fs = require('fs');
const path = require('path');
const https = require('https');

const logFile = path.join(__dirname, '../.system_generated/logs/transcript.jsonl');

// Let's read the latest step or search for all occ image URLs from the codebase/scratch
const dest = path.join(__dirname, '../public/covers');
if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

const extraImages = [
  { name: 'callout-horn.svg', url: 'https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAU4uBbW9sNVnJwR483jkMOuYpsdcNrcU8hUXz-jI4w1V9_JTK1rC7vRKM9taaGUULqV6hqnora60Av-u7KuwzB-QmYqAPF3seXzSWm0SzWlvGRbwOlYT8gnZHi0HRZ0iNKmmYQ.svg' },
  { name: 'callout-thumbs.svg', url: 'https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAcwLV_sIdYy-kWyirDs4WuiUL3CvnJK7Ij2P6jaA3-xa815UgzBCudP413j2fsG5RmaOmyk1dAp6BZK-kzwiqMy8c3JF9909r8bPCnNvY0EpgWL2YuL3ImBnAg6KPtMdv0nkVg9aAoKz2oQ-9Rlp.svg' },
  { name: 'netflix-brand-logotype.svg', url: 'https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAVvRDRqBcLS7fk0Qpns6gQSS3VdMMYtpN_ba4Nzu63yuVrE7JHt-MdKCNAQnJ8SrsPBqivurwF6ugwnAa54jBGNohFD6CNLHDjwQUnPO_cKrHSqgmLOAw0zUe2dRClJd4cchXguY1Bjj.svg' },
  { name: 'profile-augustine.png', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/SO2HoVCx33X8phZh2pZZmQ4QgNY/AAAABWdoQDrgD7cokEYrF-FVdgfoil5wiBMg6j3GeUjYY_av6C64opFSXOsJ5U8EF02G6SB6b4zUw4MSG6EtpQu8gUBg1Y5Bgs4.png?r=229' }
];

async function downloadExtra() {
  for (const item of extraImages) {
    const file = path.join(dest, item.name);
    try {
      await new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(file);
        https.get(item.url, (res) => {
          if (res.statusCode === 301 || res.statusCode === 302) {
            https.get(res.headers.location, (res2) => {
              res2.pipe(fileStream);
              fileStream.on('finish', resolve);
            }).on('error', reject);
          } else {
            res.pipe(fileStream);
            fileStream.on('finish', resolve);
          }
        }).on('error', reject);
      });
      console.log('Downloaded:', item.name);
    } catch (e) {
      console.error('Error downloading:', item.name, e.message);
    }
  }
}

downloadExtra();
