// Add video upload UI to timeline section
const fs = require('fs');

const videoUI = `
                      {/* Timeline videos */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <label className={labelClass}>Progress Videos ({(entry.videos || []).length})</label>
                          <label className="flex items-center gap-1 rounded bg-gold/10 px-2 py-1 text-[10px] font-semibold text-gold-dark cursor-pointer">
                            <Upload className="h-3 w-3" /> Upload Video
                            <input type="file" accept="video/*" multiple className="hidden" onChange={e => handleTimelineVideoUpload(e, idx)} />
                          </label>
                        </div>
                        <div className="mb-2">
                          <p className="text-xs text-muted">💡 Videos up to 50MB supported. Larger uploads may take a few moments.</p>
                        </div>
                        {(entry.videos || []).length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {(entry.videos || []).map((vid, vidIdx) => (
                              <div key={vidIdx} className="group relative aspect-video rounded overflow-hidden bg-gray-100 border border-gray-200">
                                <video 
                                  src={vid.src} 
                                  className="h-full w-full object-cover" 
                                  controls={false} 
                                  muted 
                                  poster=""
                                  preload="metadata"
                                >
                                  Your browser does not support the video tag.
                                </video>
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                  <div className="bg-white/90 rounded-full p-2">
                                    <svg className="h-4 w-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                </div>
                                <div className="absolute bottom-1 left-1 bg-black/70 px-1.5 py-0.5 rounded text-xs text-white">
                                  {vid.alt}
                                </div>
                                <button onClick={() => removeTimelineVideo(idx, vidIdx)} className="absolute top-1 right-1 hidden group-hover:flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white cursor-pointer hover:bg-red-600"><X className="h-3 w-3" /></button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>`;

try {
  let content = fs.readFileSync('/opt/openclaw/workspace/nauhomes/src/app/admin/AdminDashboard.tsx', 'utf8');
  
  // Find the timeline photos section and add videos after it
  const photosEndPattern = '</div>\n                      </div>';
  const photosEndIndex = content.indexOf(photosEndPattern, content.indexOf('Progress Photos'));
  
  if (photosEndIndex === -1) {
    console.log('Could not find timeline photos section end');
    process.exit(1);
  }
  
  // Insert the video UI after the photos section
  const insertPoint = photosEndIndex + photosEndPattern.length;
  content = content.slice(0, insertPoint) + videoUI + content.slice(insertPoint);
  
  fs.writeFileSync('/opt/openclaw/workspace/nauhomes/src/app/admin/AdminDashboard.tsx', content);
  console.log('✅ Video upload UI added successfully');
  
} catch (error) {
  console.error('❌ Error:', error.message);
}