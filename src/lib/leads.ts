import type { Lead } from "@/types";

// Default leads data (empty for fresh start)
const defaultLeads: Lead[] = [];

// In-memory storage
let leadsStorage: Lead[] = [...defaultLeads];

export function getLeads(): Lead[] {
  return leadsStorage;
}

export function saveLeads(leads: Lead[]): void {
  leadsStorage = [...leads];
}

export function getLeadById(id: string): Lead | undefined {
  return leadsStorage.find((l) => l.id === id);
}

export function addLead(lead: Lead): void {
  leadsStorage.push(lead);
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  const index = leadsStorage.findIndex((l) => l.id === id);
  if (index === -1) return null;
  
  leadsStorage[index] = { ...leadsStorage[index], ...updates };
  return leadsStorage[index];
}

export function deleteLead(id: string): boolean {
  const index = leadsStorage.findIndex((l) => l.id === id);
  if (index === -1) return false;
  
  leadsStorage.splice(index, 1);
  return true;
}