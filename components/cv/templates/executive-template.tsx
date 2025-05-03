"use client";

import type { CVData } from "@/lib/cv-store";
import { AtSign, Phone, MapPin, Globe, Calendar } from "lucide-react";

interface ExecutiveTemplateProps {
  data: CVData;
}

export function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
  return (
    <div className="bg-white text-black shadow-lg rounded-lg overflow-hidden">
      <div className="p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName || "Your Name"}</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
          {data.personalInfo.email && (
            <div className="flex items-center gap-2">
              <AtSign className="h-4 w-4 text-gray-600" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          
          {data.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-600" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          
          {data.personalInfo.address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-600" />
              <span>{data.personalInfo.address}</span>
            </div>
          )}
          
          {data.personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-600" />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-8">
        {data.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
            <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
          </div>
        )}
        
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-4 border-gray-200 pl-4">
                  <div className="flex flex-wrap justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700 font-semibold">{exp.company}</p>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{exp.startDate} - {exp.endDate}</span>
                    </div>
                  </div>
                  {exp.location && (
                    <p className="text-gray-600 text-sm mt-1">{exp.location}</p>
                  )}
                  <p className="mt-2 text-gray-700 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-wrap justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                    </div>
                    <span className="text-gray-600 text-sm">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  {edu.description && (
                    <p className="mt-2 text-gray-700">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Core Competencies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.skills.map((skill) => (
                <div key={skill.id} className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-semibold text-gray-900">{skill.name}</p>
                  <div className="mt-1 h-1 bg-gray-200 rounded-full">
                    <div 
                      className="h-1 bg-gray-600 rounded-full" 
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}