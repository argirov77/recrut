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
          <span className="text-lg text-gray-500">{t('jobs.loading')}</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div id="jobs" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <span className="text-lg text-red-500">{error}</span>
        </div>
      </div>
    )
  }

  return (
    <section id="jobs" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">{t('jobs.title')}</h2>
        {jobs && jobs.length > 0 ? (
          <div className="space-y-6 max-w-3xl mx-auto">
            {jobs.map((job) => {
              const title = job[`title_${lang}` as keyof Job] ?? job.title
              const description = job[`description_${lang}` as keyof Job] ?? job.description
              const requirements = job[`requirements_${lang}` as keyof Job] ?? job.requirements
              return (
                <details key={job.id} className="bg-white rounded-lg shadow group">
                  <summary className="cursor-pointer select-none p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-open:mb-1">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-700">
                        {job.location} • {job.job_type}
                      </p>
                    </div>
                  </summary>
                  <div className="px-4 pb-4 text-gray-700 space-y-3">
                    <p className="whitespace-pre-line">{description}</p>
                    {requirements && (
                      <div>
                        <h4 className="font-medium">{t('jobs.requirements')}</h4>
                        <p className="whitespace-pre-line">{requirements}</p>
                      </div>
                    )}
                    <button className="mt-2 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition">
                      {t('hero.button')}
                    </button>
                  </div>
                </details>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">{t('jobs.noJobs')}</p>
        )}
      </div>
    </section>
  )
}
