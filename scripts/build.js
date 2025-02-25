#!/usr/bin/env node
// @ts-check
import { mkdirSync, readFileSync, rmdirSync, readdirSync, statSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join, relative, dirname, sep } from 'path';
import ts from 'typescript';

const SRC_DIR = 'src';
const OUT_DIR = 'dist';

console.log("\n[INFO] Starting build process...\n");

// Track start time
const startTime = Date.now();

// Delete and recreate the output directory
try {
  console.log("[INFO] Cleaning output directory...");
  rmdirSync(OUT_DIR, { recursive: true });
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
mkdirSync(OUT_DIR, { recursive: true });
console.log("[SUCCESS] Output directory is ready.\n");

// Read TypeScript configuration from tsconfig.json
const { config } = ts.readConfigFile('tsconfig.json', (fileName) =>
  readFileSync(fileName).toString(),
);

/**
 * Recursively retrieves all TypeScript files inside the source directory.
 *
 * @param {string} dir - The directory to search.
 * @returns {string[]} - A list of file paths.
 */
function getTSFiles(dir) {
  let files = [];
  for (const file of readdirSync(dir)) {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      files = files.concat(getTSFiles(fullPath)); // Recursive call for subdirectories
    } else if (fullPath.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Retrieve all TypeScript files inside src/
console.log("[INFO] Scanning TypeScript source files...");
const sourceFiles = getTSFiles(SRC_DIR);
console.log(`[SUCCESS] Found ${sourceFiles.length} TypeScript files.\n`);

// Compile files for CommonJS format
console.log("[INFO] Compiling files for CommonJS...");
compile(sourceFiles, { module: ts.ModuleKind.CommonJS });

// Compile files for ES2020 format with type declarations
console.log("[INFO] Compiling files for ES Modules...");
compile(sourceFiles, {
  module: ts.ModuleKind.ES2020,
  declaration: true,
});

/**
 * Ensures that the directory exists before writing a file.
 *
 * @param {string} filePath - The full path of the file to be written.
 */
function ensureDirExists(filePath) {
  const dir = dirname(filePath);
  mkdirSync(dir, { recursive: true });
}

/**
 * Adds file extensions to import statements for ESM and CJS builds.
 *
 * @param {string} code - The compiled JavaScript code.
 * @param {string} ext - The file extension to add (e.g., '.mjs' or '.cjs').
 * @returns {string} - The modified code with correct import paths.
 */
function fixImports(code, ext) {
  return code.replace(/(import\s+.*?from\s+['"])(\.\/.*?)(['"])/g, `$1$2${ext}$3`);
}

/**
 * Compiles TypeScript files into JavaScript.
 *
 * @param {string[]} files - List of files to compile.
 * @param {ts.CompilerOptions} options - Compiler options.
 */
function compile(files, options) {
  const compilerOptions = { ...config.compilerOptions, ...options };
  const host = ts.createCompilerHost(compilerOptions);
  let builtFiles = 0;

  host.writeFile = (fileName, contents) => {
    const isDts = fileName.endsWith('.d.ts');

    // Preserve the relative path inside dist/ without absolute server paths
    const relativePath = relative(SRC_DIR, fileName);
    let outputPath = join(OUT_DIR, relativePath.split(sep).join('/'));

    if (!isDts) {
      let fileExt = '';
      switch (compilerOptions.module) {
        case ts.ModuleKind.CommonJS: {
          fileExt = '.cjs';
          contents = fixImports(contents, fileExt);
          contents += `module.exports = exports.default;\nmodule.exports.default = exports.default;\n`;
          outputPath = outputPath.replace(/\.js$/, fileExt);
          break;
        }
        case ts.ModuleKind.ES2020: {
          fileExt = '.mjs';
          contents = fixImports(contents, fileExt);
          outputPath = outputPath.replace(/\.js$/, fileExt);
          break;
        }
        default:
          throw new Error('Unhandled module type');
      }
    }

    // Ensure the parent directory exists before writing
    ensureDirExists(outputPath);

    // Write compiled file to the output directory
    writeFile(outputPath, contents)
      .then(() => {
        builtFiles++;
        console.log(`[SUCCESS] Built ${outputPath}`);
      })
      .catch((error) => console.error(`[ERROR] Failed to write ${outputPath}:`, error));
  };

  // Create a TypeScript program and emit compiled files
  const program = ts.createProgram(files, compilerOptions, host);
  program.emit();

  console.log(`[INFO] Completed compiling ${builtFiles} files.\n`);
}

// Track total build time
const endTime = Date.now();
const buildTime = ((endTime - startTime) / 1000).toFixed(2);

console.log(`[DONE] Build process completed in ${buildTime}s.\n`);