// 翻译脚本 自动对比中英文文件并补全翻译

const fs = require("fs");
const path = require("path");
const translate = require("google-translate-api-x");

const langDir = path.resolve(__dirname, "../src/lang");
const zhPath = path.join(langDir, "zh.js");
const enPath = path.join(langDir, "en.js");

function loadConfig(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const tempPath = filePath.replace(".js", ".temp.js");
  const cjsContent = content.replace("export default", "module.exports =");
  fs.writeFileSync(tempPath, cjsContent);

  try {
    const config = require(tempPath);
    fs.unlinkSync(tempPath);
    return config;
  } catch (e) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    throw e;
  }
}

async function translateText(text) {
  try {
    const res = await translate(text, { to: "en" });
    return res.text;
  } catch (e) {
    console.error(`Error translating "${text}":`, e.message);
    return text; // Fallback to original
  }
}

function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

async function processObject(source, target, prefix = "") {
  const keys = Object.keys(source);
  let hasChanges = false;

  for (const key of keys) {
    const currentPath = prefix ? `${prefix}.${key}` : key;

    if (isObject(source[key])) {
      if (!target[key]) {
        target[key] = {};
        hasChanges = true;
      }
      const nestedChanges = await processObject(
        source[key],
        target[key],
        currentPath
      );
      if (nestedChanges) hasChanges = true;
    } else {
      if (!target[key]) {
        console.log(`Translating missing key: ${currentPath} = ${source[key]}`);
        target[key] = await translateText(source[key]);
        hasChanges = true;
      }
    }
  }
  return hasChanges;
}

function objectToContent(obj) {
  const json = JSON.stringify(obj, null, 2);
  return `export default ${json}\n`;
}

async function main() {
  console.log("Starting auto-translation...");

  try {
    const zh = loadConfig(zhPath);
    let en = {};

    if (fs.existsSync(enPath)) {
      en = loadConfig(enPath);
    }

    const changed = await processObject(zh, en);

    if (changed) {
      const newContent = objectToContent(en);
      fs.writeFileSync(enPath, newContent);
      console.log("Translation complete. Updated en.js");
    } else {
      console.log("No missing keys found. en.js is up to date.");
    }
  } catch (e) {
    console.error("Translation failed:", e);
  }
}

main();
