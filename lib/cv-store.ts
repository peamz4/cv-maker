"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PersonalInfo = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  summary: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

export type Skill = {
  id: string;
  name: string;
  level: number;
};

export type PaperSize = "A4" | "Letter" | "Auto";

export type CVData = {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  template: string;
  paperSize: PaperSize;
};

interface CVState {
  data: CVData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (education: Education) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  setTemplate: (template: string) => void;
  setPaperSize: (size: PaperSize) => void;
  reset: () => void;
}

const initialState: CVData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
  template: "modern",
  paperSize: "A4",
};

export const useCVStore = create<CVState>()(
  persist(
    (set) => ({
      data: initialState,
      updatePersonalInfo: (info) =>
        set((state) => ({
          data: {
            ...state.data,
            personalInfo: { ...state.data.personalInfo, ...info },
          },
        })),
      addEducation: (education) =>
        set((state) => ({
          data: {
            ...state.data,
            education: [...state.data.education, education],
          },
        })),
      updateEducation: (id, education) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((item) =>
              item.id === id ? { ...item, ...education } : item
            ),
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((item) => item.id !== id),
          },
        })),
      addExperience: (experience) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: [...state.data.experience, experience],
          },
        })),
      updateExperience: (id, experience) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((item) =>
              item.id === id ? { ...item, ...experience } : item
            ),
          },
        })),
      removeExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.filter((item) => item.id !== id),
          },
        })),
      addSkill: (skill) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: [...state.data.skills, skill],
          },
        })),
      updateSkill: (id, skill) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.map((item) =>
              item.id === id ? { ...item, ...skill } : item
            ),
          },
        })),
      removeSkill: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((item) => item.id !== id),
          },
        })),
      setTemplate: (template) =>
        set((state) => ({
          data: {
            ...state.data,
            template,
          },
        })),
      setPaperSize: (size) =>
        set((state) => ({
          data: {
            ...state.data,
            paperSize: size,
          },
        })),
      reset: () => set({ data: initialState }),
    }),
    {
      name: "cv-storage",
    }
  )
);