import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createJob, updateJob, fetchJobs } from '@/lib/api/jobs'
import { Job } from '@/types/job'
import Button from '../ui/Button'
import Input from '../ui/input'
import Textarea from '../ui/Textarea'
import { useToast } from '@/hooks/use-toast'

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  salary_min: z.coerce.number().min(0),
  salary_max: z.coerce.number().min(0),
  is_active: z.boolean().optional().default(true),
}).refine((data) => data.salary_min <= data.salary_max, {
  message: 'salary_max must be >= salary_min',
  path: ['salary_max'],
})

export default function AdminJobForm() {
  const { jobId } = useParams<{ jobId: string }>()
  const editMode = Boolean(jobId)
  const navigate = useNavigate()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (!editMode) return
    ;(async () => {
      try {
        const res = await fetchJobs()
        const job = res.find((j) => j.id === jobId)
        if (job) {
          reset(job)
        }
      } catch (e) {
        console.error(e)
      }
    })()
  }, [editMode, jobId, reset])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (editMode && jobId) {
        await updateJob(jobId, data)
        toast({ title: 'Job updated' })
      } else {
        await createJob(data as Job)
        toast({ title: 'Job created' })
      }
      navigate('/admin/jobs')
    } catch (err: any) {
      setError('root', { message: err.message })
    }
  })

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        {editMode ? 'Edit Job' : 'New Job'}
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <Input {...register('title')} />
          {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <Textarea rows={4} {...register('description')} />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <Input {...register('location')} />
          {errors.location && <p className="text-red-600 text-sm">{errors.location.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Salary Min</label>
          <Input type="number" {...register('salary_min', { valueAsNumber: true })} />
          {errors.salary_min && <p className="text-red-600 text-sm">{errors.salary_min.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Salary Max</label>
          <Input type="number" {...register('salary_max', { valueAsNumber: true })} />
          {errors.salary_max && <p className="text-red-600 text-sm">{errors.salary_max.message}</p>}
        </div>
        <div>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" {...register('is_active')} className="mr-2" />
            Active
          </label>
        </div>
        {errors.root && <p className="text-red-600">{errors.root.message}</p>}
        <div className="flex space-x-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Save'}
          </Button>
          <Button variant="ghost" onClick={() => navigate('/admin/jobs')} type="button">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
