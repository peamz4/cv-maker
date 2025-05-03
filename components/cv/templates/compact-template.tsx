"use client";

import { CVData } from "@/lib/cv-store";
import { AtSign, Phone, MapPin, Globe } from "lucide-react";

interface CompactTemplateProps {
  data: CVData;
}

export function CompactTemplate({ data }: CompactTemplateProps) {
  return (
    <div className="bg-white text-black shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 border-b-4 border-gray-900">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-3xl font-bold">{data.personalInfo.fullName || "Your Name"}</h1>
          
          <div className="flex flex-wrap gap-3 text-sm">
            {data.personalInfo.email && (
              <div className="flex items-center gap-1">
                <AtSign className="h-3 w-3" />
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            
            {data.personalInfo.address && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{data.personalInfo.address}</span>
              </div>
            )}
            
            {data.personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <span>{data.personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        {data.personalInfo.summary && (
          <div>
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">Summary</h2>
            <p className="text-sm">{data.personalInfo.summary}</p>
          </div>
        )}
        
        {data.experience.length > 0 && (
          <div>
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">Experience</h2>
            <div className="space-y-3">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.company}{exp.location ? ` • ${exp.location}` : ''}</p>
                    </div>
                    <span className="text-xs text-gray-600">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {data.education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">Education</h2>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm">{edu.degree} in {edu.field}</h3>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                    </div>
                    <span className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  {edu.description && (
                    <p className="mt-1 text-sm text-gray-700">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span 
                  key={skill.id} 
                  className="inline-block bg-gray-100 px-2 py-1 text-sm rounded"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}