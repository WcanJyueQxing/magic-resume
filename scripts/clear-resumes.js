// 清理简历数据脚本
const fs = require('fs');
const path = require('path');

// 可能的数据存储位置
const possiblePaths = [
  // Windows Chrome localStorage
  path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'User Data', 'Default', 'Local Storage', 'leveldb'),
  // Windows Firefox
  path.join(process.env.APPDATA || '', 'Mozilla', 'Firefox', 'Profiles'),
  // macOS Chrome
  path.join(require('os').homedir(), 'Library', 'Application Support', 'Google', 'Chrome', 'Default', 'Local Storage'),
  // 本地文件存储
  path.join(require('os').homedir(), '.magic-resume'),
];

console.log('尝试查找简历数据存储位置...');

possiblePaths.forEach(p => {
  if (fs.existsSync(p)) {
    console.log(`找到: ${p}`);
  }
});

console.log('\n由于浏览器数据存储在 localStorage 中，您需要手动清除浏览器缓存。');
console.log('方法：');
console.log('1. 打开浏览器开发者工具 (F12)');
console.log('2. 切换到 Application 或 Storage 标签');
console.log('3. 找到 localStorage');
console.log('4. 删除 resume-storage 相关的数据');
console.log('5. 刷新页面');
