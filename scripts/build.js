#!/usr/bin/env node
// @ts-check
import { mkdirSync, readFileSync, rmdirSync, readdirSync, statSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join, relative, dirname, sep } from 'path';
import ts from 'typescript';

const SRC_DIR = 'src';
const OUT_DIR = 'dist';

// Delete and recreate the output directory
try {
  rmdirSync(OUT_DIR, { recursive: true });
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
mkdirSync(OUT_DIR, { recursive: true });

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
const sourceFiles = getTSFiles(SRC_DIR);

// Compile files for CommonJS format
compile(sourceFiles, { module: ts.ModuleKind.CommonJS });

// Compile files for ES2020 format with type declarations
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
 * Compiles TypeScript files into JavaScript.
 *
 * @param {string[]} files - List of files to compile.
 * @param {ts.CompilerOptions} options - Compiler options.
 */
function compile(files, options) {
  const compilerOptions = { ...config.compilerOptions, ...options };
  const host = ts.createCompilerHost(compilerOptions);

  host.writeFile = (fileName, contents) => {
    const isDts = fileName.endsWith('.d.ts');

    // Preserve the relative path inside dist/ without absolute server paths
    const relativePath = relative(SRC_DIR, fileName);
    let outputPath = join(OUT_DIR, relativePath.split(sep).join('/'));

    if (!isDts) {
      switch (compilerOptions.module) {
        case ts.ModuleKind.CommonJS: {
          // Ensure backward compatibility for Node.js
          contents += `module.exports = exports.default;\nmodule.exports.default = exports.default;\n`;
          // Change file extension to .cjs
          outputPath = outputPath.replace(/\.js$/, '.cjs');
          break;
        }
        case ts.ModuleKind.ES2020: {
          // Change file extension to .mjs
          outputPath = outputPath.replace(/\.js$/, '.mjs');
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
      .then(() => console.log('Built', outputPath))
      .catch((error) => console.error(error));
  };

  // Create a TypeScript program and emit compiled files
  const program = ts.createProgram(files, compilerOptions, host);
  program.emit();
}