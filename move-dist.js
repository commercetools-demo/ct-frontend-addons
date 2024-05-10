import fs from 'fs';
import path from 'path';

const distDir = 'dist';
const srcDir = 'src';

// Get all subdirectories in the src directory
const subdirs = fs.readdirSync(srcDir).filter(entry => fs.statSync(path.join(srcDir, entry)).isDirectory());

// Move files from dist/subdir/frontend to dist/subdir
subdirs.forEach(subdir => {
  const srcFrontendPath = path.join(srcDir, subdir, 'frontend');
  const destPath = path.join(distDir, subdir);

  if (fs.existsSync(srcFrontendPath)) {
    // Create the destination directory if it doesn't exist
    fs.mkdirSync(destPath, { recursive: true });

    // Move all files from the /frontend directory to the parent directory
    const frontendFiles = fs.readdirSync(path.join(distDir, subdir, 'frontend'));
    frontendFiles.forEach(file => {
      fs.renameSync(
        path.join(distDir, subdir, 'frontend', file),
        path.join(destPath, file)
      );
    });

    // Delete the /frontend directory
    fs.rmdirSync(path.join(distDir, subdir, 'frontend'));
  }
});