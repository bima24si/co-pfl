const fs = require('fs')
const path = require('path')

const sourceDir = path.resolve(__dirname, 'co-pfl', 'dist')
const targetDir = path.resolve(__dirname, 'dist')

function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true })
  }
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source directory does not exist: ${src}`)
  }
  fs.mkdirSync(dest, { recursive: true })
  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item)
    const destPath = path.join(dest, item)
    const stat = fs.statSync(srcPath)
    if (stat.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

removeDir(targetDir)
copyDir(sourceDir, targetDir)
console.log(`Copied build output from ${sourceDir} to ${targetDir}`)
