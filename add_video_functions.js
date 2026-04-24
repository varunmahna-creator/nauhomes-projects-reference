// Add video upload functions to AdminDashboard.tsx
const fs = require('fs');

const videoFunctions = `
  async function handleTimelineVideoUpload(e: React.ChangeEvent<HTMLInputElement>, entryIndex: number) {
    const files = e.target.files;
    if (!files?.length) return;
    const slug = editingProject?.slug || projectForm.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "new-project";
    
    setUploading(true);
    
    try {
      for (const file of Array.from(files)) {
        // Check file size - use large upload endpoint for videos
        const maxSizeBytes = 50 * 1024 * 1024; // 50MB limit for videos
        if (file.size > maxSizeBytes) {
          throw new Error(\`Video "\${file.name}" is too large (\${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum size is 50MB.\`);
        }
        
        const fd = new FormData();
        fd.append("file", file);
        fd.append("slug", slug);
        fd.append("category", "timeline");
        
        // Use large upload endpoint for videos to bypass 4MB serverless limit
        const uploadEndpoint = "/api/upload-large";
        const res = await fetch(uploadEndpoint, { method: "POST", body: fd });
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ error: \`Upload failed (\${res.status})\` }));
          throw new Error(errorData.error || 'Upload failed');
        }
        
        const { path: p } = await res.json();
        
        setProjectForm(prev => {
          const timeline = [...(prev.timeline || [])];
          timeline[entryIndex] = {
            ...timeline[entryIndex],
            videos: [...(timeline[entryIndex].videos || []), { src: p, alt: file.name.replace(/\\.[^.]+$/, "") }],
          };
          return { ...prev, timeline };
        });
      }
      showMsg("success", "Timeline videos uploaded");
    } catch (error) { 
      showMsg("error", \`Upload failed: \${error instanceof Error ? error.message : 'Unknown error'}\`); 
    } finally { 
      setUploading(false); 
      e.target.value = ""; 
    }
  }

  function removeTimelineVideo(entryIndex: number, videoIndex: number) {
    setProjectForm(prev => {
      const timeline = [...(prev.timeline || [])];
      timeline[entryIndex] = {
        ...timeline[entryIndex],
        videos: (timeline[entryIndex].videos || []).filter((_, i) => i !== videoIndex),
      };
      return { ...prev, timeline };
    });
  }`;

try {
  let content = fs.readFileSync('/opt/openclaw/workspace/nauhomes/src/app/admin/AdminDashboard.tsx', 'utf8');
  
  // Find the location after removeTimelineImage function
  const insertPoint = content.indexOf('  // =============== TESTIMONIAL CRUD ===============');
  
  if (insertPoint === -1) {
    console.log('Could not find insertion point');
    process.exit(1);
  }
  
  // Insert the video functions before the testimonial section
  content = content.slice(0, insertPoint) + videoFunctions + '\n\n' + content.slice(insertPoint);
  
  fs.writeFileSync('/opt/openclaw/workspace/nauhomes/src/app/admin/AdminDashboard.tsx', content);
  console.log('✅ Video upload functions added successfully');
  
} catch (error) {
  console.error('❌ Error:', error.message);
}