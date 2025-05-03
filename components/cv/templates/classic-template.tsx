"use client";

import type { CVData } from "@/lib/cv-store";
import { AtSign, Phone, MapPin, Globe } from "lucide-react";

interface ClassicTemplateProps {
  data: CVData;
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  return (
    <div className="bg-white text-black shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-8 text-center border-b-2 border-gray-200">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {data.personalInfo.email && (
            <div className="flex items-center gap-2">
              <AtSign className="h-4 w-4 text-primary" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          
          {data.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          
          {data.personalInfo.address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{data.personalInfo.address}</span>
            </div>
          )}
          
          {data.personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-8">
        {/* Summary Section */}
        {data.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold uppercase tracking-wider text-primary mb-3">Professional Summary</h2>
            <div className="border-t-2 border-gray-200 pt-3">
              <p>{data.personalInfo.summary}</p>
            </div>
          </div>
        )}
        
        {/* Experience Section */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold uppercase tracking-wider text-primary mb-3">Work Experience</h2>
            <div className="border-t-2 border-gray-200 pt-3 space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap justify-between items-start">
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="font-medium">{exp.company}</p>
                  {exp.location && (
                    <p className="text-sm text-gray-600 italic">{exp.location}</p>
                  )}
                  <p className="mt-2 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Education Section */}
        {data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold uppercase tracking-wider text-primary mb-3">Education</h2>
            <div className="border-t-2 border-gray-200 pt-3 space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-wrap justify-between items-start">
                    <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                    <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="font-medium">{edu.institution}</p>
                  {edu.description && (
                    <p className="text-sm mt-2">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills Section */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-primary mb-3">Skills</h2>
            <div className="border-t-2 border-gray-200 pt-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"/>
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-xs text-gray-600">
                      ({skill.level === 1 && "Beginner"}
                      {skill.level === 2 && "Basic"}
                      {skill.level === 3 && "Intermediate"}
                      {skill.level === 4 && "Advanced"}
                      {skill.level === 5 && "Expert"})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}