// frontend/src/components/JobList.tsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLanguage } from '../context/LanguageContext'

interface Job {
  id: number
  title: string
  location: string
  job_type: string
  description: string
  requirements?: string
  // localized fields returned by the backend
  title_en?: string
  title_ru?: string
  title_bg?: string
  description_en?: string
  description_ru?: string
  description_bg?: string
  requirements_en?: string
  requirements_ru?: string
  requirements_bg?: string
  location_en?: string
  location_ru?: string
  location_bg?: string
  job_type_en?: string
  job_type_ru?: string
  job_type_bg?: string
}

export default function JobList() {
  const { t, lang } = useLanguage()
  const [jobs, setJobs] = useState<Job[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const API = import.meta.env.VITE_API_URL || ''
        const response = await axios.get<Job[]>(`${API}/api/jobs`, {
          params: { lang },
        })
        setJobs(response.data)
      } catch (_) {
        setError(t('jobs.error'))
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [lang, t])

  if (loading) {
    return (
      <div id="jobs" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <span className="font-sans text-base text-primary">{t('jobs.loading')}</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div id="jobs" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <span className="font-sans text-base text-primary">{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div id="jobs" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl text-primary text-center mb-8">
          {t('jobs.title')}
        </h2>

        {jobs && jobs.length > 0 ? (
          <div className="space-y-6 max-w-3xl mx-auto">
            {jobs.map((job) => {
              const title =
                (job[`title_${lang}` as keyof Job] as string) ?? job.title
              const location =
                (job[`location_${lang}` as keyof Job] as string) ??
                job.location
              const jobType =
                (job[`job_type_${lang}` as keyof Job] as string) ??
                job.job_type
              const description =
                (job[`description_${lang}` as keyof Job] as string) ??
                job.description
              const requirements =
                (job[`requirements_${lang}` as keyof Job] as string) ??
                job.requirements

              return (
                <details
                  key={job.id}
                  className="group bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <summary className="cursor-pointer select-none p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h3 className="font-heading text-2xl text-primary mb-2 group-open:mb-1">
                        {title}
                      </h3>
                      <p className="font-sans text-base text-primary">
                        {location} • {jobType}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>

                  <div className="px-4 pb-4 space-y-4 text-primary">
                    <p className="font-sans text-base whitespace-pre-line text-primary">{description}</p>
                    {requirements && (
                      <div>
                        <h4 className="font-medium text-primary">
                          {t('jobs.requirements')}
                        </h4>
                        <p className="font-sans text-base text-primary whitespace-pre-line">{requirements}</p>
                      </div>
                    )}
                    <button
                      onClick={() =>
                        window.location.assign(
                          `/?position=${encodeURIComponent(title)}#contact`
                        )
                      }
                      className="mt-2 inline-block px-6 py-2 bg-accentRed text-white rounded-full shadow hover:scale-105 transition"
                    >
                      {t('jobs.applyButton')}
                    </button>
                  </div>
                </details>
              )
            })}
          </div>
        ) : (
          <p className="font-sans text-base text-primary text-center">{t('jobs.noJobs')}</p>
        )}
      </div>
    </div>
  )
}

