import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLanguage } from '../context/LanguageContext'

interface Job {
  id: string
  title: string
  description: string
}

export default function JobList() {
  const { t } = useLanguage()
  const [jobs, setJobs] = useState<Job[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get<Job[]>('http://localhost:8000/api/jobs')
        setJobs(response.data)
      } catch (_) {
        setError(t('jobs.error'))
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [t]) // добавляем t в зависимости, чтобы при смене языка сообщение об ошибке тоже обновлялось

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>
                <button className="mt-2 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition">
                  {t('hero.button')}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">{t('jobs.noJobs')}</p>
        )}
      </div>
    </section>
  )
}
