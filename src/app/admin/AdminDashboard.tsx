"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Plus, Pencil, Trash2, Upload, X, Save, ArrowLeft,
  Image as ImageIcon, MapPin, Loader2, Eye, Star,
  ChevronUp, ChevronDown, Clock, Video, Globe, Settings,
  ExternalLink, Newspaper
} from "lucide-react";
import Link from "next/link";
import type {
  Project, ProjectImage, Testimonial, TimelineEntry,
  MediaItem, SiteSettings, SocialLinks, SectionVisibility,
  HomepageImages, Lead, LeadStatus,
} from "@/types";

type ViewMode = "list" | "edit" | "create";
type AdminSection = "projects" | "leads" | "testimonials" | "media" | "settings";

const DEFAULT_HOMEPAGE_IMAGES: HomepageImages = {
  heroAll: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
  heroDelhi: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
  heroBali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80",
  aboutDelhi: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
  aboutBali: "https://images.unsplash.com/photo-1573790387438-4da905039392?w=1920&q=80",
  ctaBackground: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c0?w=1920&q=80",
};

const DEFAULT_SETTINGS: SiteSettings = {
  socialLinks: { facebook: "", instagram: "", youtube: "", twitter: "", linkedin: "" },
  sectionVisibility: {
    stats: true, about: true, services: true, projects: true, process: true,
    whyUs: true, testimonials: true, blog: true, faq: true, cta: true, mediaCoverage: true,
  },
  homepageImages: DEFAULT_HOMEPAGE_IMAGES,
};

