export function generateBadge(
  trekName: string,
  completionDate: string,
  difficulty: string
): string {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  canvas.width = 300
  canvas.height = 300

  // Background with brand color
  ctx.fillStyle = '#0f172a' // dark navy
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Border circle
  ctx.strokeStyle = '#fbbf24' // amber
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(150, 150, 140, 0, Math.PI * 2)
  ctx.stroke()

  // Checkmark
  ctx.fillStyle = '#fbbf24'
  ctx.font = 'bold 80px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('✓', 150, 120)

  // Trek name
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 18px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(trekName, 150, 180)

  // Completion date
  ctx.fillStyle = '#d1d5db'
  ctx.font = '12px Arial'
  ctx.fillText(`Completed: ${completionDate}`, 150, 210)

  // Difficulty
  ctx.fillStyle = '#fbbf24'
  ctx.font = 'bold 12px Arial'
  ctx.fillText(`${difficulty} Trek`, 150, 235)

  // Logo text
  ctx.fillStyle = '#fbbf24'
  ctx.font = '10px Arial'
  ctx.fillText('The Traveling Monk', 150, 270)

  return canvas.toDataURL('image/png')
}
