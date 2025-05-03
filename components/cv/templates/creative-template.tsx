"use client";

import { CVData } from "@/lib/cv-store";
import { AtSign, Phone, MapPin, Globe } from "lucide-react";

interface CreativeTemplateProps {
  data: CVData;
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  return (
    <div className="bg-white text-black shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8">
        <h1 className="text-4xl font-bold mb-4">{data.personalInfo.fullName || "Your Name"}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
      
      <div className="p-8">
        {data.personalInfo.summary && (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-8 w-2 bg-purple-500 mr-4"></div>
              <h2 className="text-2xl font-bold">About Me</h2>
            </div>
            <p className="text-gray-700">{data.personalInfo.summary}</p>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {data.experience.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="h-8 w-2 bg-pink-500 mr-4"></div>
                  <h2 className="text-2xl font-bold">Experience</h2>
                </div>
                <div className="space-y-6">
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 bg-pink-500 rounded-full"></div>
                      <h3 className="font-bold text-lg">{exp.position}</h3>
                      <p className="text-purple-600 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
                      {exp.location && (
                        <p className="text-sm text-gray-600 italic">{exp.location}</p>
                      )}
                      <p className="mt-2 text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            {data.education.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="h-8 w-2 bg-purple-500 mr-4"></div>
                  <h2 className="text-2xl font-bold">Education</h2>
                </div>
                <div className="space-y-4">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="relative pl-4 border-l-2 border-gray-200">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 bg-purple-500 rounded-full"></div>
                      <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                      <p className="text-purple-600">{edu.institution}</p>
                      <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
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
                <div className="flex items-center mb-4">
                  <div className="h-8 w-2 bg-pink-500 mr-4"></div>
                  <h2 className="text-2xl font-bold">Skills</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <div 
                      key={skill.id} 
                      className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full"
                    >
                      <span className="font-medium text-gray-800">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}