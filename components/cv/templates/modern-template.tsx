"use client";

import type { CVData } from "@/lib/cv-store";
import { 
  AtSign, 
  Phone, 
  MapPin, 
  Globe, 
  Calendar 
} from "lucide-react";

interface ModernTemplateProps {
  data: CVData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  return (
    <div className="bg-white text-black shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-8">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName || "Your Name"}</h1>
        
        <div className="flex flex-wrap gap-4 mt-4">
          {data.personalInfo.email && (
            <div className="flex items-center gap-2">
              <AtSign className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          
          {data.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          
          {data.personalInfo.address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{data.personalInfo.address}</span>
            </div>
          )}
          
          {data.personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-8 flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="lg:w-1/3 space-y-6">
          {/* Skills Section */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-xl font-bold border-b-2 border-primary pb-2 mb-4">Skills</h2>
              <div className="space-y-3">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-600">
                        {skill.level === 1 && "Beginner"}
                        {skill.level === 2 && "Basic"}
                        {skill.level === 3 && "Intermediate"}
                        {skill.level === 4 && "Advanced"}
                        {skill.level === 5 && "Expert"}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-primary rounded-full" 
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education Section */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xl font-bold border-b-2 border-primary pb-2 mb-4">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold">{edu.institution}</h3>
                    <p className="text-gray-700">{edu.degree} in {edu.field}</p>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{edu.startDate} - {edu.endDate}</span>
                    </div>
                    {edu.description && (
                      <p className="text-sm mt-2">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column */}
        <div className="lg:w-2/3 space-y-6">
          {/* Summary Section */}
          {data.personalInfo.summary && (
            <div>
              <h2 className="text-xl font-bold border-b-2 border-primary pb-2 mb-4">Professional Summary</h2>
              <p>{data.personalInfo.summary}</p>
            </div>
          )}
          
          {/* Experience Section */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-xl font-bold border-b-2 border-primary pb-2 mb-4">Work Experience</h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-wrap justify-between items-start">
                      <div>
                        <h3 className="font-bold">{exp.position}</h3>
                        <p className="text-gray-700">{exp.company}</p>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{exp.startDate} - {exp.endDate}</span>
                      </div>
                    </div>
                    {exp.location && (
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                    <p className="mt-2 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}