export default function AdminDashboard() {
  const [section, setSection] = useState<AdminSection>("projects");

  // === PROJECT STATE ===
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectLoading, setProjectLoading] = useState(true);
  const [projectViewMode, setProjectViewMode] = useState<ViewMode>("list");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({});

  // === TESTIMONIAL STATE ===
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialLoading, setTestimonialLoading] = useState(true);
  const [testimonialViewMode, setTestimonialViewMode] = useState<ViewMode>("list");
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<Partial<Testimonial>>({});

  // === LEADS STATE ===
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [leadFilter, setLeadFilter] = useState<LeadStatus | "all">("all");
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  // === MEDIA STATE ===
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaLoading, setMediaLoading] = useState(true);
  const [mediaViewMode, setMediaViewMode] = useState<ViewMode>("list");
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [mediaForm, setMediaForm] = useState<Partial<MediaItem>>({});

  // === SETTINGS STATE ===
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [settingsLoading, setSettingsLoading] = useState(true);

  // === SHARED STATE ===
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // === FETCH ===
  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      setProjects(await res.json());
    } catch { showMsg("error", "Failed to load projects"); }
    finally { setProjectLoading(false); }
  }, []);

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch("/api/testimonials");
      setTestimonials(await res.json());
    } catch { showMsg("error", "Failed to load testimonials"); }
    finally { setTestimonialLoading(false); }
  }, []);

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch("/api/leads");
      setLeads(await res.json());
    } catch { showMsg("error", "Failed to load leads"); }
    finally { setLeadsLoading(false); }
  }, []);

  const fetchMedia = useCallback(async () => {
    try {
      const res = await fetch("/api/media");
      setMediaItems(await res.json());
    } catch { showMsg("error", "Failed to load media"); }
    finally { setMediaLoading(false); }
  }, []);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setSiteSettings({
          socialLinks: { ...DEFAULT_SETTINGS.socialLinks, ...data.socialLinks },
          sectionVisibility: { ...DEFAULT_SETTINGS.sectionVisibility, ...data.sectionVisibility },
          homepageImages: { ...DEFAULT_HOMEPAGE_IMAGES, ...data.homepageImages },
        });
      }
    } catch { showMsg("error", "Failed to load settings"); }
    finally { setSettingsLoading(false); }
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchTestimonials();
    fetchLeads();
    fetchMedia();
    fetchSettings();
  }, [fetchProjects, fetchTestimonials, fetchLeads, fetchMedia, fetchSettings]);

  function showMsg(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }

  // === STYLES ===
  const inputClass = "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy placeholder-muted focus:outline-none focus:ring-2 focus:border-gold focus:ring-gold/30";
  const labelClass = "mb-1.5 block text-sm font-medium text-navy";

  // =============== PROJECT CRUD ===============
  function startCreateProject() {
    setProjectForm({
      title: "", subtitle: "", location: "delhi", locationLabel: "",
      status: "ongoing", type: "", area: "", year: "",
      thumbnail: "", gallery: [], floorPlans: [], tourEmbedUrl: "",
      description: "", highlights: [], amenities: [], specs: {}, timeline: [],
    });
    setEditingProject(null);
    setProjectViewMode("create");
  }

  function startEditProject(p: Project) {
    setProjectForm({ ...p, timeline: p.timeline || [] });
    setEditingProject(p);
    setProjectViewMode("edit");
  }

  async function handleSaveProject() {
    if (!projectForm.title) { showMsg("error", "Title is required"); return; }
    setSaving(true);
    try {
      const url = projectViewMode === "edit" && editingProject
        ? `/api/projects/${editingProject.slug}` : "/api/projects";
      const res = await fetch(url, {
        method: projectViewMode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectForm),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error); }
      showMsg("success", projectViewMode === "edit" ? "Project updated!" : "Project created!");
      setProjectViewMode("list");
      fetchProjects();
    } catch (err) { showMsg("error", err instanceof Error ? err.message : "Failed to save"); }
    finally { setSaving(false); }
  }

  async function handleDeleteProject(slug: string) {
    if (!confirm("Delete this project?")) return;
    try {
      await fetch(`/api/projects/${slug}`, { method: "DELETE" });
      showMsg("success", "Project deleted");
      fetchProjects();
    } catch { showMsg("error", "Failed to delete"); }
  }

  // === Project image uploads ===
  async function handleProjectImageUpload(e: React.ChangeEvent<HTMLInputElement>, imageType: "gallery" | "floorplan" | "thumbnail") {
    const files = e.target.files;
    if (!files?.length) return;
    const slug = editingProject?.slug || projectForm.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "new-project";
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("slug", slug);
        fd.append("type", imageType);
        fd.append("category", "project");
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (!res.ok) throw new Error();
        const { path: p } = await res.json();
        if (imageType === "thumbnail") setProjectForm(prev => ({ ...prev, thumbnail: p }));
        else if (imageType === "gallery") setProjectForm(prev => ({ ...prev, gallery: [...(prev.gallery || []), { src: p, alt: file.name.replace(/\.[^.]+$/, "") }] }));
        else setProjectForm(prev => ({ ...prev, floorPlans: [...(prev.floorPlans || []), { src: p, alt: file.name.replace(/\.[^.]+$/, "") }] }));
      }
      showMsg("success", `${files.length} image(s) uploaded`);
    } catch { showMsg("error", "Upload failed"); }
    finally { setUploading(false); e.target.value = ""; }
  }

  // === Timeline management ===
  function addTimelineEntry() {
    setProjectForm(prev => ({
      ...prev,
      timeline: [...(prev.timeline || []), { date: "", title: "", description: "", images: [] }],
    }));
  }

  function updateTimelineEntry(index: number, field: keyof TimelineEntry, value: string) {
    setProjectForm(prev => {
      const timeline = [...(prev.timeline || [])];
      timeline[index] = { ...timeline[index], [field]: value };
      return { ...prev, timeline };
    });
  }

  function removeTimelineEntry(index: number) {
    setProjectForm(prev => ({
      ...prev,
      timeline: (prev.timeline || []).filter((_, i) => i !== index),
    }));
  }

  function moveTimelineEntry(index: number, direction: "up" | "down") {
    setProjectForm(prev => {
      const timeline = [...(prev.timeline || [])];
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= timeline.length) return prev;
      [timeline[index], timeline[target]] = [timeline[target], timeline[index]];
      return { ...prev, timeline };
    });
  }

  async function handleTimelineImageUpload(e: React.ChangeEvent<HTMLInputElement>, entryIndex: number) {
    const files = e.target.files;
    if (!files?.length) return;
    const slug = editingProject?.slug || projectForm.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "new-project";
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("slug", slug);
        fd.append("type", "timeline");
        fd.append("category", "timeline");
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (!res.ok) throw new Error();
        const { path: p } = await res.json();
        setProjectForm(prev => {
          const timeline = [...(prev.timeline || [])];
          timeline[entryIndex] = {
            ...timeline[entryIndex],
            images: [...(timeline[entryIndex].images || []), { src: p, alt: file.name.replace(/\.[^.]+$/, "") }],
          };
          return { ...prev, timeline };
        });
      }
      showMsg("success", "Timeline photos uploaded");
    } catch { showMsg("error", "Upload failed"); }
    finally { setUploading(false); e.target.value = ""; }
  }

  function removeTimelineImage(entryIndex: number, imageIndex: number) {
    setProjectForm(prev => {
      const timeline = [...(prev.timeline || [])];
      timeline[entryIndex] = {
        ...timeline[entryIndex],
        images: timeline[entryIndex].images.filter((_, i) => i !== imageIndex),
      };
      return { ...prev, timeline };
    });
  }

  // =============== TESTIMONIAL CRUD ===============
  function startCreateTestimonial() {
    setTestimonialForm({ name: "", location: "", quote: "", rating: 5, profession: "", image: "", videoUrl: "" });
    setEditingTestimonial(null);
    setTestimonialViewMode("create");
  }

  function startEditTestimonial(t: Testimonial) {
    setTestimonialForm({ ...t });
    setEditingTestimonial(t);
    setTestimonialViewMode("edit");
  }

  async function handleSaveTestimonial() {
    if (!testimonialForm.name || !testimonialForm.quote) { showMsg("error", "Name and quote are required"); return; }
    setSaving(true);
    try {
      const url = testimonialViewMode === "edit" && editingTestimonial
        ? `/api/testimonials/${editingTestimonial.id}` : "/api/testimonials";
      const res = await fetch(url, {
        method: testimonialViewMode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialForm),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      showMsg("success", testimonialViewMode === "edit" ? "Testimonial updated!" : "Testimonial created!");
      setTestimonialViewMode("list");
      fetchTestimonials();
    } catch (err) { showMsg("error", err instanceof Error ? err.message : "Failed to save"); }
    finally { setSaving(false); }
  }

  async function handleDeleteTestimonial(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      showMsg("success", "Testimonial deleted");
      fetchTestimonials();
    } catch { showMsg("error", "Failed to delete"); }
  }

  async function handleTestimonialPhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    const tid = editingTestimonial?.id || testimonialForm.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "new";
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", files[0]);
      fd.append("testimonialId", tid);
      fd.append("type", "photo");
      fd.append("category", "testimonial");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      const { path: p } = await res.json();
      setTestimonialForm(prev => ({ ...prev, image: p }));
      showMsg("success", "Photo uploaded");
    } catch { showMsg("error", "Upload failed"); }
    finally { setUploading(false); e.target.value = ""; }
  }

  async function handleTestimonialVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    const tid = editingTestimonial?.id || testimonialForm.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "new";
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", files[0]);
      fd.append("testimonialId", tid);
      fd.append("type", "video");
      fd.append("category", "testimonial");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      const { path: p } = await res.json();
      setTestimonialForm(prev => ({ ...prev, videoUrl: p }));
      showMsg("success", "Video uploaded");
    } catch { showMsg("error", "Upload failed"); }
    finally { setUploading(false); e.target.value = ""; }
  }

  // =============== LEAD MANAGEMENT ===============
  async function handleUpdateLeadStatus(id: string, status: LeadStatus) {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      showMsg("success", "Lead status updated");
      fetchLeads();
    } catch { showMsg("error", "Failed to update lead"); }
  }

  async function handleUpdateLeadNotes(id: string, notes: string) {
    try {
      await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      fetchLeads();
    } catch { showMsg("error", "Failed to save notes"); }
  }

  async function handleDeleteLead(id: string) {
    if (!confirm("Delete this lead?")) return;
    try {
      await fetch(`/api/leads/${id}`, { method: "DELETE" });
      showMsg("success", "Lead deleted");
      fetchLeads();
    } catch { showMsg("error", "Failed to delete"); }
  }

  const filteredLeads = leadFilter === "all" ? leads : leads.filter(l => l.status === leadFilter);
  const leadCounts = {
    all: leads.length,
    new: leads.filter(l => l.status === "new").length,
    contacted: leads.filter(l => l.status === "contacted").length,
    qualified: leads.filter(l => l.status === "qualified").length,
    converted: leads.filter(l => l.status === "converted").length,
    lost: leads.filter(l => l.status === "lost").length,
  };

  // =============== MEDIA CRUD ===============
  function startCreateMedia() {
    setMediaForm({ name: "", logoUrl: "", articleUrl: "", date: "" });
    setEditingMedia(null);
    setMediaViewMode("create");
  }

  function startEditMedia(m: MediaItem) {
    setMediaForm({ ...m });
    setEditingMedia(m);
    setMediaViewMode("edit");
  }

  async function handleSaveMedia() {
    if (!mediaForm.name) { showMsg("error", "Name is required"); return; }
    setSaving(true);
    try {
      const url = mediaViewMode === "edit" && editingMedia
        ? `/api/media/${editingMedia.id}` : "/api/media";
      const res = await fetch(url, {
        method: mediaViewMode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mediaForm),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error); }
      showMsg("success", mediaViewMode === "edit" ? "Media updated!" : "Media created!");
      setMediaViewMode("list");
      fetchMedia();
    } catch (err) { showMsg("error", err instanceof Error ? err.message : "Failed to save"); }
    finally { setSaving(false); }
  }

  async function handleDeleteMedia(id: string) {
    if (!confirm("Delete this media item?")) return;
    try {
      await fetch(`/api/media/${id}`, { method: "DELETE" });
      showMsg("success", "Media deleted");
      fetchMedia();
    } catch { showMsg("error", "Failed to delete"); }
  }

  async function handleMediaLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", files[0]);
      fd.append("category", "media");
      fd.append("testimonialId", "");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      const { path: p } = await res.json();
      setMediaForm(prev => ({ ...prev, logoUrl: p }));
      showMsg("success", "Logo uploaded");
    } catch { showMsg("error", "Upload failed"); }
    finally { setUploading(false); e.target.value = ""; }
  }

  // =============== SETTINGS ===============
  async function handleSaveSettings() {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteSettings),
      });
      if (!res.ok) throw new Error();
      showMsg("success", "Settings saved!");
    } catch { showMsg("error", "Failed to save settings"); }
    finally { setSaving(false); }
  }

  function updateSocialLink(key: keyof SocialLinks, value: string) {
    setSiteSettings(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [key]: value },
    }));
  }

  function toggleSectionVisibility(key: keyof SectionVisibility) {
    setSiteSettings(prev => ({
      ...prev,
      sectionVisibility: { ...prev.sectionVisibility, [key]: !prev.sectionVisibility[key] },
    }));
  }

  // =============== RENDER ===============
  const MessageBar = () => message ? (
    <div className={cn("mb-6 rounded-lg px-4 py-3 text-sm font-medium", message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>
      {message.text}
    </div>
  ) : null;

  // === SECTION TABS ===
  const SectionTabs = () => (
    <div className="flex gap-1 rounded-lg bg-white border border-gray-200 p-1 mb-8">
      {(["projects", "leads", "testimonials", "media", "settings"] as AdminSection[]).map(s => (
        <button key={s} onClick={() => {
          setSection(s);
          setProjectViewMode("list");
          setTestimonialViewMode("list");
          setMediaViewMode("list");
        }}
          className={cn("flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors cursor-pointer capitalize",
            section === s ? "bg-gold text-navy" : "text-muted hover:text-navy"
          )}>
          {s}
        </button>
      ))}
    </div>
  );

  // =============== PROJECTS LIST ===============
  if (section === "projects" && projectViewMode === "list") {
    return (
      <div className="min-h-screen bg-cream pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>Admin Dashboard</h1>
            <button onClick={startCreateProject} className="flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-navy hover:bg-gold-dark cursor-pointer">
              <Plus className="h-4 w-4" /> Add Project
            </button>
          </div>
          <SectionTabs />
          <MessageBar />
          {projectLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left">
                <thead className="bg-navy text-white">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Project</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">Location</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Images</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {projects.map(p => (
                    <tr key={p.slug} className="hover:bg-cream/50 transition-colors">
                      <td className="px-4 py-3"><p className="text-sm font-semibold text-navy">{p.title}</p><p className="text-xs text-muted">{p.type} &bull; {p.area}</p></td>
                      <td className="px-4 py-3 hidden sm:table-cell"><span className="flex items-center gap-1 text-sm text-muted"><MapPin className="h-3.5 w-3.5" />{p.location === "delhi" ? "Delhi" : "Bali"}</span></td>
                      <td className="px-4 py-3 hidden md:table-cell"><span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", p.status === "completed" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700")}>{p.status}</span></td>
                      <td className="px-4 py-3 hidden lg:table-cell"><span className="text-xs text-muted">{p.gallery.length} photos</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/projects/${p.slug}`} className="rounded-lg p-2 text-muted hover:bg-cream hover:text-navy transition-colors" title="View"><Eye className="h-4 w-4" /></Link>
                          <button onClick={() => startEditProject(p)} className="rounded-lg p-2 text-muted hover:bg-gold/10 hover:text-gold-dark transition-colors cursor-pointer" title="Edit"><Pencil className="h-4 w-4" /></button>
                          <button onClick={() => handleDeleteProject(p.slug)} className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer" title="Delete"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =============== PROJECT EDIT/CREATE ===============
  if (section === "projects" && (projectViewMode === "edit" || projectViewMode === "create")) {
    return (
      <div className="min-h-screen bg-cream pt-24">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setProjectViewMode("list")} className="rounded-lg p-2 text-muted hover:bg-white hover:text-navy transition-colors cursor-pointer"><ArrowLeft className="h-5 w-5" /></button>
            <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>
              {projectViewMode === "edit" ? `Edit: ${editingProject?.title}` : "New Project"}
            </h1>
          </div>
          <MessageBar />
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="rounded-xl bg-white p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-navy mb-4" style={{ fontFamily: "var(--font-heading)" }}>Basic Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className={labelClass}>Title *</label><input className={inputClass} placeholder="e.g., Luxury Villa GK-1" value={projectForm.title || ""} onChange={e => setProjectForm(p => ({ ...p, title: e.target.value }))} /></div>
                <div><label className={labelClass}>Subtitle</label><input className={inputClass} placeholder="e.g., Contemporary Urban Living" value={projectForm.subtitle || ""} onChange={e => setProjectForm(p => ({ ...p, subtitle: e.target.value }))} /></div>
                <div><label className={labelClass}>Location</label><select className={inputClass} value={projectForm.location || "delhi"} onChange={e => setProjectForm(p => ({ ...p, location: e.target.value as "delhi" | "bali" }))}><option value="delhi">Delhi</option><option value="bali">Bali</option></select></div>
                <div><label className={labelClass}>Location Label</label><input className={inputClass} placeholder="Greater Kailash 1, New Delhi" value={projectForm.locationLabel || ""} onChange={e => setProjectForm(p => ({ ...p, locationLabel: e.target.value }))} /></div>
                <div><label className={labelClass}>Status</label><select className={inputClass} value={projectForm.status || "ongoing"} onChange={e => setProjectForm(p => ({ ...p, status: e.target.value as "completed" | "ongoing" }))}><option value="ongoing">Ongoing</option><option value="completed">Completed</option></select></div>
                <div><label className={labelClass}>Type</label><input className={inputClass} placeholder="Residential Villa" value={projectForm.type || ""} onChange={e => setProjectForm(p => ({ ...p, type: e.target.value }))} /></div>
                <div><label className={labelClass}>Area</label><input className={inputClass} placeholder="4,500 sq ft" value={projectForm.area || ""} onChange={e => setProjectForm(p => ({ ...p, area: e.target.value }))} /></div>
                <div><label className={labelClass}>Year</label><input className={inputClass} placeholder="2024" value={projectForm.year || ""} onChange={e => setProjectForm(p => ({ ...p, year: e.target.value }))} /></div>
              </div>
              <div className="mt-4"><label className={labelClass}>Description</label><textarea className={cn(inputClass, "resize-none")} rows={4} value={projectForm.description || ""} onChange={e => setProjectForm(p => ({ ...p, description: e.target.value }))} /></div>
              <div className="mt-4"><label className={labelClass}>360° Tour URL</label><input className={inputClass} placeholder="https://my.matterport.com/show/?m=..." value={projectForm.tourEmbedUrl || ""} onChange={e => setProjectForm(p => ({ ...p, tourEmbedUrl: e.target.value || null }))} /></div>
            </div>

            {/* Thumbnail */}
            <div className="rounded-xl bg-white p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-navy mb-4" style={{ fontFamily: "var(--font-heading)" }}>Thumbnail</h2>
              {projectForm.thumbnail && !projectForm.thumbnail.includes("/placeholders/") ? (
                <div className="flex items-center gap-4">
                  <img src={projectForm.thumbnail} alt="Thumbnail" className="h-20 w-32 rounded-lg object-cover" />
                  <button onClick={() => setProjectForm(p => ({ ...p, thumbnail: "" }))} className="text-sm text-red-500 cursor-pointer">Remove</button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-200 px-6 py-8 hover:border-gold/50">
                  <Upload className="h-8 w-8 text-muted/50" /><span className="text-sm font-medium text-muted">Upload thumbnail</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => handleProjectImageUpload(e, "thumbnail")} />
                </label>
              )}
            </div>

            {/* Gallery */}
            <div className="rounded-xl bg-white p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>Gallery ({(projectForm.gallery || []).length})</h2>
                <label className="flex items-center gap-1.5 rounded-lg bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold-dark cursor-pointer">
                  <Upload className="h-3.5 w-3.5" /> Add Photos
                  <input type="file" accept="image/*" multiple className="hidden" onChange={e => handleProjectImageUpload(e, "gallery")} />
                </label>
              </div>
              {(projectForm.gallery || []).length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                  {(projectForm.gallery || []).map((img, i) => (
                    <div key={i} className="group relative aspect-square rounded-lg overflow-hidden bg-navy/5">
                      <img src={img.src} alt={img.alt} className="h-full w-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      <button onClick={() => setProjectForm(p => ({ ...p, gallery: (p.gallery || []).filter((_, j) => j !== i) }))}
                        className="absolute top-1 right-1 z-10 hidden group-hover:flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white cursor-pointer"><X className="h-3 w-3" /></button>
                    </div>
                  ))}
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-200 px-6 py-8 hover:border-gold/50">
                  <ImageIcon className="h-8 w-8 text-muted/50" /><span className="text-sm text-muted">Upload gallery photos</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={e => handleProjectImageUpload(e, "gallery")} />
                </label>
              )}
            </div>

            {/* Floor Plans */}
            <div className="rounded-xl bg-white p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>Floor Plans ({(projectForm.floorPlans || []).length})</h2>
                <label className="flex items-center gap-1.5 rounded-lg bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold-dark cursor-pointer">
                  <Upload className="h-3.5 w-3.5" /> Add
                  <input type="file" accept="image/*" multiple className="hidden" onChange={e => handleProjectImageUpload(e, "floorplan")} />
                </label>
              </div>
              {(projectForm.floorPlans || []).length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(projectForm.floorPlans || []).map((fp, i) => (
                    <div key={i} className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-cream border border-gray-200">
                      <img src={fp.src} alt={fp.alt} className="h-full w-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      <button onClick={() => setProjectForm(p => ({ ...p, floorPlans: (p.floorPlans || []).filter((_, j) => j !== i) }))}
                        className="absolute top-1 right-1 z-10 hidden group-hover:flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white cursor-pointer"><X className="h-3 w-3" /></button>
                    </div>
                  ))}
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-200 px-6 py-6 hover:border-gold/50">
                  <ImageIcon className="h-8 w-8 text-muted/50" /><span className="text-sm text-muted">Upload floor plans</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={e => handleProjectImageUpload(e, "floorplan")} />
                </label>
              )}
            </div>

            {/* Features */}
            <div className="rounded-xl bg-white p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-navy mb-4" style={{ fontFamily: "var(--font-heading)" }}>Features & Specs</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className={labelClass}>Highlights (one per line)</label><textarea className={cn(inputClass, "resize-none")} rows={6} value={(projectForm.highlights || []).join("\n")} onChange={e => setProjectForm(p => ({ ...p, highlights: e.target.value.split("\n").filter(Boolean) }))} /></div>
                <div><label className={labelClass}>Amenities (one per line)</label><textarea className={cn(inputClass, "resize-none")} rows={6} value={(projectForm.amenities || []).join("\n")} onChange={e => setProjectForm(p => ({ ...p, amenities: e.target.value.split("\n").filter(Boolean) }))} /></div>
              </div>
              <div className="mt-4"><label className={labelClass}>Specs (key: value per line)</label><textarea className={cn(inputClass, "resize-none")} rows={6} value={Object.entries(projectForm.specs || {}).map(([k, v]) => `${k}: ${v}`).join("\n")} onChange={e => {
                const specs: Record<string, string> = {};
                e.target.value.split("\n").filter(Boolean).forEach(line => { const [k, ...r] = line.split(":"); if (k && r.length) specs[k.trim()] = r.join(":").trim(); });
                setProjectForm(p => ({ ...p, specs }));
              }} /></div>
            </div>

            {/* ===== CONSTRUCTION TIMELINE ===== */}
            <div className="rounded-xl bg-white p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>
                  <Clock className="inline h-5 w-5 mr-2 text-gold" />Construction Timeline ({(projectForm.timeline || []).length} entries)
                </h2>
                <button onClick={addTimelineEntry} className="flex items-center gap-1.5 rounded-lg bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold-dark hover:bg-gold/20 cursor-pointer">
                  <Plus className="h-3.5 w-3.5" /> Add Entry
                </button>
              </div>

              {(projectForm.timeline || []).length === 0 ? (
                <div className="text-center py-8 rounded-lg border-2 border-dashed border-gray-200">
                  <Clock className="h-10 w-10 text-muted/30 mx-auto mb-2" />
                  <p className="text-sm text-muted">No timeline entries yet. Add entries to track construction progress.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {(projectForm.timeline || []).map((entry, idx) => (
                    <div key={idx} className="rounded-lg border border-gray-200 p-4 bg-cream/50">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-navy text-xs font-bold">{idx + 1}</span>
                          <span className="text-sm font-semibold text-navy">{entry.title || "Untitled Entry"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => moveTimelineEntry(idx, "up")} disabled={idx === 0} className="rounded p-1 text-muted hover:text-navy disabled:opacity-30 cursor-pointer"><ChevronUp className="h-4 w-4" /></button>
                          <button onClick={() => moveTimelineEntry(idx, "down")} disabled={idx === (projectForm.timeline || []).length - 1} className="rounded p-1 text-muted hover:text-navy disabled:opacity-30 cursor-pointer"><ChevronDown className="h-4 w-4" /></button>
                          <button onClick={() => removeTimelineEntry(idx)} className="rounded p-1 text-muted hover:text-red-500 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div><label className={labelClass}>Date</label><input className={inputClass} placeholder="January 2025" value={entry.date} onChange={e => updateTimelineEntry(idx, "date", e.target.value)} /></div>
                        <div><label className={labelClass}>Title</label><input className={inputClass} placeholder="Foundation Work" value={entry.title} onChange={e => updateTimelineEntry(idx, "title", e.target.value)} /></div>
                      </div>
                      <div className="mt-3"><label className={labelClass}>Description</label><textarea className={cn(inputClass, "resize-none")} rows={2} placeholder="Progress details..." value={entry.description} onChange={e => updateTimelineEntry(idx, "description", e.target.value)} /></div>

                      {/* Timeline photos */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <label className={labelClass}>Progress Photos ({entry.images.length})</label>
                          <label className="flex items-center gap-1 rounded bg-gold/10 px-2 py-1 text-[10px] font-semibold text-gold-dark cursor-pointer">
                            <Upload className="h-3 w-3" /> Upload
                            <input type="file" accept="image/*" multiple className="hidden" onChange={e => handleTimelineImageUpload(e, idx)} />
                          </label>
                        </div>
                        {entry.images.length > 0 && (
                          <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                            {entry.images.map((img, imgIdx) => (
                              <div key={imgIdx} className="group relative aspect-square rounded overflow-hidden bg-navy/5">
                                <img src={img.src} alt={img.alt} className="h-full w-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                                <button onClick={() => removeTimelineImage(idx, imgIdx)} className="absolute top-0.5 right-0.5 hidden group-hover:flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white cursor-pointer"><X className="h-2.5 w-2.5" /></button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {uploading && <div className="flex items-center gap-2 rounded-lg bg-gold/10 px-4 py-3 text-sm text-gold-dark"><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</div>}

            <div className="flex items-center justify-between pt-4 pb-12">
              <button onClick={() => setProjectViewMode("list")} className="rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-muted cursor-pointer">Cancel</button>
              <button onClick={handleSaveProject} disabled={saving} className="flex items-center gap-2 rounded-lg bg-gold px-8 py-2.5 text-sm font-semibold text-navy hover:bg-gold-dark disabled:opacity-60 cursor-pointer">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {saving ? "Saving..." : "Save Project"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =============== LEADS LIST ===============
  if (section === "leads") {
    const statusColors: Record<string, string> = {
      new: "bg-blue-50 text-blue-700",
      contacted: "bg-amber-50 text-amber-700",
      qualified: "bg-purple-50 text-purple-700",
      converted: "bg-green-50 text-green-700",
      lost: "bg-red-50 text-red-700",
    };

    return (
      <div className="min-h-screen bg-cream pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>Admin Dashboard</h1>
              <p className="mt-1 text-sm text-muted">{leads.length} total leads &bull; {leadCounts.new} new</p>
            </div>
          </div>
          <SectionTabs />
          <MessageBar />

          {/* Status filter pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(["all", "new", "contacted", "qualified", "converted", "lost"] as const).map(status => (
              <button key={status} onClick={() => setLeadFilter(status)}
                className={cn("rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer capitalize",
                  leadFilter === status ? "bg-gold text-navy" : "bg-white text-muted border border-gray-200 hover:border-gold/30"
                )}>
                {status} ({leadCounts[status]})
              </button>
            ))}
          </div>

          {leadsLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-20 rounded-xl border border-gray-200 bg-white">
              <p className="text-lg text-muted">No {leadFilter === "all" ? "" : leadFilter + " "}leads yet</p>
              <p className="text-sm text-muted/60 mt-1">Leads from contact forms will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLeads.map(lead => (
                <div key={lead.id} className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    {/* Lead info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-base font-semibold text-navy">{lead.name}</h3>
                        <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase", statusColors[lead.status])}>
                          {lead.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                        {lead.phone && <span>📞 {lead.phone}</span>}
                        {lead.email && <span>✉️ {lead.email}</span>}
                        {lead.location && <span>📍 {lead.location}</span>}
                        {lead.interest && <span>🏠 {lead.interest}</span>}
                      </div>
                      {lead.message && <p className="mt-2 text-sm text-muted line-clamp-2">{lead.message}</p>}
                      <div className="mt-2 flex items-center gap-3 text-[10px] text-muted/60">
                        <span>Source: {lead.source}</span>
                        <span>&bull;</span>
                        <span>{new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={lead.status}
                        onChange={e => handleUpdateLeadStatus(lead.id, e.target.value as LeadStatus)}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-navy cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/30"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                      </select>
                      <button onClick={() => handleDeleteLead(lead.id)} className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <textarea
                      placeholder="Add notes about this lead..."
                      value={lead.notes || ""}
                      onChange={e => {
                        // Optimistic update
                        setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, notes: e.target.value } : l));
                      }}
                      onBlur={e => handleUpdateLeadNotes(lead.id, e.target.value)}
                      className="w-full rounded-lg border border-gray-100 bg-cream/50 px-3 py-2 text-xs text-navy placeholder-muted/50 focus:outline-none focus:ring-1 focus:ring-gold/30 resize-none"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // =============== TESTIMONIALS LIST ===============
  if (section === "testimonials" && testimonialViewMode === "list") {
    return (
      <div className="min-h-screen bg-cream pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>Admin Dashboard</h1>
            <button onClick={startCreateTestimonial} className="flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-navy hover:bg-gold-dark cursor-pointer">
              <Plus className="h-4 w-4" /> Add Testimonial
            </button>
          </div>
          <SectionTabs />
          <MessageBar />
          {testimonialLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left">
                <thead className="bg-navy text-white">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Person</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">Location</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Rating</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Photo</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {testimonials.map(t => (
                    <tr key={t.id} className="hover:bg-cream/50 transition-colors">
                      <td className="px-4 py-3"><p className="text-sm font-semibold text-navy">{t.name}</p><p className="text-xs text-muted">{t.profession}</p></td>
                      <td className="px-4 py-3 hidden sm:table-cell"><span className="text-sm text-muted">{t.location}</span></td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={cn("h-3.5 w-3.5", i < t.rating ? "fill-gold text-gold" : "fill-gray-200 text-gray-200")} />))}</div>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell"><span className="text-xs text-muted">{t.image ? "Yes" : "No"}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => startEditTestimonial(t)} className="rounded-lg p-2 text-muted hover:bg-gold/10 hover:text-gold-dark transition-colors cursor-pointer"><Pencil className="h-4 w-4" /></button>
                          <button onClick={() => handleDeleteTestimonial(t.id)} className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =============== TESTIMONIAL EDIT/CREATE ===============
  if (section === "testimonials" && (testimonialViewMode === "edit" || testimonialViewMode === "create")) {
    return (
      <div className="min-h-screen bg-cream pt-24">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setTestimonialViewMode("list")} className="rounded-lg p-2 text-muted hover:bg-white hover:text-navy transition-colors cursor-pointer"><ArrowLeft className="h-5 w-5" /></button>
            <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>
              {testimonialViewMode === "edit" ? `Edit: ${editingTestimonial?.name}` : "New Testimonial"}
            </h1>
          </div>
          <MessageBar />
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-navy mb-4" style={{ fontFamily: "var(--font-heading)" }}>Testimonial Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className={labelClass}>Name *</label><input className={inputClass} placeholder="Full name" value={testimonialForm.name || ""} onChange={e => setTestimonialForm(p => ({ ...p, name: e.target.value }))} /></div>
                <div><label className={labelClass}>Profession</label><input className={inputClass} placeholder="e.g., Business Owner" value={testimonialForm.profession || ""} onChange={e => setTestimonialForm(p => ({ ...p, profession: e.target.value }))} /></div>
                <div><label className={labelClass}>Location</label><input className={inputClass} placeholder="e.g., GK-1, Delhi" value={testimonialForm.location || ""} onChange={e => setTestimonialForm(p => ({ ...p, location: e.target.value }))} /></div>
                <div>
                  <label className={labelClass}>Rating</label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} type="button" onClick={() => setTestimonialForm(p => ({ ...p, rating: star }))}
                        className="cursor-pointer p-0.5">
                        <Star className={cn("h-6 w-6 transition-colors", star <= (testimonialForm.rating || 0) ? "fill-gold text-gold" : "fill-gray-200 text-gray-200")} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4"><label className={labelClass}>Quote *</label><textarea className={cn(inputClass, "resize-none")} rows={4} placeholder="Their testimonial..." value={testimonialForm.quote || ""} onChange={e => setTestimonialForm(p => ({ ...p, quote: e.target.value }))} /></div>
            </div>

            {/* Photo */}
            <div className="rounded-xl bg-white p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-navy mb-4" style={{ fontFamily: "var(--font-heading)" }}>Profile Photo</h2>
              {testimonialForm.image ? (
                <div className="flex items-center gap-4">
                  <img src={testimonialForm.image} alt="Profile" className="h-16 w-16 rounded-full object-cover" />
                  <button onClick={() => setTestimonialForm(p => ({ ...p, image: "" }))} className="text-sm text-red-500 cursor-pointer">Remove</button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-200 px-6 py-8 hover:border-gold/50">
                  <Upload className="h-8 w-8 text-muted/50" /><span className="text-sm font-medium text-muted">Upload profile photo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleTestimonialPhotoUpload} />
                </label>
              )}
            </div>

            {/* Video Testimonial */}
            <div className="rounded-xl bg-white p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-navy mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                <Video className="inline h-5 w-5 mr-2 text-gold" />Video Testimonial
              </h2>
              {testimonialForm.videoUrl ? (
                <div className="space-y-3">
                  <video
                    src={testimonialForm.videoUrl}
                    controls
                    className="w-full max-w-sm rounded-lg border border-gray-200"
                    style={{ maxHeight: "200px" }}
                  />
                  <button onClick={() => setTestimonialForm(p => ({ ...p, videoUrl: "" }))} className="text-sm text-red-500 cursor-pointer">Remove video</button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-200 px-6 py-8 hover:border-gold/50">
                  <Video className="h-8 w-8 text-muted/50" /><span className="text-sm font-medium text-muted">Upload video testimonial</span>
                  <span className="text-xs text-muted/60">MP4, MOV, or WebM</span>
                  <input type="file" accept="video/*" className="hidden" onChange={handleTestimonialVideoUpload} />
                </label>
              )}
            </div>

            {uploading && <div className="flex items-center gap-2 rounded-lg bg-gold/10 px-4 py-3 text-sm text-gold-dark"><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</div>}

            <div className="flex items-center justify-between pt-4 pb-12">
              <button onClick={() => setTestimonialViewMode("list")} className="rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-muted cursor-pointer">Cancel</button>
              <button onClick={handleSaveTestimonial} disabled={saving} className="flex items-center gap-2 rounded-lg bg-gold px-8 py-2.5 text-sm font-semibold text-navy hover:bg-gold-dark disabled:opacity-60 cursor-pointer">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {saving ? "Saving..." : "Save Testimonial"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =============== MEDIA LIST ===============
  if (section === "media" && mediaViewMode === "list") {
    return (
      <div className="min-h-screen bg-cream pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>Admin Dashboard</h1>
            <button onClick={startCreateMedia} className="flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-navy hover:bg-gold-dark cursor-pointer">
              <Plus className="h-4 w-4" /> Add Media
            </button>
          </div>
          <SectionTabs />
          <MessageBar />
          {mediaLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
          ) : mediaItems.length === 0 ? (
            <div className="text-center py-20 rounded-xl border border-gray-200 bg-white">
              <Newspaper className="h-12 w-12 text-muted/30 mx-auto mb-3" />
              <p className="text-sm text-muted">No media coverage items yet.</p>
              <button onClick={startCreateMedia} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gold/10 px-4 py-2 text-sm font-semibold text-gold-dark hover:bg-gold/20 cursor-pointer">
                <Plus className="h-4 w-4" /> Add your first media item
              </button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left">
                <thead className="bg-navy text-white">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Logo</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">Article Link</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Date</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mediaItems.map(m => (
                    <tr key={m.id} className="hover:bg-cream/50 transition-colors">
                      <td className="px-4 py-3">
                        {m.logoUrl ? (
                          <img src={m.logoUrl} alt={m.name} className="h-8 w-auto max-w-[80px] object-contain" />
                        ) : (
                          <div className="h-8 w-12 rounded bg-navy/5 flex items-center justify-center"><Newspaper className="h-4 w-4 text-muted/40" /></div>
                        )}
                      </td>
                      <td className="px-4 py-3"><span className="text-sm font-semibold text-navy">{m.name}</span></td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        {m.articleUrl ? (
                          <a href={m.articleUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-gold-dark hover:underline">
                            <ExternalLink className="h-3 w-3" /> View Article
                          </a>
                        ) : (
                          <span className="text-xs text-muted">--</span>
                        )}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell"><span className="text-xs text-muted">{m.date || "--"}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => startEditMedia(m)} className="rounded-lg p-2 text-muted hover:bg-gold/10 hover:text-gold-dark transition-colors cursor-pointer" title="Edit"><Pencil className="h-4 w-4" /></button>
                          <button onClick={() => handleDeleteMedia(m.id)} className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer" title="Delete"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =============== MEDIA EDIT/CREATE ===============
  if (section === "media" && (mediaViewMode === "edit" || mediaViewMode === "create")) {
    return (
      <div className="min-h-screen bg-cream pt-24">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setMediaViewMode("list")} className="rounded-lg p-2 text-muted hover:bg-white hover:text-navy transition-colors cursor-pointer"><ArrowLeft className="h-5 w-5" /></button>
            <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>
              {mediaViewMode === "edit" ? `Edit: ${editingMedia?.name}` : "New Media Coverage"}
            </h1>
          </div>
          <MessageBar />
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-navy mb-4" style={{ fontFamily: "var(--font-heading)" }}>Media Details</h2>
              <div className="grid gap-4">
                <div><label className={labelClass}>Name *</label><input className={inputClass} placeholder="e.g., Times of India" value={mediaForm.name || ""} onChange={e => setMediaForm(p => ({ ...p, name: e.target.value }))} /></div>
                <div><label className={labelClass}>Article URL</label><input className={inputClass} placeholder="https://..." value={mediaForm.articleUrl || ""} onChange={e => setMediaForm(p => ({ ...p, articleUrl: e.target.value }))} /></div>
                <div><label className={labelClass}>Date</label><input className={inputClass} placeholder="e.g., March 2025" value={mediaForm.date || ""} onChange={e => setMediaForm(p => ({ ...p, date: e.target.value }))} /></div>
              </div>
            </div>

            {/* Logo */}
            <div className="rounded-xl bg-white p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-navy mb-4" style={{ fontFamily: "var(--font-heading)" }}>Logo</h2>
              {mediaForm.logoUrl ? (
                <div className="flex items-center gap-4">
                  <img src={mediaForm.logoUrl} alt="Logo" className="h-12 w-auto max-w-[160px] object-contain rounded border border-gray-100 p-1" />
                  <button onClick={() => setMediaForm(p => ({ ...p, logoUrl: "" }))} className="text-sm text-red-500 cursor-pointer">Remove</button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-200 px-6 py-8 hover:border-gold/50">
                  <Upload className="h-8 w-8 text-muted/50" /><span className="text-sm font-medium text-muted">Upload logo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleMediaLogoUpload} />
                </label>
              )}
            </div>

            {uploading && <div className="flex items-center gap-2 rounded-lg bg-gold/10 px-4 py-3 text-sm text-gold-dark"><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</div>}

            <div className="flex items-center justify-between pt-4 pb-12">
              <button onClick={() => setMediaViewMode("list")} className="rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-muted cursor-pointer">Cancel</button>
              <button onClick={handleSaveMedia} disabled={saving} className="flex items-center gap-2 rounded-lg bg-gold px-8 py-2.5 text-sm font-semibold text-navy hover:bg-gold-dark disabled:opacity-60 cursor-pointer">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {saving ? "Saving..." : "Save Media"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =============== SETTINGS ===============
  if (section === "settings") {
    const sectionLabels: Record<keyof SectionVisibility, string> = {
      stats: "Statistics",
      about: "About Us",
      services: "Services",
      projects: "Projects",
      process: "Our Process",
      whyUs: "Why Choose Us",
      testimonials: "Testimonials",
      blog: "Blog",
      faq: "FAQ",
      cta: "Call to Action",
      mediaCoverage: "Media Coverage",
    };

    return (
      <div className="min-h-screen bg-cream pt-24">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>Admin Dashboard</h1>
          </div>
          <SectionTabs />
          <MessageBar />
          {settingsLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
          ) : (
            <div className="space-y-6">
              {/* Homepage Images */}
              <div className="rounded-xl bg-white p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-navy mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  <ImageIcon className="inline h-5 w-5 mr-2 text-gold" />Homepage Images
                </h2>
                <p className="text-sm text-muted mb-6">Upload custom images or use the Unsplash defaults. Images should be at least 1920px wide.</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {([
                    { key: "heroAll", label: "Hero - All" },
                    { key: "heroDelhi", label: "Hero - Delhi" },
                    { key: "heroBali", label: "Hero - Bali" },
                    { key: "aboutDelhi", label: "About - Delhi" },
                    { key: "aboutBali", label: "About - Bali" },
                    { key: "ctaBackground", label: "CTA Background" },
                  ] as { key: keyof HomepageImages; label: string }[]).map(({ key, label }) => (
                    <div key={key}>
                      <label className={labelClass}>{label}</label>
                      <div className="flex gap-2">
                        <input
                          className={cn(inputClass, "flex-1")}
                          placeholder="Image URL or upload"
                          value={siteSettings.homepageImages?.[key] || ""}
                          onChange={e => setSiteSettings(prev => ({
                            ...prev,
                            homepageImages: { ...prev.homepageImages, [key]: e.target.value },
                          }))}
                        />
                        <label className="flex shrink-0 items-center gap-1 rounded-lg bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold-dark cursor-pointer hover:bg-gold/20">
                          <Upload className="h-3.5 w-3.5" />
                          <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                            const files = e.target.files;
                            if (!files?.length) return;
                            const fd = new FormData();
                            fd.append("file", files[0]);
                            fd.append("slug", "homepage");
                            fd.append("type", key);
                            fd.append("category", "project");
                            try {
                              const res = await fetch("/api/upload", { method: "POST", body: fd });
                              if (!res.ok) throw new Error();
                              const { path: p } = await res.json();
                              setSiteSettings(prev => ({
                                ...prev,
                                homepageImages: { ...prev.homepageImages, [key]: p },
                              }));
                              showMsg("success", `${label} image uploaded`);
                            } catch { showMsg("error", "Upload failed"); }
                            e.target.value = "";
                          }} />
                        </label>
                      </div>
                      {siteSettings.homepageImages?.[key] && (
                        <img src={siteSettings.homepageImages[key]} alt={label} className="mt-2 h-20 w-full rounded-lg object-cover" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media Links */}
              <div className="rounded-xl bg-white p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-navy mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  <Globe className="inline h-5 w-5 mr-2 text-gold" />Social Media Links
                </h2>
                <div className="grid gap-4">
                  {(Object.keys(siteSettings.socialLinks) as (keyof SocialLinks)[]).map(key => (
                    <div key={key}>
                      <label className={labelClass}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                      <input
                        className={inputClass}
                        placeholder={`https://${key}.com/...`}
                        value={siteSettings.socialLinks[key]}
                        onChange={e => updateSocialLink(key, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Visibility */}
              <div className="rounded-xl bg-white p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-navy mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  <Settings className="inline h-5 w-5 mr-2 text-gold" />Section Visibility
                </h2>
                <p className="text-sm text-muted mb-4">Toggle which sections are visible on the homepage.</p>
                <div className="space-y-3">
                  {(Object.keys(siteSettings.sectionVisibility) as (keyof SectionVisibility)[]).map(key => (
                    <div key={key} className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3 hover:bg-cream/50 transition-colors">
                      <span className="text-sm font-medium text-navy">{sectionLabels[key]}</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={siteSettings.sectionVisibility[key]}
                        onClick={() => toggleSectionVisibility(key)}
                        className={cn(
                          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gold/30",
                          siteSettings.sectionVisibility[key] ? "bg-gold" : "bg-gray-200"
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            siteSettings.sectionVisibility[key] ? "translate-x-5" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end pt-4 pb-12">
                <button onClick={handleSaveSettings} disabled={saving} className="flex items-center gap-2 rounded-lg bg-gold px-8 py-2.5 text-sm font-semibold text-navy hover:bg-gold-dark disabled:opacity-60 cursor-pointer">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {saving ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
