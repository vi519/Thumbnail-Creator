export function generateRandomGradient() {
    const colors = [];
    for (let i = 0; i < 3; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      colors.push(`rgb(${r}, ${g}, ${b})`);
    }
    const angle = Math.floor(Math.random() * 360);
    const gradientString = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
    return gradientString
}

export const colors = [
  { name: 'Black', code: '#000000' },
  { name: 'White', code: '#FFFFFF' },
  { name: 'Red', code: '#FF0000' },
  { name: 'Green', code: '#008000' },
  { name: 'Blue', code: '#0000FF' },
  { name: 'Yellow', code: '#FFFF00' },
  { name: 'Cyan', code: '#00FFFF' },
  { name: 'Magenta', code: '#FF00FF' },
  { name: 'Gray', code: '#808080' },
  { name: 'Light Gray', code: '#D3D3D3' },
  { name: 'Dark Gray', code: '#A9A9A9' },
  { name: 'Orange', code: '#FFA500' },
  { name: 'Brown', code: '#A52A2A' },
  { name: 'Purple', code: '#800080' }
];

export function getRandomColor() {
  const colors = [
      '#000000', // Black
      '#FFFFFF', // White
      '#FF0000', // Red
      '#008000', // Green
      '#0000FF', // Blue
      '#FFFF00', // Yellow
      '#00FFFF', // Cyan
      '#FF00FF', // Magenta
      '#808080', // Gray
      '#D3D3D3', // Light Gray
      '#A9A9A9', // Dark Gray
      '#FFA500', // Orange
      '#A52A2A', // Brown
      '#800080'  // Purple
  ];

  // Generate a random index to select a color from the array
  const randomIndex = Math.floor(Math.random() * colors.length);

  // Return the randomly selected color
  return colors[randomIndex];
}
