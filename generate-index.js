const fs = require('fs');
const path = require('path');

const categoriesDir = './media/portfolio';

// Category mapping: folder name -> data-category value for filtering
const categoryMap = {
  'Sculptures- Installations': 'sculpture',
  'Alt-Photography': 'photography',
  'Digital Collages': 'digital',
  'Public Art': 'public-art',
  'Textiles': 'textiles',
  'Oil Paintings': 'paintings',
  'Breathing Room': 'breathing-room',
  'Works on Paper': 'works-on-paper'
};

// Check if directory exists
if (!fs.existsSync(categoriesDir)) {
  console.error(`Error: Directory "${categoriesDir}" not found!`);
  process.exit(1);
}

// Get all category folders
const categories = fs.readdirSync(categoriesDir)
  .filter(f => {
    const fullPath = path.join(categoriesDir, f);
    return fs.statSync(fullPath).isDirectory();
  })
  .sort();

const galleryData = [];

// Loop through each category
categories.forEach(category => {
  const categoryPath = path.join(categoriesDir, category);
  
  // Get all image files
  const images = fs.readdirSync(categoryPath)
    .filter(f => {
      const fullPath = path.join(categoryPath, f);
      const isFile = fs.statSync(fullPath).isFile();
      const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(f);
      return isFile && isImage;
    })
    .sort();
  
  if (images.length > 0) {
    // Get the data-category value from mapping (fallback to lowercase category name)
    const dataCategory = categoryMap[category] || category.toLowerCase().replace(/\s+/g, '-');
    
    images.forEach((image, index) => {
      galleryData.push({
        src: `media/portfolio/${category}/${image}`,
        alt: image.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        category: dataCategory,
        title: image.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        categoryName: category
      });
    });
  }
});

// Write JSON file
fs.writeFileSync('./gallery-data.json', JSON.stringify(galleryData, null, 2));
console.log('✓ gallery-data.json generated successfully!');
console.log(`✓ Total images found: ${galleryData.length}`);

// Group by category for summary
const byCategory = {};
galleryData.forEach(item => {
  if (!byCategory[item.categoryName]) {
    byCategory[item.categoryName] = 0;
  }
  byCategory[item.categoryName]++;
});

Object.entries(byCategory).forEach(([cat, count]) => {
  console.log(`  - ${cat}: ${count} images`);
});
