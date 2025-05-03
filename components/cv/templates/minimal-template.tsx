"use client";

import { CVData } from "@/lib/cv-store";

interface MinimalTemplateProps {
  data: CVData;
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  return (
    <div className="bg-white text-black shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{data.personalInfo.fullName || "Your Name"}</h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
            {data.personalInfo.email && (
              <div>
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            
            {data.personalInfo.phone && (
              <div className="hidden sm:block">•</div>
            )}
            
            {data.personalInfo.phone && (
              <div>
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            
            {data.personalInfo.address && (
              <div className="hidden sm:block">•</div>
            )}
            
            {data.personalInfo.address && (
              <div>
                <span>{data.personalInfo.address}</span>
              </div>
            )}
            
            {data.personalInfo.website && (
              <div className="hidden sm:block">•</div>
            )}
            
            {data.personalInfo.website && (
              <div>
                <span>{data.personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Summary Section */}
          {data.personalInfo.summary && (
            <div>
              <h2 className="text-lg font-semibold uppercase border-b border-gray-200 pb-1 mb-3">Professional Summary</h2>
              <p>{data.personalInfo.summary}</p>
            </div>
          )}
          
          {/* Experience Section */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold uppercase border-b border-gray-200 pb-1 mb-3">Work Experience</h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-1">
                      <div>
                        <h3 className="font-bold">{exp.position}</h3>
                        <p className="text-gray-700">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                      </div>
                      <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="mt-2 whitespace-pre-line text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education Section */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold uppercase border-b border-gray-200 pb-1 mb-3">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-1">
                      <div>
                        <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                        <p className="text-gray-700">{edu.institution}</p>
                      </div>
                      <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    {edu.description && (
                      <p className="mt-1 text-sm">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Skills Section */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold uppercase border-b border-gray-200 pb-1 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {skill.name}
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